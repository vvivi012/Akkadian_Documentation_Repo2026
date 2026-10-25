---
sidebar_position: 3
---

# Cleaning, Preprocessing, and Filtering the Data

Before a translation model can learn from Akkadian text, the datasets have to be **cleaned** and the examples have to be checked for quality, known as **filtering**. This page shows what qualifies as "messy" for Akkadian data, how we fixed it, and how we decided which examples to keep.

Definitions:

1.  **Preprocessing** means preparing the text to be ready for a model.
2. **Cleaning** means fixing or removing things that would confuse the model.
3. **Filtering** means keeping the good examples and throwing out the rest.
4. **Cleaning** and **filtering** are both components of **preprocessing**. 
    
**About the code on this page:** the snippets come from our project's code. We added or rewrote the comments to better explain what the code does. Lines starting with # are comments. 

### 1. Why clean the data?

We collected Akkadian-to-English examples from Kaggle, Hugging Face, the Akkademia GitHub project, and a Zenodo record. Each source was written by different organizations and therefore has different conventions. For example, the letter š is sometimes typed as “sz,” and broken parts of a tablet are marked in different ways. But, a model doesn’t recognize these as the same things. **Cleaning** makes these conventions uniform across the datasets.

### 2. Cleaning

Every training example is a pair: an Akkadian line (the **source**) and its English translation (the **target**). Our code has one cleaning function for both the source and target text.

### 2.1 The Akkadian side

The function ```normalize_akkadian``` does these jobs:

**Step** | **Example**
--- | ---
**Standardize characters.** One letter can be stored in more than one way inside a computer, so we pick one way (Unicode NFC normalization) | ```ḫ``` becomes ```h```.
**Spell out shorthands.** Some sources use stand-ins for special letters. | ```sz``` becomes ```š```, ```qi2``` becomes ```qí```.
**Mark damaged text as ```<gap>```.** Many cuneiform tablets are missing chunks of text. Sources mark missing signs as ```[x], ..., (break),``` and more. We standardize this. | ```a-na [x x]``` becomes ```a-na <gap>```.
**Write "determinatives" consistently.** These are silent signs that indicate what kind of word comes next (a god, a place, a person). | ```(d)UTU``` becomes ```{d}UTU```.
**Remove clutter.** Editors' marks, brackets, and extra spaces are removed. | ```[a-na]!``` becomes ```a-na```.

Here is an example of how our function cleans the text. The actual lines used to train the model are much longer.

**Before:** ```um-ma PN qi2-bi₄-ma a-na [x x] sz-ma (d)UTU ```

**After:** ```um-ma <gap> qí-bi4-ma a-na <gap> š-ma {d}UTU```

**The code.** Most steps above are a simple find-and-replace. The damaged-text step uses a **regular expression** (also known as **regex**), a pattern for finding text. One pattern can match many different ways of writing the same thing:

```
text = unicodedata.normalize('NFC', text)               # one standard way to store each letter

text = text.replace("sz", "š").replace("SZ", "Š")       # spell out shorthands

text = text.replace('(d)', '{d}').replace('(ki)', '{ki}')   # determinatives

# Shortened: finds "...", a lone "x", "(break)", "(2 broken lines)"

GAP_RE = re.compile(
    r"\.{3,}|…+"
    r"|(?<!\w)x(?!\w)"               # an "x" not touching other letters, so an “x” in a word isn’t deleted   
    r"|\(\s*break\s*\)"  
    r"|\(\s*\d+\s+broken\s+lines?\s*\)", re.I)

text = GAP_RE.sub('<gap>', text)

text = re.sub(r'(<gap>\s*){2,}', '<gap> ', text)        # repeated gaps become one

text = re.sub(r'\s+', ' ', text).strip()                # many spaces become one
```

### 2.2 The English side

The English function, ```postprocess_text```, is a fix for translations the model writes, so that they follow one consistent style \[1\]. Specifically, it turns the placeholder ```PN``` into ```<gap>```, gives some trade goods a fixed form (```-tax``` becomes ```šadduātum tax```), writes shekel (a Mesopotamian unit) fractions one way, removes grammar notes such as ```(fem.)``` and ```(?)```, and changes Roman-numeral months to numbers.

Here is an example:

**Before:** ```you brought 7 / 12 shekel of -tax and -gold in Month XII (fem.) PN ```

**After:** ``` you brought ½ shekel 15 grains of šadduātum tax and pašallum gold in Month 12 <gap>```

### 3. Filtering

Filtering decides which examples are worth keeping. Our datasets contain many kinds of text, with some translations being more trustworthy than others. Our code favors business-style texts, such as contracts and administrative records, over myths and war accounts. 

This filter works on the English side:

1.  **Turn each sentence into numbers.** A small language model called ```all-MiniLM-L6-v2``` reads each sentence and produces a list of numbers (an **embedding**) that captures its meaning. Sentences with similar meanings get similar numbers.
    
2.  **Compare to the Kaggle training set.** Each of the 250,000 sentences gets a **similarity score** from 0 to 1 (closer to 1 means more alike), based on its closest match among the Kaggle training sentences.
    
3.  **Rank and filter.** We keep the top 60,000, then apply a cutoff. We compared cutoffs: **0.70** (strict), **0.65** (balanced), and **0.60** (lenient), and went with **0.65**. 

```
model = SentenceTransformer('all-MiniLM-L6-v2')

gold_embeddings = model.encode(gold_targets, convert_to_tensor=True)   # official data

pool_embeddings = model.encode(pool_targets, convert_to_tensor=True)   # the big pool/external data

hits = util.semantic_search(pool_embeddings, gold_embeddings, top_k=1) # closest official sentence

df_pool['similarity_score'] = [hit[0]['score'] for hit in hits]

df_pool = df_pool.sort_values(by='similarity_score', ascending=False).head(60000)

df_keep = df_pool[df_pool['similarity_score'] >= 0.65]                 # the cutoff
```

**Limitations:** this filter measures how similar a sentence is to the official data. It does not check whether the translation is correct. A wrong translation could score well if it is similar to the official data.

The examples that passed were mixed with a sample of synthetic data (10,000 with gaps, 20,000 without) and shuffled. This mix became the dataset for the first training stage.

### 4. Additional notes

Our model, **ByT5**, reads text as raw bytes instead of tokens, so no tokenizing step was needed. Length is measured in **bytes**, and a letter like š takes two. Each example also gets a short instruction at the front, ```translate Akkadian to English:```, and examples missing a source or target text are dropped.

## Sources

1.  Our project code
    
2.  Kaggle, "mtm24-akkadian-transliteration" dataset: https://www.kaggle.com/datasets/manwithacat/mtm24-akkadian-transliteration/data 
    
3.  Hugging Face, "phucthaiv02/akkadian-translation" dataset: https://huggingface.co/datasets/phucthaiv02/akkadian-translation 
    
4.  Akkademia (atae\_translated\_detokenized.txt): https://github.com/gaigutherz/Akkademia 
    
5.  Zenodo record: https://zenodo.org/records/17220688 
    
6.  Unicode Standard Annex #15, "Unicode Normalization Forms": https://unicode.org/reports/tr15/ 
    
7.  Xue, L., et al. (2022). "ByT5: Towards a Token-Free Future with Pre-Trained Byte-to-Byte Models." _Transactions of the Association for Computational Linguistics_. [https://arxiv.org/abs/2105.13626](https://arxiv.org/abs/2105.13626)
    
8.  all-MiniLM-L6-v2 model, Sentence Transformers, Hugging Face: [https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2)
    
9.  Reimers, N., & Gurevych, I. (2019). "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks." _EMNLP 2019_. https://arxiv.org/abs/1908.10084
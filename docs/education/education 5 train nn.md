---
sidebar_position: 5
---

# Training a Neural Network

For a machine to learn how to translate a language, **training** is needed. Training involves showing a model examples repeatedly, measuring how well it predicts the correct output, and adjusting the internal parameters so that its predictions improve. 

Our project uses **ByT5**, a pretrained neural network that works with UTF-8 bytes rather than a vocabulary of whole words or subwords. Instead of building a model from scratch, we **fine-tune** an existing ByT5 model on paired Akkadian texts and English translations. This allows the model to adapt what it learned during pretraining to a specific translation task. 

In this section, we will explain the four central ideas behind training: **loss functions, cost functions, gradient descent, and backpropagation**.

## 1\. What does the model learn from?

To train a translation model, we need **parallel corpus**. These are examples containing a source-language text and its corresponding target-language translation. In our case, the source is Akkadian, usually represented in Latin letter transliteration, and the target-language is English. 

**Input: \[EXAMPLE code\]**

**Output:**

The model’s job is to assign higher probabilities to the bytes that make up the correct English translation. ByT5 uses bytes instead of vocabulary words so it mainly converts text to byte IDs rather than learning a word or subword. 

## 2\. Making a prediction

First, the model processes the Akkadian input and begins predicting an English output. This is called the **forward pass**. 

This is what it basically looks like:

Akkadian text → ByT5 model → probabilities for the next English output byte

During training, the model has access to the correct English target. In a method called **teacher forcing**, the decoder is given the correct earlier output units while learning to predict the next one. During actual translation, those correct English units are not given, so the model must generate its output step by step. 

Then, how do we know whether a prediction is good? We calculate its loss. 

## 3\. Loss functions

A **loss function** measures how different the model’s prediction is from a desired output. Lower loss generally means the model assigned greater probability to the correct answer. 

For our translation model ByT5, training typically uses cross-entropy loss. At each output position, the model assigns a probability to the next correct byte. 

The loss would look like:

```-ln(probability assigned to the correct byte)```, where ```ln``` means the natural log.

**\[Some example\]**

A real translation contains many output bytes. Its sequence loss combines the losses across the target positions, typically by averaging them while excluding artificial padding positions. 

A simplified sequence loss can be written like this:

```L = -(1/T) * Σlog(P)``` (correct byte at position t | Akkadian input, preceding correct bytes)

T is the number of output positions included in the calculation. P is the probability assigned by the model. This equation is more complex than the one-byte translations but the principle is consistent. You can learn more about it [here](https://huggingface.co/docs/transformers/tasks/translation).

## 4\. Cost functions

One Akkadian-English pair translation does not tell us how well the model translates overall. We need to consider many examples in order to get the most accurate results.

It is useful to distinguish the two terms like this:

*   **Loss**: The error for one training example (or one output position)
    
*   **Cost**: The loss across multiple examples, such as a batch
    

For a batch containing  

Resources
---------

[https://aclanthology.org/2022.tacl-1.17/](https://aclanthology.org/2022.tacl-1.17/)

[https://huggingface.co/docs/transformers/model\_doc/byt5](https://huggingface.co/docs/transformers/model_doc/byt5)

[https://huggingface.co/docs/transformers/tasks/translation](https://huggingface.co/docs/transformers/tasks/translation)

[https://huggingface.co/docs/transformers/v4.48.2/en/model\_doc/t5](https://huggingface.co/docs/transformers/v4.48.2/en/model_doc/t5)
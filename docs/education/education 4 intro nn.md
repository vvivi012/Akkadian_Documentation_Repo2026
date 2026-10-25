---
sidebar_position: 4
---

# Introduction to Neural Networks

Neural networks are a type of machine learning model that learns patterns from a set of data in order to make predictions and generate outputs. They are a fundamental building block of modern artificial intelligence, and are used in applications such as image recognition, speech processing, recommendation systems, and more.

They are inspired loosely by the way biological neurons communicate, consisting of interconnected “units” of computation organized into layers. Neural networks can model complex (specifically nonlinear) relationships in data, making them useful for problems that are difficult to tackle using other, more traditional approaches.

## How Neural Networks Work

At a high level, a neural network takes an input, processes it through at least one layer of units, and produces an output. A typical example would consist of three types of layers:
- The input layer receives the data that the network will process
- One or more hidden layers transform the input into useful information
- The output layer produces the final result, which can vary from network to network

Each artificial neuron receives numerical inputs, combines them using adjustable values called **weights**, adds a **bias**, and applies an **activation function**. Afterwards, the signal is passed onto the next layer.

[image here maybe?]

The network’s behavior is largely determined by its weights and biases. During training, these parameters are adjusted so that the outputs become more accurate or more suited to the task.

## Common Applications

Neural networks have their uses across a wide range of domains, including:
- Computer vision, or the visual recognition of objects
    - Ex: Face ID
- Natural language processing, or the manipulation of written language
    - Ex: this project!
- Generative AI, or the production of text, images, audio, and other content
    - Ex: large-language models

### Benefits and Limitations

Neural networks are a useful tool in data science for recognizing patterns and making predictions from large data sets that would otherwise be difficult to scale. However, their capabilities do come with trade-offs.

Some of these include:
- **Data requirements**: Many neural networks benefit from large, representative datasets, and data quality can strongly affect performance of the model.
- **Computational costs**: Training and running large models often requires substantial computing resources and higher-end equipment.
- **Reliability and bias**: Networks can reproduce biases in their training data that lead to incorrect predictions, as well as behave more unpredictably in situations that differ from those encountered during training.

Understanding these limitations is important when evaluating and deploying neural networks.

## Sources
1. https://www.youtube.com/watch?v=aircAruvnKk
2. https://www.ibm.com/think/topics/neural-networks
3. https://openstax.org/books/principles-data-science/pages/7-1-introduction-to-neural-networks
4. https://developers.google.com/machine-learning/crash-course/neural-networks
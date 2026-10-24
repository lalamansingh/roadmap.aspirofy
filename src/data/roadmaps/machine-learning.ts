import { buildRoadmap } from '../build'

export default buildRoadmap({
  id: 'machine-learning',
  title: 'Machine Learning Engineer',
  short: 'Build, train, and ship models that work in production.',
  description:
    'Combine solid math and programming with modern modelling techniques, then learn to deploy and maintain models as real software. Focuses on practical judgement as much as algorithms.',
  category: 'role',
  accent: '#ec4899',
  tags: ['ai', 'python', 'mlops'],
  query: 'machine learning',
  sections: [
    {
      title: 'Programming Foundations',
      level: 'beginner',
      description: 'The Python toolkit every ML workflow leans on.',
      topics: [
        ['Python for ML', 8, 'Idiomatic Python, virtual environments, and writing clean, testable modules.', 'https://docs.python.org/3/'],
        ['NumPy', 4, 'Vectorised array operations, broadcasting, and avoiding slow Python loops.', 'https://numpy.org/doc/stable/'],
        ['pandas', 5, 'Load, clean, join, and reshape tabular data with DataFrames.', 'https://pandas.pydata.org/docs/'],
        ['Plotting with Matplotlib & Seaborn', 3, 'Visualise distributions, relationships, and model diagnostics.'],
        ['Jupyter notebooks', 1, 'Interactive exploration, and knowing when to move code into scripts.'],
      ],
    },
    {
      title: 'Mathematics',
      level: 'beginner',
      description: 'Enough math to understand what the algorithms are doing.',
      topics: [
        ['Linear algebra', 8, 'Vectors, matrices, dot products, decompositions, and their geometric meaning.'],
        ['Calculus & gradients', 6, 'Derivatives, the chain rule, and how gradients drive optimisation.'],
        ['Probability', 6, 'Random variables, common distributions, conditional probability, and Bayes\' rule.'],
        ['Statistics', 6, 'Estimation, hypothesis testing, confidence intervals, and sampling bias.'],
        ['Optimisation basics', 3, 'Convexity, gradient descent variants, and learning-rate intuition.', { kind: 'optional' }],
      ],
    },
    {
      title: 'Classical Machine Learning',
      level: 'intermediate',
      description: 'Proven algorithms that still win on tabular problems.',
      topics: [
        ['Supervised learning workflow', 3, 'Frame problems, split data, fit models, and avoid leakage between sets.', 'https://scikit-learn.org/stable/user_guide.html'],
        ['Linear & logistic regression', 4, 'Interpretable baselines, regularisation, and probability outputs.'],
        ['Decision trees & ensembles', 5, 'Random forests and gradient boosting with XGBoost or LightGBM.'],
        ['Unsupervised learning', 4, 'Clustering with k-means and DBSCAN, plus dimensionality reduction with PCA.'],
        ['Support vector machines', 2, 'Margin-based classifiers and the kernel trick.', { kind: 'optional' }],
        ['Feature engineering', 4, 'Encode categories, scale numbers, handle missing values, and build pipelines.'],
      ],
      project: {
        title: 'Tabular prediction pipeline',
        description: 'Build an end-to-end scikit-learn pipeline on a public dataset, compare three model families with cross-validation, and write up which one you would ship and why.',
      },
    },
    {
      title: 'Model Evaluation',
      level: 'intermediate',
      description: 'Measure honestly and choose the right trade-offs.',
      topics: [
        ['Metrics that matter', 3, 'Precision, recall, F1, ROC-AUC, RMSE, and matching metrics to business goals.'],
        ['Cross-validation', 2, 'K-fold, stratified, and time-series splits for reliable estimates.'],
        ['Bias, variance & overfitting', 2, 'Diagnose underfitting and overfitting with learning curves.'],
        ['Hyperparameter tuning', 3, 'Grid, random, and Bayesian search with tools like Optuna.'],
        ['Imbalanced data', 2, 'Resampling, class weights, and threshold tuning for rare outcomes.'],
      ],
    },
    {
      title: 'Deep Learning',
      level: 'intermediate',
      description: 'Neural networks and the frameworks that train them.',
      topics: [
        ['Neural network fundamentals', 5, 'Layers, activations, loss functions, and backpropagation from first principles.'],
        ['PyTorch', 8, 'Tensors, autograd, modules, data loaders, and writing a training loop.', 'https://pytorch.org/docs/stable/index.html'],
        ['TensorFlow & Keras', 8, 'A high-level API for building and training networks quickly.', { kind: 'alternative', docs: 'https://www.tensorflow.org/guide' }],
        ['Convolutional networks', 5, 'Image classification, detection basics, and transfer learning from pretrained backbones.'],
        ['Sequence models', 4, 'RNNs and LSTMs for ordered data, and why attention replaced them.'],
        ['Training at scale', 3, 'Mixed precision, gradient accumulation, and multi-GPU data parallelism.', { kind: 'optional' }],
      ],
    },
    {
      title: 'Transformers & Modern AI',
      level: 'advanced',
      description: 'Work with the architectures behind today\'s large models.',
      topics: [
        ['Attention & transformer architecture', 5, 'Self-attention, positional encodings, and encoder versus decoder stacks.'],
        ['Hugging Face ecosystem', 4, 'Load pretrained models, tokenizers, and datasets with a few lines of code.', 'https://huggingface.co/docs/transformers/index'],
        ['Fine-tuning & PEFT', 5, 'Adapt pretrained models efficiently with LoRA and related methods.'],
        ['Embeddings & vector search', 3, 'Represent text and images as vectors for retrieval and similarity tasks.'],
        ['Evaluating generative models', 3, 'Benchmarks, human review, and automated judges for open-ended outputs.', { kind: 'optional' }],
      ],
      project: {
        title: 'Fine-tune a text classifier',
        description: 'Fine-tune a small pretrained transformer on a labelled dataset, compare it against a classical baseline, and publish the model card with honest limitations.',
      },
    },
    {
      title: 'Data & Experiment Management',
      level: 'advanced',
      description: 'Make results reproducible and comparable.',
      topics: [
        ['Experiment tracking', 3, 'Log parameters, metrics, and artifacts with MLflow or Weights & Biases.', 'https://mlflow.org/docs/latest/index.html'],
        ['Data versioning', 2, 'Version datasets alongside code with DVC or lakeFS.'],
        ['Feature stores', 3, 'Serve consistent features to training and inference with Feast or similar.', { kind: 'optional' }],
        ['Reproducible pipelines', 3, 'Seed control, pinned environments, and orchestrated training steps.'],
      ],
    },
    {
      title: 'Deployment & MLOps',
      level: 'advanced',
      description: 'Turn a trained model into a dependable service.',
      topics: [
        ['Model serving APIs', 4, 'Wrap models behind FastAPI or a dedicated server like BentoML or Triton.'],
        ['Containerising models', 2, 'Package model, dependencies, and runtime in a reproducible Docker image.'],
        ['Batch vs real-time inference', 2, 'Choose between scheduled scoring jobs and low-latency online endpoints.'],
        ['Model optimisation', 3, 'Quantisation, pruning, distillation, and ONNX export for faster inference.'],
        ['Monitoring & drift', 3, 'Track prediction quality, data drift, and trigger retraining when performance slips.'],
        ['Managed ML platforms', 3, 'Train and deploy on SageMaker, Vertex AI, or Azure ML.', { kind: 'alternative' }],
      ],
      project: {
        title: 'Production model service',
        description: 'Deploy a trained model as a containerised API with CI, request logging, a drift dashboard, and a documented retraining procedure.',
      },
    },
    {
      title: 'Responsible ML',
      level: 'advanced',
      description: 'Build systems people can trust.',
      topics: [
        ['Fairness & bias auditing', 3, 'Measure disparities across groups and apply mitigation techniques.'],
        ['Explainability', 3, 'Interpret predictions with SHAP, permutation importance, and partial dependence.'],
        ['Privacy techniques', 2, 'Anonymisation, differential privacy, and federated learning basics.', { kind: 'optional' }],
        ['Model documentation', 1, 'Write model cards and datasheets that state intended use and known risks.'],
      ],
    },
  ],
})

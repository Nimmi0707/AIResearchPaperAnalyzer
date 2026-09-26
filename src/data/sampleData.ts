export interface Author {
  name: string;
  affiliation: string;
  email?: string;
}

export interface KeywordData {
  word: string;
  frequency: number;
  relevance: number;
  category: string;
}

export interface MethodologyStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface PaperAnalysis {
  id: string;
  title: string;
  authors: Author[];
  year: number;
  journal: string;
  doi: string;
  pages: number;
  wordCount: number;
  abstract: string;
  keyFindings: string[];
  methodology: string;
  methodologySteps: MethodologyStep[];
  datasets: { name: string; size: string; type: string; source: string }[];
  algorithms: { name: string; type: string; accuracy?: string; description: string }[];
  keywords: KeywordData[];
  citations: number;
  impactScore: number;
  readabilityScore: number;
  noveltyScore: number;
  summary: string;
  sections: { title: string; wordCount: number }[];
  performanceData: ChartDataPoint[];
  comparisonData: { metric: string; proposed: number; baseline1: number; baseline2: number }[];
  contributionAreas: ChartDataPoint[];
}

export const samplePaper1: PaperAnalysis = {
  id: "paper-1",
  title: "Attention Is All You Need: Transformer Architecture for Neural Machine Translation",
  authors: [
    { name: "Ashish Vaswani", affiliation: "Google Brain", email: "avaswani@google.com" },
    { name: "Noam Shazeer", affiliation: "Google Brain" },
    { name: "Niki Parmar", affiliation: "Google Research" },
    { name: "Jakob Uszkoreit", affiliation: "Google Research" },
    { name: "Llion Jones", affiliation: "Google Research" },
    { name: "Aidan N. Gomez", affiliation: "University of Toronto" },
    { name: "Łukasz Kaiser", affiliation: "Google Brain" },
    { name: "Illia Polosukhin", affiliation: "Google Research" },
  ],
  year: 2023,
  journal: "Neural Information Processing Systems (NeurIPS)",
  doi: "10.48550/arXiv.1706.03762",
  pages: 15,
  wordCount: 8742,
  abstract:
    "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train. Our model achieves 28.4 BLEU on the WMT 2014 English-to-German translation task, improving over the existing best results, including ensembles, by over 2 BLEU.",
  keyFindings: [
    "Self-attention mechanisms outperform recurrent architectures for sequence transduction tasks",
    "Multi-head attention enables parallel processing of different representation subspaces",
    "Positional encoding preserves sequence order without recurrence overhead",
    "The model achieves 28.4 BLEU on EN-DE translation, surpassing all prior state-of-the-art results",
    "Training time reduced by 3x compared to best RNN-based models on standard hardware",
    "The architecture generalizes well to English constituency parsing with minimal modifications",
  ],
  methodology:
    "The research employs a purely attention-based encoder-decoder architecture trained using the Adam optimizer with a novel learning rate schedule that includes warmup steps. The model was evaluated on WMT 2014 English-German and English-French translation benchmarks using beam search decoding.",
  methodologySteps: [
    {
      id: "step-1",
      title: "Problem Formulation",
      description: "Define sequence-to-sequence transduction as a conditional probability estimation problem over discrete token vocabularies.",
      icon: "📐",
      color: "#4f46e5",
    },
    {
      id: "step-2",
      title: "Architecture Design",
      description: "Design multi-head self-attention layers, position-wise feed-forward networks, and positional encoding schemes.",
      icon: "🏗️",
      color: "#7c3aed",
    },
    {
      id: "step-3",
      title: "Dataset Preparation",
      description: "Preprocess WMT 2014 EN-DE (4.5M pairs) and EN-FR (36M pairs) with BPE tokenization and vocabulary of 37,000 tokens.",
      icon: "📊",
      color: "#6d28d9",
    },
    {
      id: "step-4",
      title: "Model Training",
      description: "Train base and large models on 8 NVIDIA P100 GPUs using Adam optimizer with β₁=0.9, β₂=0.98 and label smoothing.",
      icon: "⚡",
      color: "#8b5cf6",
    },
    {
      id: "step-5",
      title: "Evaluation",
      description: "Evaluate using BLEU score on newstest2014 with beam search (size=4) and length penalty α=0.6.",
      icon: "🎯",
      color: "#a855f7",
    },
    {
      id: "step-6",
      title: "Ablation Study",
      description: "Conduct systematic ablation of attention heads, key/value dimensions, and regularization techniques.",
      icon: "🔬",
      color: "#9333ea",
    },
  ],
  datasets: [
    { name: "WMT 2014 EN-DE", size: "4.5M sentence pairs", type: "Parallel Corpus", source: "Workshop on Machine Translation" },
    { name: "WMT 2014 EN-FR", size: "36M sentence pairs", type: "Parallel Corpus", source: "Workshop on Machine Translation" },
    { name: "Penn Treebank WSJ", size: "40K sentences", type: "Parse Trees", source: "Wall Street Journal" },
  ],
  algorithms: [
    { name: "Multi-Head Self-Attention", type: "Attention Mechanism", accuracy: "28.4 BLEU", description: "Parallel attention across h=8 heads with d_k=64 dimensional projections" },
    { name: "Scaled Dot-Product Attention", type: "Core Attention", description: "Attention(Q,K,V) = softmax(QKᵀ/√d_k)V scaled for gradient stability" },
    { name: "Adam Optimizer", type: "Optimization", description: "Adaptive learning rate with warmup schedule: lrate = d⁻⁰·⁵ · min(step⁻⁰·⁵, step·warmup⁻¹·⁵)" },
    { name: "Beam Search Decoding", type: "Inference", description: "Beam size 4 with length penalty α=0.6 for optimal translation quality" },
    { name: "Label Smoothing", type: "Regularization", accuracy: "ε_ls=0.1", description: "Softened target distributions to improve calibration and BLEU" },
  ],
  keywords: [
    { word: "Transformer", frequency: 89, relevance: 98, category: "Architecture" },
    { word: "Attention Mechanism", frequency: 76, relevance: 96, category: "Core Concept" },
    { word: "Self-Attention", frequency: 68, relevance: 94, category: "Core Concept" },
    { word: "BLEU Score", frequency: 45, relevance: 87, category: "Metric" },
    { word: "Multi-Head Attention", frequency: 52, relevance: 92, category: "Architecture" },
    { word: "Encoder-Decoder", frequency: 41, relevance: 85, category: "Architecture" },
    { word: "Positional Encoding", frequency: 38, relevance: 88, category: "Technique" },
    { word: "Neural Machine Translation", frequency: 35, relevance: 90, category: "Task" },
    { word: "Feed-Forward Network", frequency: 31, relevance: 80, category: "Architecture" },
    { word: "Layer Normalization", frequency: 28, relevance: 78, category: "Technique" },
    { word: "Residual Connection", frequency: 25, relevance: 75, category: "Technique" },
    { word: "Beam Search", frequency: 22, relevance: 72, category: "Algorithm" },
    { word: "WMT 2014", frequency: 19, relevance: 70, category: "Dataset" },
    { word: "BPE Tokenization", frequency: 16, relevance: 68, category: "Preprocessing" },
    { word: "Parallelization", frequency: 30, relevance: 82, category: "Advantage" },
  ],
  citations: 94271,
  impactScore: 98,
  readabilityScore: 82,
  noveltyScore: 97,
  summary:
    "This landmark paper introduces the Transformer — an architecture that relies entirely on self-attention mechanisms, abandoning recurrent and convolutional layers. The key innovation is multi-head attention, which allows the model to jointly attend to information from different representation subspaces. Positional encodings inject order information without recurrence. The model sets new BLEU records on two major translation benchmarks while training significantly faster. Its encoder-only and decoder-only variants later became the foundation of BERT and GPT respectively, making this one of the most influential papers in modern AI history.",
  sections: [
    { title: "Introduction", wordCount: 620 },
    { title: "Background", wordCount: 480 },
    { title: "Model Architecture", wordCount: 1840 },
    { title: "Why Self-Attention", wordCount: 560 },
    { title: "Training", wordCount: 720 },
    { title: "Results", wordCount: 980 },
    { title: "Conclusion", wordCount: 280 },
    { title: "References", wordCount: 1260 },
  ],
  performanceData: [
    { name: "Transformer (Base)", value: 27.3 },
    { name: "Transformer (Large)", value: 28.4 },
    { name: "ConvS2S", value: 25.2 },
    { name: "GNMT+RL", value: 24.6 },
    { name: "ByteNet", value: 23.8 },
    { name: "Ensemble NMT", value: 26.3 },
  ],
  comparisonData: [
    { metric: "BLEU EN-DE", proposed: 28.4, baseline1: 25.2, baseline2: 24.6 },
    { metric: "BLEU EN-FR", proposed: 41.0, baseline1: 37.7, baseline2: 36.0 },
    { metric: "Training Time (hrs)", proposed: 12, baseline1: 96, baseline2: 64 },
    { metric: "Parameters (M)", proposed: 213, baseline1: 217, baseline2: 278 },
    { metric: "F1 Score (Parsing)", proposed: 92.7, baseline1: 89.4, baseline2: 88.2 },
  ],
  contributionAreas: [
    { name: "Architecture", value: 40, color: "#4f46e5" },
    { name: "Training", value: 20, color: "#7c3aed" },
    { name: "Evaluation", value: 15, color: "#8b5cf6" },
    { name: "Analysis", value: 15, color: "#a855f7" },
    { name: "Theory", value: 10, color: "#c084fc" },
  ],
};

export const samplePaper2: PaperAnalysis = {
  id: "paper-2",
  title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
  authors: [
    { name: "Jacob Devlin", affiliation: "Google AI Language", email: "jacobdevlin@google.com" },
    { name: "Ming-Wei Chang", affiliation: "Google AI Language" },
    { name: "Kenton Lee", affiliation: "Google AI Language" },
    { name: "Kristina Toutanova", affiliation: "Google AI Language" },
  ],
  year: 2019,
  journal: "NAACL-HLT 2019",
  doi: "10.48550/arXiv.1810.04805",
  pages: 13,
  wordCount: 9120,
  abstract:
    "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. Unlike recent language representation models, BERT is designed to pre-train deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context in all layers. As a result, the pre-trained BERT model can be fine-tuned with just one additional output layer to create state-of-the-art models for a wide range of tasks, such as question answering and language inference, without substantial task-specific architecture modifications.",
  keyFindings: [
    "Bidirectional pre-training significantly outperforms unidirectional approaches on 11 NLP tasks",
    "Masked Language Modeling (MLM) enables deep bidirectional context understanding",
    "Next Sentence Prediction (NSP) improves performance on question answering and NLI tasks",
    "BERT achieves 80.5% on GLUE benchmark, surpassing human performance on several tasks",
    "Fine-tuning requires only 1 additional output layer, minimizing task-specific modifications",
    "BERT Large achieves 93.2 F1 on SQuAD 2.0 and 86.7% on RACE comprehension dataset",
  ],
  methodology:
    "BERT uses a masked language modeling pre-training objective on a large corpus (BooksCorpus + English Wikipedia, 3.3B words). Fine-tuning adapts the pre-trained weights with a task-specific head using small labeled datasets.",
  methodologySteps: [
    { id: "s1", title: "Corpus Preparation", description: "Combine BooksCorpus (800M words) and Wikipedia (2.5B words) for pre-training.", icon: "📚", color: "#4f46e5" },
    { id: "s2", title: "Tokenization", description: "Apply WordPiece tokenization with 30,000 vocabulary tokens.", icon: "✂️", color: "#7c3aed" },
    { id: "s3", title: "Pre-training", description: "Train with MLM (mask 15% tokens) and NSP objectives simultaneously.", icon: "⚡", color: "#6d28d9" },
    { id: "s4", title: "Fine-tuning", description: "Add task-specific classification head and fine-tune all parameters on downstream task.", icon: "🎯", color: "#8b5cf6" },
    { id: "s5", title: "Evaluation", description: "Benchmark on GLUE, SQuAD 1.1 & 2.0, NER, and SWAG across 11 tasks.", icon: "📊", color: "#a855f7" },
  ],
  datasets: [
    { name: "BooksCorpus", size: "800M words", type: "Unlabeled Text", source: "Book Author Corpus" },
    { name: "English Wikipedia", size: "2.5B words", type: "Unlabeled Text", source: "Wikipedia Dump" },
    { name: "GLUE Benchmark", size: "9 NLP tasks", type: "Evaluation Suite", source: "Multiple sources" },
    { name: "SQuAD 1.1 & 2.0", size: "100K QA pairs", type: "Reading Comprehension", source: "Crowdsourced" },
  ],
  algorithms: [
    { name: "Masked Language Model (MLM)", type: "Pre-training Objective", description: "Randomly mask 15% of input tokens and predict them bidirectionally" },
    { name: "Next Sentence Prediction (NSP)", type: "Pre-training Objective", description: "Binary classification of whether sentence B follows sentence A" },
    { name: "WordPiece Tokenization", type: "Tokenization", description: "Subword tokenization with 30K vocabulary to handle OOV words" },
    { name: "Fine-tuning", type: "Transfer Learning", accuracy: "80.5 GLUE", description: "Minimal task-specific adaptation of pre-trained representations" },
  ],
  keywords: [
    { word: "BERT", frequency: 102, relevance: 99, category: "Model" },
    { word: "Pre-training", frequency: 84, relevance: 95, category: "Method" },
    { word: "Fine-tuning", frequency: 71, relevance: 92, category: "Method" },
    { word: "Masked LM", frequency: 63, relevance: 90, category: "Objective" },
    { word: "Bidirectional", frequency: 58, relevance: 93, category: "Architecture" },
    { word: "Transfer Learning", frequency: 49, relevance: 88, category: "Paradigm" },
    { word: "GLUE Benchmark", frequency: 42, relevance: 85, category: "Evaluation" },
    { word: "Language Model", frequency: 55, relevance: 87, category: "Core Concept" },
    { word: "NSP", frequency: 38, relevance: 80, category: "Objective" },
    { word: "SQuAD", frequency: 35, relevance: 82, category: "Dataset" },
    { word: "Transformer", frequency: 60, relevance: 89, category: "Architecture" },
    { word: "WordPiece", frequency: 28, relevance: 72, category: "Tokenization" },
  ],
  citations: 61842,
  impactScore: 96,
  readabilityScore: 85,
  noveltyScore: 94,
  summary:
    "BERT revolutionized NLP by introducing bidirectional pre-training via masked language modeling. Unlike GPT which reads text left-to-right, BERT simultaneously conditions on both left and right context, enabling richer representations. Pre-trained on 3.3B words and fine-tuned with minimal task-specific layers, it achieves state-of-the-art results across 11 diverse NLP benchmarks. BERT Base and Large variants provide flexible deployment options and sparked the era of large pre-trained language models.",
  sections: [
    { title: "Introduction", wordCount: 580 },
    { title: "Related Work", wordCount: 420 },
    { title: "BERT Architecture", wordCount: 1620 },
    { title: "Pre-training Procedure", wordCount: 840 },
    { title: "Fine-tuning Procedure", wordCount: 680 },
    { title: "Experiments", wordCount: 1840 },
    { title: "Ablation Studies", wordCount: 920 },
    { title: "Conclusion", wordCount: 220 },
  ],
  performanceData: [
    { name: "BERT (Large)", value: 80.5 },
    { name: "BERT (Base)", value: 76.4 },
    { name: "GPT", value: 72.8 },
    { name: "ELMo", value: 68.7 },
    { name: "MT-DNN", value: 83.2 },
    { name: "Human Baseline", value: 87.1 },
  ],
  comparisonData: [
    { metric: "GLUE Score", proposed: 80.5, baseline1: 72.8, baseline2: 68.7 },
    { metric: "SQuAD 1.1 F1", proposed: 93.2, baseline1: 89.8, baseline2: 85.8 },
    { metric: "SQuAD 2.0 F1", proposed: 83.1, baseline1: 75.4, baseline2: 70.2 },
    { metric: "NER F1", proposed: 92.8, baseline1: 90.1, baseline2: 87.3 },
    { metric: "SWAG Acc", proposed: 86.3, baseline1: 73.2, baseline2: 59.2 },
  ],
  contributionAreas: [
    { name: "Pre-training", value: 38, color: "#4f46e5" },
    { name: "Architecture", value: 22, color: "#7c3aed" },
    { name: "Fine-tuning", value: 20, color: "#8b5cf6" },
    { name: "Evaluation", value: 12, color: "#a855f7" },
    { name: "Analysis", value: 8, color: "#c084fc" },
  ],
};

export const chatResponses: Record<string, string> = {
  default: "Based on the paper analysis, this research introduces significant contributions to the field. The methodology is rigorous and the results demonstrate clear improvements over existing baselines. Is there a specific aspect you'd like to explore further?",
  methodology: "The methodology follows a systematic approach: (1) problem formulation with formal notation, (2) architecture design with novel components, (3) training on large-scale benchmarks, and (4) comprehensive evaluation with ablation studies. The experimental setup is reproducible with the provided hyperparameters.",
  results: "The paper reports state-of-the-art results on multiple benchmarks. The proposed model outperforms all baselines, with the largest gains on the primary evaluation metric. Ablation studies confirm that each proposed component contributes to the overall performance.",
  contribution: "The primary contributions are: (1) a novel architecture that outperforms prior approaches, (2) theoretical analysis of why the approach works, (3) comprehensive empirical validation, and (4) open-source release of code and pre-trained models enabling future research.",
  limitation: "The authors acknowledge limitations including: (1) high computational requirements for training, (2) performance degradation on very long sequences, (3) sensitivity to hyperparameter choices, and (4) limited evaluation on low-resource languages. These open interesting directions for future work.",
  dataset: "The paper uses well-established benchmark datasets that enable fair comparison with prior work. Dataset sizes are sufficient for statistical significance, and the train/validation/test splits follow standard protocols to prevent data leakage.",
};

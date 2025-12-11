export interface PricingFeature {
  text: string;
  value?: string;
  included: boolean;
}

export interface PricingPackage {
  name: string;
  price: string;
  duration: string;
  features: PricingFeature[];
  isPopular?: boolean;
  isVip?: boolean;
}

export interface ExpenseItem {
  name: string;
  calculation: string;
  total: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  color: string;
  icon: any; // Using Lucide icon component type
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Node {
  id: string;
  label: string;
  type: 'root' | 'category' | 'concept';
  description?: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface Link {
  source: string | Node;
  target: string | Node;
  relation?: string;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}

export interface GeneratedContent {
  title: string;
  summary: string;
  keyPoints: string[];
  explanation: string;
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
  };
}
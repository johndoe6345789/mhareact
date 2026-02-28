export interface OrgNode {
  id: string;
  title: string;
  subtitle: string;
  relevance: string;
  highlight: boolean;
  children: OrgNode[];
}

export interface DocumentItem {
  name: string;
  description: string;
}

export interface DocumentCategory {
  category: string;
  description: string;
  documents: DocumentItem[];
}

export interface MHASection {
  section: string;
  title: string;
  category: 'detention' | 'rights' | 'discharge' | 'community' | 'oversight' | 'police';
  duration: string | null;
  renewable: boolean;
  purpose: string;
  whoApplies: string;
  keyPoints: string[];
  highlight: boolean;
}

export interface LetterField {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'date' | 'textarea';
  required: boolean;
  hint?: string;
}

export interface LetterTemplate {
  id: string;
  title: string;
  legalBasis: string;
  citation: string;
  citationUrl: string;
  fields: LetterField[];
  templateLines: string[];
}

export interface Right {
  id: string;
  title: string;
  priority: 'essential' | 'important' | 'useful';
  summary: string;
  detail: string;
  howToExercise: string;
  legalBasis: string;
  appliesTo: string[];
}

export interface DischargeRoute {
  id: string;
  rank: number;
  title: string;
  summary: string;
  applies: string[];
  timeframe: string;
  legalBasis: string;
  steps: string[];
  outcomes: string[];
  strengths: string[];
  limitations: string[];
  tip: string;
}

export interface CircumstanceStrategy {
  action: string;
  detail: string;
}

export interface PatientCircumstance {
  id: string;
  title: string;
  shortLabel: string;
  impact: 'helpful' | 'neutral' | 'challenging' | 'very-challenging';
  description: string;
  strategies: CircumstanceStrategy[];
  affectsRoutes: string[];
  watchOut: string;
}

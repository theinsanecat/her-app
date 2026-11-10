export interface Article {
  id: string;
  category: string;
  title: string;
  dek: string;
  minutes: number;
  simple: string;
  research: string;
  established: string[];
  emerging: string[];
  seekCare: string[];
  sources: string[];
}

export interface SymptomGuide {
  symptomID: string;
  intro: string;
  factors: { label: string; evidence: 'Established' | 'Emerging' | 'Commonly reported'; detail: string }[];
  seekCare: string[];
  articleIDs: string[];
}

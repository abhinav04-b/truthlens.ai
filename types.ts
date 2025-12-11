export interface AnalysisResult {
  id: string;
  fileName: string;
  imageUrl: string;
  date: string;
  isFake: boolean;
  confidence: number;
  artifactsDetected: number;
  artifacts: string[];
  synthIdDetected: boolean;
  isSocialFilter: boolean; // New field for harmless filters
  explanation: string;
  timestamp: number;
}

export type ThemeMode = 'dark' | 'light';

export type ViewType = 'home' | 'analyze' | 'about' | 'legal' | 'fund';
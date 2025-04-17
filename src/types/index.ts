
// Types pour les données du CV
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  summary: string;
  photoUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

export interface Language {
  id: string;
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "fluent" | "native";
}

export interface ResumeTemplate {
  id: string;
  name: string;
  thumbnail: string;
  primaryColor: string;
  fontFamily: string;
  previewComponent: React.ComponentType<ResumeData>;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  languages: Language[];
  template: string;
}

// Types pour les props des composants
export interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export interface ResumeBuilderProps {
  initialData?: ResumeData;
}

export interface ResumePreviewProps {
  data: ResumeData;
}

export interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

export interface ExportOptionsProps {
  onExport: (format: 'pdf' | 'docx' | 'image') => void;
  isPending: boolean;
}

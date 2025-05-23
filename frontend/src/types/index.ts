
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

export interface GeneralSkill {
  id: string;
  name: string;
}

export interface Language {
  id: string;
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "fluent" | "native";
}

export interface CentreInteret {
  id: string;
  name: string;
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
  generalskills: GeneralSkill[];
  languages: Language[];
  interests: CentreInteret[];
  template: string;
}

// Types pour les props des composants
export interface FormSectionProps {
  title: string;
  children?: React.ReactNode;
}

export interface PersonalInfoFormProps {
  title: string;
  initialData: PersonalInfo;
  onSave: (personalInfo: PersonalInfo) => void;
  children?: React.ReactNode;
}

export interface ExperienceFormProps {
  title: string;
  initialData: Experience[];
  onSave: (experiences: Experience[]) => void;
  children?: React.ReactNode;
}

export interface EducationFormProps {
  title: string;
  initialData: Education[];
  onSave: (educations: Education[]) => void;
  children?: React.ReactNode;
}

export interface SkillsFormProps {
  title: string;
  initialSkills: Skill[];
  initialGeneralSkills: GeneralSkill[];
  initialLanguages: Language[];
  onSave: (data: { skills: Skill[], languages: Language[], generalskills: GeneralSkill[] }) => void;
  children?: React.ReactNode;
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

// export interface ExportOptionsProps {
//   onExport: (format: 'pdf' | 'docx' | 'image') => void;
//   isPending: boolean;
// }

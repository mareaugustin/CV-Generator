
import { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ResumeData } from "@/types";
import PersonalInfoForm from "./PersonalInfoForm";
import ExperienceForm from "./ExperienceForm";
import EducationForm from "./EducationForm";
import SkillsForm from "./SkillsForm";
import TemplateSelector from "./TemplateSelector";
import ResumePreview from "./ResumePreview";
import ExportOptions from "./ExportOptions";
import { generatePDF, generateImage, generateDOCX } from "@/lib/pdfGenerator";
import { FileDown, FileText, Save, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";

const defaultResumeData: ResumeData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
  },
  experiences: [],
  educations: [],
  skills: [],
  languages: [],
  template: "modern",
};

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [isPending, setIsPending] = useState(false);
  const [currentTab, setCurrentTab] = useState("edit");
  const resumeRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Fonction pour mettre à jour les informations personnelles
  const updatePersonalInfo = (personalInfo: any) => {
    setResumeData((prev) => ({ ...prev, personalInfo }));
    toast({
      title: "Informations personnelles enregistrées",
      description: "Vos informations personnelles ont été mises à jour avec succès.",
    });
  };

  // Fonction pour mettre à jour les expériences
  const updateExperiences = (experiences: any) => {
    setResumeData((prev) => ({ ...prev, experiences }));
    toast({
      title: "Expériences enregistrées",
      description: `${experiences.length} expérience(s) professionnelle(s) enregistrée(s).`,
    });
  };

  // Fonction pour mettre à jour les formations
  const updateEducations = (educations: any) => {
    setResumeData((prev) => ({ ...prev, educations }));
    toast({
      title: "Formations enregistrées",
      description: `${educations.length} formation(s) enregistrée(s).`,
    });
  };

  // Fonction pour mettre à jour les compétences et langues
  const updateSkills = ({ skills, languages }: any) => {
    setResumeData((prev) => ({ ...prev, skills, languages }));
    toast({
      title: "Compétences et langues enregistrées",
      description: `${skills.length} compétence(s) et ${languages.length} langue(s) enregistrée(s).`,
    });
  };

  // Fonction pour mettre à jour le template
  const updateTemplate = (template: string) => {
    setResumeData((prev) => ({ ...prev, template }));
    toast({
      title: "Modèle mis à jour",
      description: "Le modèle de votre CV a été mis à jour.",
    });
  };

  // Fonction pour exporter le CV
  const handleExport = async (format: 'pdf' | 'docx' | 'image') => {
    if (!resumeRef.current) return;
    
    setIsPending(true);
    
    try {
      let fileUrl = '';
      let fileName = `CV_${resumeData.personalInfo.firstName || 'Sans'}_${resumeData.personalInfo.lastName || 'Nom'}_${new Date().toISOString().slice(0,10)}`;
      
      switch (format) {
        case 'pdf':
          fileUrl = await generatePDF(resumeRef.current, resumeData);
          fileName += '.pdf';
          break;
        case 'docx':
          fileUrl = await generateDOCX(resumeRef.current, resumeData);
          fileName += '.docx';
          break;
        case 'image':
          fileUrl = await generateImage(resumeRef.current, resumeData);
          fileName += '.png';
          break;
      }
      
      // Créer un lien de téléchargement
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Exportation réussie",
        description: `Votre CV a été exporté au format ${format.toUpperCase()}.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur d'exportation",
        description: "Une erreur s'est produite lors de l'exportation de votre CV.",
      });
    } finally {
      setIsPending(false);
    }
  };

  // Fonction pour sauvegarder le CV
  const saveResume = () => {
    try {
      localStorage.setItem('savedResume', JSON.stringify(resumeData));
      toast({
        title: "CV sauvegardé",
        description: "Votre CV a été sauvegardé localement avec succès.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de sauvegarde",
        description: "Une erreur s'est produite lors de la sauvegarde de votre CV.",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid grid-cols-2 md:w-[400px]">
            <TabsTrigger value="edit">Éditer</TabsTrigger>
            <TabsTrigger value="preview">Aperçu</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button 
              variant="outline"
              className="flex items-center gap-2"
              onClick={saveResume}
            >
              <Save className="h-4 w-4" />
              <span className="hidden md:inline">Sauvegarder</span>
            </Button>

            <div className="hidden md:flex gap-2">
              <Button 
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => handleExport('pdf')}
                disabled={isPending}
              >
                <FileText className="h-4 w-4" />
                PDF
              </Button>
              
              <Button 
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => handleExport('image')}
                disabled={isPending}
              >
                <FileImage className="h-4 w-4" />
                Image
              </Button>
            </div>

            <Button 
              variant="default"
              className="bg-resume-primary hover:bg-resume-secondary flex items-center gap-2"
              onClick={() => setCurrentTab('preview')}
            >
              <FileDown className="h-4 w-4" />
              <span className="hidden md:inline">Prévisualiser</span>
            </Button>
          </div>
        </div>

        <TabsContent value="edit" className="space-y-8 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <PersonalInfoForm 
                title="Informations personnelles" 
                initialData={resumeData.personalInfo} 
                onSave={updatePersonalInfo} 
              />
              
              <ExperienceForm 
                title="Expérience professionnelle" 
                initialData={resumeData.experiences} 
                onSave={updateExperiences} 
              />
              
              <EducationForm 
                title="Formation" 
                initialData={resumeData.educations} 
                onSave={updateEducations} 
              />
              
              <SkillsForm 
                title="Compétences et langues" 
                initialSkills={resumeData.skills} 
                initialLanguages={resumeData.languages} 
                onSave={updateSkills} 
              />
            </div>
            
            <div className="space-y-6">
              <TemplateSelector 
                selectedTemplate={resumeData.template} 
                onSelectTemplate={updateTemplate} 
              />
              
              <div className="hidden lg:block">
                <ExportOptions 
                  onExport={handleExport} 
                  isPending={isPending} 
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="mt-4">
          <div className="mb-6">
            <Button 
              onClick={() => setCurrentTab('edit')} 
              variant="outline"
              className="mb-4"
            >
              Retour à l'éditeur
            </Button>
            
            <div className="block lg:hidden mb-6">
              <ExportOptions 
                onExport={handleExport} 
                isPending={isPending} 
              />
            </div>
          </div>
          
          <div ref={resumeRef}>
            <ResumePreview data={resumeData} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeBuilder;


import { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ResumeData } from "@/types";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import SkillsForm from "../components/SkillsForm";
import CentreInteretForm from "../components/CentreInteretForm";
import TemplateSelector from "../components/TemplateSelector";
import ResumePreview from "../components/ResumePreview";
import { generatePDF} from "@/lib/pdfGenerator";
import { FileDown, FileText, Save, FileImage, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resumeService } from "@/services/api";
import Header from "@/components/Header";
import logo from "@/assets/logo/magilog.svg"

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
  generalskills: [],
  languages: [],
  interests: [],
  template: "modern",
};

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [isPending, setIsPending] = useState(false);
  const [currentTab, setCurrentTab] = useState("edit");
  const resumeRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();


  useEffect(() => {
    // Charge le CV depuis le localStorage si disponible
    const savedResume = localStorage.getItem('currentResume');
    if (savedResume) {
      try {
        setResumeData(JSON.parse(savedResume));
        // Supprime le CV du localStorage après l'avoir chargé
        localStorage.removeItem('currentResume');
      } catch (error) {
        console.error('Erreur lors du chargement du CV:', error);
      }
    }
  }, []);

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
  const updateSkills = ({ skills, generalskills, languages, }: any) => {
    setResumeData((prev) => ({ ...prev, skills, generalskills, languages, }));
    toast({
      title: "Compétences et langues enregistrées",
      description: `${skills.length} compétence(s) technique(s), ${generalskills.length} compétence(s) générale(s) et ${languages.length} langue(s) enregistrée(s).`,
    });
  };

  // Fonction pour mettre à jour les centres d'intérêt
  const updateInterests = (interests: any) => {
    setResumeData((prev) => ({ ...prev, interests }));
    toast({
      title: "Centres d'intérêt enregistrés",
      description: `${interests.length} centre(s) d'intérêt enregistré(s).`,
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
  const handleExport = async (format: 'pdf') => {
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
  const saveResume = async () => {
    try {
      setIsPending(true);
      const title = `CV ${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}`.trim();
      await resumeService.createResume({
        title: title || "Mon CV",
        content: resumeData
      });
      
      toast({
        title: "CV sauvegardé",
        description: "Votre CV a été sauvegardé avec succès",
      });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde du CV",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
    
      <main className="container mx-auto py-8 px-4">
        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <div className="flex justify-between items-center mb-6">
            <TabsList className="grid grid-cols-2 md:w-[400px] bg-blue-100 transition-colors">
              <TabsTrigger value="edit">Éditer</TabsTrigger>
              <TabsTrigger value="preview">Aperçu</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Button 
                variant="outline"
                className="flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-colors"
                onClick={saveResume}
              >
                <Save className="h-4 w-4" />
                <span className="hidden md:inline">Sauvegarder</span>
              </Button>

              <Button 
                variant="outline"
                className="flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-colors"
                onClick={() => handleExport('pdf')}
                disabled={isPending}
              >
                <Download className="h-4 w-4" />
                <span className="hidden md:inline">Pdf</span>
              </Button>

              <Button 
                variant="default"
                className="bg-blue-600 hover:bg-blue-500 flex items-center gap-2"
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
                  initialGeneralSkills={resumeData.generalskills}
                  onSave={updateSkills} 
                />

                <CentreInteretForm
                  title="Centres d'intérêt"
                  initialInterests={resumeData.interests}
                  onSave={updateInterests}
                />
              </div>
              
              <div className="space-y-6">
                <TemplateSelector 
                  selectedTemplate={resumeData.template} 
                  onSelectTemplate={updateTemplate} 
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-4">
            <div className="mb-6">
              <Button 
                onClick={() => setCurrentTab('edit')} 
                variant="outline"
                className="mb-4 hover:bg-blue-100 transition-colors"
              >
                Retour à l'éditeur
              </Button>
            </div>
            
            <div ref={resumeRef}>
              <ResumePreview data={resumeData} />
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer id="contact" className="bg-gray-800 text-white py-5 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center text-center">
            <p className="text-gray-400">
              Une question ? Un avis ? Contactez-nous ! <br />
              <div className="flex items-center justify-center">
                <a href="magilog.dev@gmail.com" className="text-blue-600 hover:underline">
                  MAGILOG.dev
                </a>
                <img src={logo} alt="Logo MAGILOG" className=" h-12 " />
              </div>
            </p>
            <p className="text-gray-400">
              <q>Du concept au code, avec méthode</q>
            </p>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} MAGILOG - Tous droits réservés V.1.0.0
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResumeBuilder;

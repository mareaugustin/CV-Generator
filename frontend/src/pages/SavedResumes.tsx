import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { resumeService } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Edit } from "lucide-react";
import Header from "@/components/Header";
import logo from "@/assets/logo/magilog.svg"

interface SavedResume {
  _id: string;
  title: string;
  content: any;
  createdAt: string;
}

const SavedResumes = () => {
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadResumes();
  }, [isAuthenticated]);

  const loadResumes = async () => {
    try {
      const response = await resumeService.getAllResumes();
      console.log('Résumés chargés:', response.data);
      // Ne pas ajouter de champ id supplémentaire
      setResumes(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des CV:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleDeleteConfirmation = (id: number) => {
  //   setResumeToDelete(id);
  //   setShowDeleteModal(true);
  // };

  const handleDelete = async () => {
    // if (!resumeToDelete) return;
    console.log('Début de handleDelete avec ID:', resumeToDelete);
    if (!resumeToDelete) {
      console.log('Pas d\'ID à supprimer');
      return;
    }
    
    try {
      console.log('Envoi de la requête de suppression');
      await resumeService.deleteResume(resumeToDelete);
      console.log('Suppression réussie, rechargement des CV');
      // setResumes(resumes.filter(resume => resume.id !== resumeToDelete));
      await loadResumes();
      toast({
        title: "Suppression réussie",
        description: "Le CV a été supprimé avec succès",
      });
    } catch (error) {
      console.error('Erreur détaillée:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression",
        variant: "destructive"
      });
    } finally {
      setShowDeleteModal(false);
      setResumeToDelete(null);
    }
  };

  const handleDeleteConfirmation = (id: string) => {
    console.log('ID reçu pour suppression:', id);
    if (!id || typeof id !== 'string') {  // Vérification du type string
      console.error('ID invalide reçu:', id);
      return;
    }
    setResumeToDelete(id);
    setShowDeleteModal(true);
  };

  const handleEdit = (resume: SavedResume) => {
    localStorage.setItem('currentResume', JSON.stringify(resume.content));
    navigate(`/creer-cv?edit=${resume._id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Mes CV sauvegardés</h1>

        {isLoading ? (
          <div>Chargement...</div>
        ) : resumes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Vous n'avez pas encore de CV sauvegardé</p>
            <Button onClick={() => navigate('/creer-cv')} className="bg-blue-600 hover:bg-blue-500 transition-colors">Créer un CV</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <Card key={resume._id}>
                <CardHeader key={`header-${resume._id}`}>
                  <CardTitle key={`title-${resume._id}`}>{resume.title}</CardTitle>
                  <CardDescription key={`desc-${resume._id}`}>
                    Créé le {new Date(resume.createdAt).toLocaleDateString(
                      'fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      }
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent key={`content-${resume._id}`}>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(resume)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        console.log('Resume object:', resume);
                        if (resume && resume._id) {
                          handleDeleteConfirmation(resume._id);
                        } else {
                          console.error('ID du CV manquant:', resume);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Dialog open={showDeleteModal} onOpenChange={(open) => {
        setShowDeleteModal(open);
      }}>
        <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer définitivement ce CV ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Annuler
            </Button>
            <Button 
              variant="destructive" 
              onClick={
                
                handleDelete
              }
            >
              Confirmer la suppression
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-5 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center text-center">
            <div className="text-gray-400">
              Une question ? Un avis ? Contactez-nous ! <br />
              <div className="flex items-center justify-center">
                <a href="magilog.dev@gmail.com" className="text-blue-600 hover:underline">
                  MAGILOG.dev
                </a>
                <img src={logo} alt="Logo MAGILOG" className=" h-12 " />
              </div>
            </div>
            <p className="text-gray-400">
              <q>Du concept au code, avec méthode</q>
            </p>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <div className="text-gray-400">
              &copy; {new Date().getFullYear()} MAGILOG - Tous droits réservés V.0.0.1
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SavedResumes;

import { Button } from "@/components/ui/button";
import { ArrowRight, FileEdit, Edit3, Download, LayoutTemplate, Check } from "lucide-react";
import Header from "@/components/Header";
import ResumeBuilder from "@/components/ResumeBuilder";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-white via-resume-light to-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Créez un CV professionnel <span className="text-resume-primary">en quelques minutes</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10">
            Générez facilement des CV impressionnants avec notre outil intuitif.
            Choisissez parmi plusieurs modèles, personnalisez votre contenu, et téléchargez au format PDF.
          </p>
          <Button 
            size="lg" 
            className="text-lg bg-resume-primary hover:bg-resume-secondary px-8 py-6"
            onClick={() => document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Créer mon CV <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche ?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm transition-all hover:shadow-md">
              <div className="rounded-full bg-resume-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Edit3 className="text-resume-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Renseignez vos informations</h3>
              <p className="text-gray-600">
                Complétez facilement vos informations personnelles, expériences professionnelles, études et compétences.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm transition-all hover:shadow-md">
              <div className="rounded-full bg-resume-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <LayoutTemplate className="text-resume-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Choisissez un modèle</h3>
              <p className="text-gray-600">
                Sélectionnez parmi nos modèles professionnels et personnalisez les couleurs et la mise en page.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm transition-all hover:shadow-md">
              <div className="rounded-full bg-resume-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Download className="text-resume-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Exportez votre CV</h3>
              <p className="text-gray-600">
                Téléchargez votre CV au format PDF, prêt à être envoyé aux recruteurs ou partagé en ligne.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Avantages Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Nos avantages</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Check className="h-6 w-6 text-resume-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Design professionnel</h3>
                <p className="text-gray-600">
                  Nos modèles sont conçus par des designers pour maximiser vos chances d'obtenir un entretien.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Check className="h-6 w-6 text-resume-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Simple et rapide</h3>
                <p className="text-gray-600">
                  Interface intuitive qui vous guide pas à pas pour créer votre CV en quelques minutes.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Check className="h-6 w-6 text-resume-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Personnalisation facile</h3>
                <p className="text-gray-600">
                  Modifiez les couleurs, polices et la disposition selon vos préférences.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Check className="h-6 w-6 text-resume-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Exportation PDF de qualité</h3>
                <p className="text-gray-600">
                  Obtenez un document PDF professionnel prêt à l'emploi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Templates Section */}
      <section id="templates" className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">Nos modèles de CV</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Choisissez parmi une variété de modèles professionnels pour mettre en valeur votre parcours et vos compétences.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-80 bg-[#9b87f520] relative">
                <div className="h-10 w-full bg-resume-primary absolute top-0 left-0" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Moderne</h3>
                <p className="text-sm text-gray-600">Design contemporain avec accents colorés</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-80 bg-[#3B82F620] relative">
                <div className="h-10 w-full bg-[#3B82F6] absolute top-0 left-0" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Classique</h3>
                <p className="text-sm text-gray-600">Mise en page traditionnelle et élégante</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-80 bg-[#10B98120] relative">
                <div className="h-10 w-full bg-[#10B981] absolute top-0 left-0" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Minimaliste</h3>
                <p className="text-sm text-gray-600">Design épuré qui va à l'essentiel</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-80 bg-[#6366F120] relative">
                <div className="h-10 w-full bg-[#6366F1] absolute top-0 left-0" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Professionnel</h3>
                <p className="text-sm text-gray-600">Format d'entreprise structuré</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA before builder */}
      <section className="py-12 bg-resume-primary text-white px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">Prêt à créer votre CV ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Utilisez notre éditeur ci-dessous pour créer un CV professionnel en quelques minutes.
          </p>
        </div>
      </section>
      
      {/* Resume Builder Section */}
      <section id="builder" className="py-16 px-0">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Créez votre CV</h2>
          <ResumeBuilder />
        </div>
      </section>
      
      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">ResumeZen</h3>
              <p className="text-gray-400">
                Créez facilement des CV professionnels personnalisés pour maximiser vos chances de décrocher l'emploi de vos rêves.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Liens utiles</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Accueil</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Fonctionnalités</a></li>
                <li><a href="#templates" className="text-gray-400 hover:text-white transition-colors">Modèles</a></li>
                <li><a href="#builder" className="text-gray-400 hover:text-white transition-colors">Créer un CV</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <p className="text-gray-400 mb-2">
                Une question ? Contactez-nous !
              </p>
              <a href="mailto:contact@resumezen.com" className="text-resume-primary hover:underline">
                contact@resumezen.com
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} ResumeZen. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

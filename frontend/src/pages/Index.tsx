
import { Button } from "@/components/ui/button";
import { ArrowRight, Edit3, Download, LayoutTemplate, CircleCheck } from "lucide-react";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo/magilog.svg"
import { Eye } from "lucide-react";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <section className="py-16 md:py-18 px-4 bg-gradient-to-br from-white via-blue-200 to-white">
        <div className="container mx-auto text-center max-w-5xl">
          <div className="marquee-container md:p-15 mb-6 rounded">
            <div className="marquee">
              <h1 className="text-2xl md:text-5xl font-bold" id="typingEffect" >
                Crée ton CV en <span className="text-blue-600">quelques clics</span> &#128640;
              </h1>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10">
            Générez facilement des CV impressionnants grâce un système léger, fluide et rapide.
            Choisissez parmi plusieurs modèles (Moderne, Classique, Minimaliste, et Professionnel), personnalisez 
            votre contenu, et téléchargez au format PDF.
          </p>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Comment ça fonctionne ?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm transition-all hover:shadow-md">
              <div className="rounded-full bg-resume-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Edit3 className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Renseignez vos informations</h3>
              <p className="text-gray-600">
                Complétez facilement vos informations personnelles, expériences professionnelles,
                formations, compétences, et centre d'intérêt.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm transition-all hover:shadow-md">
              <div className="rounded-full bg-resume-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <LayoutTemplate className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Choisissez un modèle</h3>
              <p className="text-gray-600">
                Sélectionnez parmi nos modèles présents, à savoir le modèle moderne, classique,
                minimaliste et professionnel.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm transition-all hover:shadow-md">
              <div className="rounded-full bg-resume-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Download className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Exportez votre CV</h3>
              <p className="text-gray-600">
                Téléchargez votre CV au format PDF, prêt à être envoyé aux recruteurs ou partagé en ligne.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi nous choisir ?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <CircleCheck className="h-7 w-7 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Design professionnel</h3>
                <p className="text-gray-600">
                  Nos modèles sont conçus de façon simple, léger et très attractif afin de 
                  maximiser vos chances d'obtenir un entretien.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <CircleCheck className="h-7 w-7 text-green-600" />
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
                <CircleCheck className="h-7 w-7 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Personnalisation facile</h3>
                <p className="text-gray-600">
                  Choisissez et modifier vos modèles comme vous voulez.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <CircleCheck className="h-7 w-7 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Exportation PDF de qualité</h3>
                <p className="text-gray-600">
                  Obtenez un document PDF professionnel prêt à imprimer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Templates Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">Nos modèles de CV</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Choisissez parmi une variété de modèles professionnels pour mettre en valeur votre parcours et vos compétences.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-7 bg-[#9b87f520] w-full bg-resume-primary "> <span className="mx-3 font-semibold">Moderne</span></div>
                <p className="p-3 text-sm text-gray-600">Design contemporain avec accents colorés</p>
                <Button className="w-full bg-white hover:bg-resume-primary text-dark" onClick={() => window.open('/modern-template.png', '_blank')}>
                  <Eye></Eye>
                </Button>
            </div>
          
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-7 w-full bg-[#3B82F6] " > <span className="mx-3 font-semibold">Classique</span></div>
                <p className="p-3 text-sm text-gray-600">Mise en page traditionnelle et élégante</p>
                <Button className="w-full bg-white hover:bg-[#3B82F6] text-dark" onClick={() => window.open('/classic-template.png', '_blank')}>
                  <Eye></Eye>
                </Button>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-7 w-full bg-[#10B981]" > <span className="mx-3 font-semibold">Minimaliste</span></div>
                <p className="p-3 text-sm text-gray-600">Design épuré qui va à l'essentiel et simple</p>
                <Button className="w-full bg-white hover:bg-[#10B981] text-dark" onClick={() => window.open('/minimalist-template.png', '_blank')}>
                  <Eye></Eye>
                </Button>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-7 w-full bg-[#6366F1] "  > <span className="mx-3 font-semibold">Professionnel</span></div>
                <p className="p-3 text-sm text-gray-600">Format d'entreprise structuré et élégant</p>
                <Button className="w-full bg-white hover:bg-[#6366F1] text-dark" onClick={() => window.open('/professional-template.png', '_blank')}>
                  <Eye></Eye>
                </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-white via-blue-200 to-white text-dark px-4 mb-12">
        <div className="container mx-auto text-center max-w-5xl">
          <h2 className="text-3xl font-bold mb-4">Prêt à créer votre CV ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Cliquez ci-dessous et rentrez vos informations pour créer un CV professionnel en quelques minutes.
          </p>

          {isAuthenticated ? (
            <>
              <Button size="lg" className="text-lg bg-blue-800 hover:bg-blue-600 px-8 py-6" >
                <a href='/creer-cv' > Créer mon CV</a>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <div className="h-10
                text-lg bg-blue-800 
                text-white
                hover:bg-blue-600 px-8 py-6
                inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors"
              >
                <a href="/register"> Créer mon CV</a>
                <ArrowRight className="ml-2 h-5 w-5" />
              </div>
            </>
          )}
        </div>
      </section>

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

export default Index;

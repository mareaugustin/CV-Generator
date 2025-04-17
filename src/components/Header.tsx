
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FileText, Menu, X } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-resume-primary" />
          <span className="text-xl font-semibold">ResumeZen</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-gray-700 hover:text-resume-primary transition-colors">
            Accueil
          </a>
          <a href="#templates" className="text-gray-700 hover:text-resume-primary transition-colors">
            Modèles
          </a>
          <a href="#features" className="text-gray-700 hover:text-resume-primary transition-colors">
            Fonctionnalités
          </a>
          <a href="#contact" className="text-gray-700 hover:text-resume-primary transition-colors">
            Contact
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline">Se connecter</Button>
          <Button className="bg-resume-primary hover:bg-resume-secondary">S'inscrire</Button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-white border-t">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#" 
              className="text-gray-700 hover:text-resume-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </a>
            <a 
              href="#templates" 
              className="text-gray-700 hover:text-resume-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Modèles
            </a>
            <a 
              href="#features" 
              className="text-gray-700 hover:text-resume-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Fonctionnalités
            </a>
            <a 
              href="#contact" 
              className="text-gray-700 hover:text-resume-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="outline" className="w-full">Se connecter</Button>
              <Button className="w-full bg-resume-primary hover:bg-resume-secondary">S'inscrire</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

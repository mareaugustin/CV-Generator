
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FileText, LogOut, Menu, X } from "lucide-react";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b bg-blue-600 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-white" />
          <span className="text-xl font-semibold">Générateur de <span className="text-white">CV</span></span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link to="/" className="hover:text-white transition-colors font-semibold text-gray-100 text-size-20">
                  Accueil
              </Link>
              <Link to="/mes-cv" className="hover:text-white transition-colors font-semibold text-gray-100 text-size-20">
                  Voir mes CV
              </Link>
              <Button onClick={logout} className="bg-red-600 hover:bg-red-500 h-8 w-100 flex items-center gap-2">
                <LogOut className="h-5 w-5" />Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button className="bg-blue-600 hover:bg-blue-500">Connexion</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-blue-500 hover:bg-blue-400">S'inscrire</Button>
              </Link>
            </>
          )}
        </nav>

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
      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-white border-t">
          <nav className="flex flex-col space-y-4">
            {isAuthenticated ? (
              <>
                <Link to="/" className="text-gray-700 hover:text-blue-700 text-center transition-colors py-1">
                    Accueil
                </Link>
                <Link to="/mes-cv" className="text-gray-700 hover:text-blue-700 text-center transition-colors py-1">
                    Voir mes CV
                </Link>
                <Button onClick={logout} className="bg-red-600 hover:bg-red-500 w-full flex items-center gap-2">
                  <LogOut className="h-5 w-5" />Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="w-full hover:bg-blue-300">Connexion</Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full bg-blue-600 hover:bg-blue-500">S'inscrire</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

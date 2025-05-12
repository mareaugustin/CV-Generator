import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { User, Eye, EyeOff, AlertCircle } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      username: "",
      email: "",
      password: "",
      password2: "",
    };

    // Validation du nom d'utilisateur
    const usernameRegex = /^[a-zA-Z]{3}(?!.*__)[a-zA-Z0-9_]*[a-zA-Z0-9]$/;
    if (!formData.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis";
      isValid = false;
    } else if (!usernameRegex.test(formData.username)) {
      newErrors.username = "3 caractères minimum (lettres seulement pour les 3 premiers), peut contenir des chiffres et underscores";
      isValid = false;
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Format d'email invalide (ex: exemple@domaine.com)";
      isValid = false;
    }

    // Validation du mot de passe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,;:\-_^])[A-Za-z\d@$!%*?&,;:\-_^]{8,}$/
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
      isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "8 caractères min, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial (@$!%*?&,;:-_^)";
      isValid = false;
    }

    // Validation de la confirmation du mot de passe
    if (!formData.password2) {
      newErrors.password2 = "La confirmation du mot de passe est requise";
      isValid = false;
    } else if (formData.password !== formData.password2) {
      newErrors.password2 = "Les mots de passe ne correspondent pas";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await register(
        formData.username,
        formData.email,
        formData.password,
        formData.password2
      );
      toast({
        title: "Inscription réussie",
        description: "Vous pouvez maintenant vous connecter",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: "Veuillez vérifier vos informations",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-400 to-white">
      <Card className="w-full max-w-md bg-gradient-to-br from-white via-blue-300 to-white shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <User className="h-6 w-6" />Inscription
          </CardTitle>
          <CardDescription className="text-gray-600">
            Créez un compte pour créer un cv
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Input
                type="text"
                placeholder="Nom d'utilisateur"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className={errors.username ? "border-red-500 focus-visible:ring-red-300" : ""}
                required
              />
              {errors.username && (
                <div className="flex items-start gap-1 text-red-600 text-xs mt-1">
                  <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                  <span>{errors.username}</span>
                </div>
              )}
            </div>
            <div className="space-y-1">
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={errors.email ? "border-red-500 focus-visible:ring-red-300" : ""}
                required
              />
              {errors.email && (
                <div className="flex items-start gap-1 text-red-600 text-xs mt-1">
                  <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>
            <div className="space-y-1">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={errors.password ? "border-red-500 focus-visible:ring-red-300" : ""}
                  required
                />
                {/* {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )} */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/4 transform-translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {errors.password && (
                  <div className="flex items-start gap-1 text-red-600 text-xs mt-1">
                    <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                    <span>{errors.password}</span>
                  </div>
              )}
            </div>
            <div className="space-y-1">
              <div className="relative">
                <Input
                  type={showPassword2 ? "text" : "password"}
                  placeholder="Confirmer le mot de passe"
                  value={formData.password2}
                  onChange={(e) => handleInputChange("password2", e.target.value)}
                  className={errors.password2 ? "border-red-500 focus-visible:ring-red-300" : ""}
                  required
                />
                {/* {errors.password2 && (
                  <p className="text-red-500 text-sm">{errors.password2}</p>
                )} */}
                <button
                  type="button"
                  onClick={() => setShowPassword2(!showPassword2)}
                  className="absolute right-3 top-1/4 transform-translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword2 ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword2 ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {errors.password2 && (
                <div className="flex items-start gap-1 text-red-600 text-xs mt-1">
                  <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                  <span>{errors.password2}</span>
                </div>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Inscription en cours..." : "S'inscrire"}
            </Button>
            <p className="text-center text-sm text-gray-600">
              Déjà un compte ?{" "}
              <a href="/login" className="text-blue-600 font-medium hover:underline hover:text-blue-700">
                Se connecter
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { User, Eye, EyeOff } from "lucide-react";

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
    if (!formData.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis";
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = "Le nom d'utilisateur doit contenir au moins 3 caractères";
      isValid = false;
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "L'email est requis";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
      isValid = false;
    }

    // Validation du mot de passe
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
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
      <Card className="w-[350px] bg-gradient-to-br from-white via-blue-300 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-6 w-6" />Inscription
          </CardTitle>
          <CardDescription>
            Créez un compte pour sauvegarder vos CV
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Nom d'utilisateur"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className={errors.username ? "border-red-500" : ""}
                required
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2 relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={errors.password ? "border-red-500" : ""}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            <div className="space-y-2 relative">
              <Input
                type={showPassword2 ? "text" : "password"}
                placeholder="Confirmer le mot de passe"
                value={formData.password2}
                onChange={(e) => handleInputChange("password2", e.target.value)}
                className={errors.password2 ? "border-red-500" : ""}
                required
              />
              {errors.password2 && (
                <p className="text-red-500 text-sm">{errors.password2}</p>
              )}
              <button
                type="button"
                onClick={() => setShowPassword2(!showPassword2)}
                className="absolute right-3 top-1/3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword2 ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500"
              disabled={isLoading}
            >
              {isLoading ? "Inscription..." : "S'inscrire"}
            </Button>
            <p className="text-center text-sm">
              Déjà un compte ? 
              <a href="/login" className="text-blue-600 font-semibold hover:underline">
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
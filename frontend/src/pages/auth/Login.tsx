import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { LogIn, Eye, EyeOff, AlertCircle } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      username: "",
      password: "",
    };

    if (!formData.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ username: "", password: "" });
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await login(
        formData.username,
        formData.password,
      );
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant vous connecter",
      });
      navigate("/");
    } catch (error: any) {
      // Gestion des erreurs API
      if (error.response?.data?.errors) {
        setErrors({
          username: error.response.data.errors.username?.[0] || "",
          password: error.response.data.errors.password?.[0] || "",
        });
      } else {
        setErrors({
          username: "Identifiants incorrects",
          password: "Identifiants incorrects",
        });
        toast({
          title: "Erreur de connexion",
          description: error.response?.data?.message || "Nom d'utilisateur ou mot de passe incorrect",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-400 to-white">
      <Card className="w-full max-w-md bg-gradient-to-br from-white via-blue-300 to-white shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <LogIn className="h-6 w-6" />Connexion
          </CardTitle>
          <CardDescription className="text-gray-600">
            Connectez-vous pour gérer vos CV
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={errors.password ? "border-red-500 focus-visible:ring-red-300" : ""}
                  required
                />
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
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </Button>
            <p className="text-center text-sm">
              Pas encore de compte ?{" "}
              <a href="/register" className="text-blue-600 font-semibold hover:underline">
                S'inscrire
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
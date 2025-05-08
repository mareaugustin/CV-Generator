
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PersonalInfo } from "@/types";
import { FormEvent, useState } from "react";
import { FormSectionProps } from "@/types";
import { User, Mail, Phone, MapPin, Globe, FileText } from "lucide-react";

interface PersonalInfoFormProps extends FormSectionProps {
  initialData?: PersonalInfo;
  onSave: (data: PersonalInfo) => void;
}

const PersonalInfoForm = ({ title, initialData, onSave }: PersonalInfoFormProps) => {
  const [formData, setFormData] = useState<PersonalInfo>(
    initialData || {
      firstName: "",
      lastName: "",
      title: "",
      email: "",
      phone: "",
      address: "",
      website: "",
      summary: "",
      photoUrl: "",
    }
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(formData.photoUrl || "");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Vérifier le type de fichier
      if (!file.type.match(/^image\/(png|jpeg|jpg)$/)) {
        alert("Seuls les formats PNG, JPEG et JPG sont acceptés");
        return;
      }

      // Vérifier la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("La taille du fichier ne doit pas dépasser 5MB");
        return;
      }

      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      setFormData(prev => ({ ...prev, photoUrl: fileUrl }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      const formDataToSend = new FormData();
      formDataToSend.append('photo', selectedFile);
      
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formDataToSend
        });
        const data = await response.json();
        const uploadedUrl = data.url;
        setFormData(prev => ({ ...prev, photoUrl: uploadedUrl }));
      } catch (error) {
        console.error('Erreur lors du téléchargement:', error);
      }
    }
    onSave(formData);
  };

  return (
    <div className="resume-section">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <User className="h-5 w-5" />
        {title}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Votre prénom"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Votre nom"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Titre professionnel</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex: Développeur Web Frontend"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="exemple@votremail.com"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Votre numéro de téléphone avec indicatif"
                className="pl-10"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Adresse</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Ex: Ouagadougou, Burkina Faso"
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Site Web (facultatif)</Label>
          <div className="relative">
            <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Lien de votre réseau social, portfolio..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">A propos de vous</Label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Parlez brièvement de votre parcours et de vos compétences principales..."
              className="pl-10 min-h-[120px]"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="photo">Téléversez une photo de vous</Label>
          <Input
            id="photo"
            name="photo"
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
          {previewUrl && (
            <div className="mt-2">
              <img
                src={previewUrl}
                alt="Aperçu"
                className="h-24 w-24 object-cover rounded-full border"
              />
            </div>
          )}
        </div>

        <Button type="submit" className="bg-green-600 hover:bg-green-500">
          Enregistrer
        </Button>
      </form>
    </div>
  );
};

export default PersonalInfoForm;

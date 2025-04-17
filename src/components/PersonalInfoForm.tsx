
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
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
              placeholder="Jean"
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
              placeholder="Dupont"
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
            placeholder="Développeur Web Frontend"
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
                placeholder="exemple@email.com"
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
                placeholder="+33 6 12 34 56 78"
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
              placeholder="Paris, France"
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Site Web (optionnel)</Label>
          <div className="relative">
            <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://monsite.com"
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Résumé professionnel</Label>
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
          <Label htmlFor="photoUrl">URL de la photo (optionnel)</Label>
          <Input
            id="photoUrl"
            name="photoUrl"
            value={formData.photoUrl}
            onChange={handleChange}
            placeholder="https://example.com/photo.jpg"
          />
          {formData.photoUrl && (
            <div className="mt-2">
              <img
                src={formData.photoUrl}
                alt="Aperçu"
                className="h-24 w-24 object-cover rounded-full border"
              />
            </div>
          )}
        </div>

        <Button type="submit" className="bg-resume-primary hover:bg-resume-secondary">
          Enregistrer
        </Button>
      </form>
    </div>
  );
};

export default PersonalInfoForm;

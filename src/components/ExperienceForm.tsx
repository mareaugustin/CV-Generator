
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Experience, FormSectionProps } from "@/types";
import { FormEvent, useState } from "react";
import { Briefcase, Plus, Trash2, GripVertical } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface ExperienceFormProps extends FormSectionProps {
  initialData?: Experience[];
  onSave: (data: Experience[]) => void;
}

const ExperienceForm = ({ title, initialData, onSave }: ExperienceFormProps) => {
  const [experiences, setExperiences] = useState<Experience[]>(
    initialData || []
  );

  const addExperience = () => {
    const newExperience: Experience = {
      id: uuidv4(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    setExperiences([...experiences, newExperience]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(experiences);
  };

  return (
    <div className="resume-section">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Briefcase className="h-5 w-5" />
        {title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {experiences.map((experience, index) => (
          <div
            key={experience.id}
            className="border rounded-md p-4 bg-gray-50 space-y-4 relative"
          >
            <div className="absolute right-4 top-4 flex gap-2">
              <button
                type="button"
                onClick={() => removeExperience(experience.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <div className="drag-handle">
                <GripVertical className="h-5 w-5" />
              </div>
            </div>

            <h3 className="text-lg font-medium">Expérience #{index + 1}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`company-${experience.id}`}>Entreprise</Label>
                <Input
                  id={`company-${experience.id}`}
                  value={experience.company}
                  onChange={(e) =>
                    updateExperience(experience.id, "company", e.target.value)
                  }
                  placeholder="Nom de l'entreprise"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`position-${experience.id}`}>Poste</Label>
                <Input
                  id={`position-${experience.id}`}
                  value={experience.position}
                  onChange={(e) =>
                    updateExperience(experience.id, "position", e.target.value)
                  }
                  placeholder="Titre du poste"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`location-${experience.id}`}>Lieu</Label>
              <Input
                id={`location-${experience.id}`}
                value={experience.location}
                onChange={(e) =>
                  updateExperience(experience.id, "location", e.target.value)
                }
                placeholder="Paris, France"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`startDate-${experience.id}`}>Date de début</Label>
                <Input
                  id={`startDate-${experience.id}`}
                  type="month"
                  value={experience.startDate}
                  onChange={(e) =>
                    updateExperience(experience.id, "startDate", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor={`endDate-${experience.id}`}
                  className={experience.current ? "text-gray-400" : ""}
                >
                  Date de fin
                </Label>
                <Input
                  id={`endDate-${experience.id}`}
                  type="month"
                  value={experience.endDate}
                  onChange={(e) =>
                    updateExperience(experience.id, "endDate", e.target.value)
                  }
                  disabled={experience.current}
                  required={!experience.current}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id={`current-${experience.id}`}
                checked={experience.current}
                onCheckedChange={(checked) =>
                  updateExperience(experience.id, "current", checked)
                }
              />
              <Label htmlFor={`current-${experience.id}`}>Poste actuel</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`description-${experience.id}`}>Description</Label>
              <Textarea
                id={`description-${experience.id}`}
                value={experience.description}
                onChange={(e) =>
                  updateExperience(experience.id, "description", e.target.value)
                }
                placeholder="Décrivez vos responsabilités et réalisations..."
                className="min-h-[100px]"
              />
            </div>
          </div>
        ))}

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={addExperience}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" /> Ajouter une expérience
          </Button>
          <Button type="submit" className="bg-resume-primary hover:bg-resume-secondary">
            Enregistrer
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ExperienceForm;

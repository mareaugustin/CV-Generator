
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Education, FormSectionProps } from "@/types";
import { FormEvent, useState } from "react";
import { GraduationCap, Plus, Trash2, GripVertical } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface EducationFormProps extends FormSectionProps {
  initialData?: Education[];
  onSave: (data: Education[]) => void;
}

const EducationForm = ({ title, initialData, onSave }: EducationFormProps) => {
  const [educations, setEducations] = useState<Education[]>(
    initialData || []
  );

  const addEducation = () => {
    const newEducation: Education = {
      id: uuidv4(),
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    setEducations([...educations, newEducation]);
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    setEducations(
      educations.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const removeEducation = (id: string) => {
    setEducations(educations.filter((edu) => edu.id !== id));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(educations);
  };

  return (
    <div className="resume-section">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <GraduationCap className="h-5 w-5" />
        {title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {educations.map((education, index) => (
          <div
            key={education.id}
            className="border rounded-md p-4 bg-gray-50 space-y-4 relative"
          >
            <div className="absolute right-4 top-4 flex gap-2">
              <button
                type="button"
                onClick={() => removeEducation(education.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <div className="drag-handle">
                <GripVertical className="h-5 w-5" />
              </div>
            </div>

            <h3 className="text-lg font-medium">Formation #{index + 1}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`institution-${education.id}`}>
                  Établissement
                </Label>
                <Input
                  id={`institution-${education.id}`}
                  value={education.institution}
                  onChange={(e) =>
                    updateEducation(education.id, "institution", e.target.value)
                  }
                  placeholder="Nom de l'établissement"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`degree-${education.id}`}>
                  Diplôme
                </Label>
                <Input
                  id={`degree-${education.id}`}
                  value={education.degree}
                  onChange={(e) =>
                    updateEducation(education.id, "degree", e.target.value)
                  }
                  placeholder="Master, Licence, BTS, etc."
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`field-${education.id}`}>
                  Domaine d'études
                </Label>
                <Input
                  id={`field-${education.id}`}
                  value={education.field}
                  onChange={(e) =>
                    updateEducation(education.id, "field", e.target.value)
                  }
                  placeholder="Informatique, Marketing, etc."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`location-${education.id}`}>Lieu</Label>
                <Input
                  id={`location-${education.id}`}
                  value={education.location}
                  onChange={(e) =>
                    updateEducation(education.id, "location", e.target.value)
                  }
                  placeholder="Paris, France"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`startDate-${education.id}`}>Date de début</Label>
                <Input
                  id={`startDate-${education.id}`}
                  type="month"
                  value={education.startDate}
                  onChange={(e) =>
                    updateEducation(education.id, "startDate", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor={`endDate-${education.id}`}
                  className={education.current ? "text-gray-400" : ""}
                >
                  Date de fin
                </Label>
                <Input
                  id={`endDate-${education.id}`}
                  type="month"
                  value={education.endDate}
                  onChange={(e) =>
                    updateEducation(education.id, "endDate", e.target.value)
                  }
                  disabled={education.current}
                  required={!education.current}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id={`current-${education.id}`}
                checked={education.current}
                onCheckedChange={(checked) =>
                  updateEducation(education.id, "current", checked)
                }
              />
              <Label htmlFor={`current-${education.id}`}>
                Formation en cours
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`description-${education.id}`}>Description</Label>
              <Textarea
                id={`description-${education.id}`}
                value={education.description}
                onChange={(e) =>
                  updateEducation(education.id, "description", e.target.value)
                }
                placeholder="Décrivez les points clés de votre formation..."
                className="min-h-[100px]"
              />
            </div>
          </div>
        ))}

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={addEducation}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" /> Ajouter une formation
          </Button>
          <Button type="submit" className="bg-resume-primary hover:bg-resume-secondary">
            Enregistrer
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EducationForm;


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { FormSectionProps, Skill, Language } from "@/types";
import { FormEvent, useState } from "react";
import { ChipIcon, Plus, Trash2, GripVertical, Languages } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ChipIcon {
  className: string;
}

interface SkillsFormProps extends FormSectionProps {
  initialSkills?: Skill[];
  initialLanguages?: Language[];
  onSave: (data: { skills: Skill[]; languages: Language[] }) => void;
}

const SkillsForm = ({ title, initialSkills, initialLanguages, onSave }: SkillsFormProps) => {
  const [skills, setSkills] = useState<Skill[]>(initialSkills || []);
  const [languages, setLanguages] = useState<Language[]>(
    initialLanguages || []
  );

  // Compétences
  const addSkill = () => {
    const newSkill: Skill = {
      id: uuidv4(),
      name: "",
      level: 3,
    };
    setSkills([...skills, newSkill]);
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    setSkills(
      skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    );
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  // Langues
  const addLanguage = () => {
    const newLanguage: Language = {
      id: uuidv4(),
      name: "",
      level: "intermediate",
    };
    setLanguages([...languages, newLanguage]);
  };

  const updateLanguage = (id: string, field: keyof Language, value: any) => {
    setLanguages(
      languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    );
  };

  const removeLanguage = (id: string) => {
    setLanguages(languages.filter((lang) => lang.id !== id));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({ skills, languages });
  };

  return (
    <div className="resume-section">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <ChipIcon className="h-5 w-5" />
        {title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <ChipIcon className="h-4 w-4" /> Compétences
          </h3>
          <div className="space-y-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="border rounded-md p-4 bg-gray-50 space-y-3 relative"
              >
                <div className="absolute right-4 top-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => removeSkill(skill.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <div className="drag-handle">
                    <GripVertical className="h-5 w-5" />
                  </div>
                </div>

                <div className="space-y-2 pr-16">
                  <Label htmlFor={`skillName-${skill.id}`}>Compétence</Label>
                  <Input
                    id={`skillName-${skill.id}`}
                    value={skill.name}
                    onChange={(e) =>
                      updateSkill(skill.id, "name", e.target.value)
                    }
                    placeholder="Ex: JavaScript, Photoshop, Gestion de projet..."
                    required
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label htmlFor={`skillLevel-${skill.id}`}>Niveau</Label>
                    <span className="text-sm text-gray-500">
                      {skill.level === 1
                        ? "Débutant"
                        : skill.level === 2
                        ? "Intermédiaire"
                        : skill.level === 3
                        ? "Compétent"
                        : skill.level === 4
                        ? "Avancé"
                        : "Expert"}
                    </span>
                  </div>
                  <Slider
                    id={`skillLevel-${skill.id}`}
                    value={[skill.level]}
                    min={1}
                    max={5}
                    step={1}
                    className="py-2"
                    onValueChange={(value) =>
                      updateSkill(skill.id, "level", value[0])
                    }
                  />
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addSkill}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Ajouter une compétence
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Languages className="h-4 w-4" /> Langues
          </h3>
          <div className="space-y-4">
            {languages.map((language) => (
              <div
                key={language.id}
                className="border rounded-md p-4 bg-gray-50 space-y-3 relative"
              >
                <div className="absolute right-4 top-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => removeLanguage(language.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <div className="drag-handle">
                    <GripVertical className="h-5 w-5" />
                  </div>
                </div>

                <div className="space-y-2 pr-16">
                  <Label htmlFor={`languageName-${language.id}`}>Langue</Label>
                  <Input
                    id={`languageName-${language.id}`}
                    value={language.name}
                    onChange={(e) =>
                      updateLanguage(language.id, "name", e.target.value)
                    }
                    placeholder="Ex: Français, Anglais, Espagnol..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`languageLevel-${language.id}`}>Niveau</Label>
                  <Select
                    value={language.level}
                    onValueChange={(value: any) =>
                      updateLanguage(language.id, "level", value)
                    }
                  >
                    <SelectTrigger id={`languageLevel-${language.id}`}>
                      <SelectValue placeholder="Sélectionnez un niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Débutant</SelectItem>
                      <SelectItem value="intermediate">Intermédiaire</SelectItem>
                      <SelectItem value="advanced">Avancé</SelectItem>
                      <SelectItem value="fluent">Courant</SelectItem>
                      <SelectItem value="native">Langue maternelle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addLanguage}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Ajouter une langue
            </Button>
          </div>
        </div>

        <Button type="submit" className="bg-resume-primary hover:bg-resume-secondary">
          Enregistrer
        </Button>
      </form>
    </div>
  );
};

export default SkillsForm;

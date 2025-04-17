
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash, Tag } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Skill, Language, SkillsFormProps } from "@/types";

const languageLevels = [
  { value: "beginner", label: "Débutant" },
  { value: "intermediate", label: "Intermédiaire" },
  { value: "advanced", label: "Avancé" },
  { value: "fluent", label: "Courant" },
  { value: "native", label: "Natif" }
];

const SkillsForm = ({ title, initialSkills, initialLanguages, onSave }: SkillsFormProps) => {
  const [skills, setSkills] = useState<Skill[]>(initialSkills || []);
  const [languages, setLanguages] = useState<Language[]>(initialLanguages || []);
  const [newSkill, setNewSkill] = useState({ name: "", level: 3 });
  const [newLanguage, setNewLanguage] = useState({ name: "", level: "intermediate" as const });

  // Fonction pour ajouter une nouvelle compétence
  const addSkill = () => {
    if (!newSkill.name.trim()) return;
    
    const skill: Skill = {
      id: uuidv4(),
      name: newSkill.name,
      level: newSkill.level
    };
    
    setSkills([...skills, skill]);
    setNewSkill({ name: "", level: 3 });
  };

  // Fonction pour supprimer une compétence
  const removeSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  // Fonction pour ajouter une nouvelle langue
  const addLanguage = () => {
    if (!newLanguage.name.trim()) return;
    
    const language: Language = {
      id: uuidv4(),
      name: newLanguage.name,
      level: newLanguage.level
    };
    
    setLanguages([...languages, language]);
    setNewLanguage({ name: "", level: "intermediate" });
  };

  // Fonction pour supprimer une langue
  const removeLanguage = (id: string) => {
    setLanguages(languages.filter(language => language.id !== id));
  };

  // Fonction pour sauvegarder les compétences et langues
  const handleSave = () => {
    onSave({ skills, languages });
  };

  return (
    <div className="resume-section p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      
      {/* Section Compétences */}
      <div className="mb-8">
        <h3 className="text-xl font-medium mb-4">Compétences</h3>
        
        <div className="space-y-4 mb-4">
          {skills.map(skill => (
            <div key={skill.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md">
              <Tag className="h-5 w-5 text-resume-primary" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-gray-500">{skill.level}/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div 
                    className="bg-resume-primary h-1.5 rounded-full" 
                    style={{ width: `${(skill.level / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => removeSkill(skill.id)}
                className="p-0 h-8 w-8"
              >
                <Trash className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row items-end gap-3">
          <div className="w-full sm:flex-1">
            <Label htmlFor="skill-name">Nom de la compétence</Label>
            <Input
              id="skill-name"
              value={newSkill.name}
              onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
              placeholder="Ex: JavaScript"
            />
          </div>
          <div className="w-full sm:flex-1">
            <Label htmlFor="skill-level">Niveau (1-5)</Label>
            <Slider
              id="skill-level"
              min={1}
              max={5}
              step={1}
              value={[newSkill.level]}
              onValueChange={value => setNewSkill({ ...newSkill, level: value[0] })}
              className="mt-2"
            />
          </div>
          <Button 
            onClick={addSkill} 
            className="mt-2"
            type="button"
          >
            <Plus className="h-4 w-4 mr-1" />
            Ajouter
          </Button>
        </div>
      </div>
      
      {/* Section Langues */}
      <div>
        <h3 className="text-xl font-medium mb-4">Langues</h3>
        
        <div className="space-y-4 mb-4">
          {languages.map(language => (
            <div key={language.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md">
              <Tag className="h-5 w-5 text-resume-secondary" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">{language.name}</span>
                  <span className="text-sm text-gray-500">
                    {languageLevels.find(l => l.value === language.level)?.label}
                  </span>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => removeLanguage(language.id)}
                className="p-0 h-8 w-8"
              >
                <Trash className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row items-end gap-3">
          <div className="w-full sm:flex-1">
            <Label htmlFor="language-name">Langue</Label>
            <Input
              id="language-name"
              value={newLanguage.name}
              onChange={e => setNewLanguage({ ...newLanguage, name: e.target.value })}
              placeholder="Ex: Anglais"
            />
          </div>
          <div className="w-full sm:flex-1">
            <Label htmlFor="language-level">Niveau</Label>
            <Select 
              value={newLanguage.level} 
              onValueChange={value => setNewLanguage({ ...newLanguage, level: value as Language['level'] })}
            >
              <SelectTrigger id="language-level" className="mt-2">
                <SelectValue placeholder="Sélectionner un niveau" />
              </SelectTrigger>
              <SelectContent>
                {languageLevels.map(level => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={addLanguage} 
            className="mt-2"
            type="button"
          >
            <Plus className="h-4 w-4 mr-1" />
            Ajouter
          </Button>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button 
          onClick={handleSave}
          className="bg-resume-primary hover:bg-resume-secondary"
        >
          Enregistrer
        </Button>
      </div>
    </div>
  );
};

export default SkillsForm;

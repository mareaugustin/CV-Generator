import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Activity, Plus, Tag, Trash } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface CentreInteret {
  id: string;
  name: string;
}

interface CentreInteretFormProps {
  title: string;
  initialInterests?: CentreInteret[];
  onSave: (data: CentreInteret[]) => void;
}

const CentreInteretForm = ({ title, initialInterests = [], onSave }: CentreInteretFormProps) => {
  const [interests, setInterests] = useState<CentreInteret[]>(initialInterests);
  const [newInterest, setNewInterest] = useState("");

  const addInterest = () => {
    if (!newInterest.trim()) return;

    const interest: CentreInteret = {
      id: uuidv4(),
      name: newInterest.trim(),
    };

    setInterests([...interests, interest]);
    setNewInterest("");
  };

  const removeInterest = (id: string) => {
    setInterests(interests.filter((interest) => interest.id !== id));
  };

  const handleSave = () => {
    onSave(interests);
  };

  return (
    <div className="resume-section p-6 bg-white rounded-lg shadow mt-8">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <Activity className="h-5 w-5" />
        {title}
      </h2>

      <div className="space-y-4">
        {interests.map((interest) => (
          <div
            key={interest.id}
            className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md"
          >
            <Tag className="h-5 w-5 text-blue-500" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">{interest.name}</span>
                </div>
              </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeInterest(interest.id)}
              className="p-0 h-8 w-8"
            >
              <Trash className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-end gap-3 mt-4">
        <div className="w-full sm:flex-1">
          <Label htmlFor="interest-name">Nom du centre d'intérêt</Label>
          <Input
            id="interest-name"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            placeholder="Ex: Lecture, Sport"
          />
        </div>
        <Button onClick={addInterest} className="mt-2 bg-blue-600 hover:bg-blue-500" type="button">
          <Plus className="h-4 w-4 mr-1" />
          Ajouter
        </Button>
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-500"
        >
          Enregistrer
        </Button>
      </div>
    </div>
  );
};

export default CentreInteretForm;
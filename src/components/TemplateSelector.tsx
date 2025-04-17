
import { useState } from "react";
import { Check } from "lucide-react";
import templates from "@/data/templates";
import { TemplateSelectorProps } from "@/types";
import { cn } from "@/lib/utils";

const TemplateSelector = ({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) => {
  return (
    <div className="resume-section">
      <h2 className="text-xl font-semibold mb-4">Choisir un modèle</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((template) => {
          const isActive = selectedTemplate === template.id;
          
          return (
            <div
              key={template.id}
              className={cn(
                "template-card relative overflow-hidden",
                isActive ? "active" : "hover:border-gray-400"
              )}
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="aspect-[210/297] bg-gray-100 mb-2 flex items-center justify-center">
                {/* Template preview image would go here */}
                <div 
                  className="w-full h-full"
                  style={{backgroundColor: `${template.primaryColor}20`}} 
                >
                  <div 
                    className="h-10 w-full" 
                    style={{backgroundColor: template.primaryColor}} 
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-medium">{template.name}</span>
                {isActive && (
                  <span className="bg-resume-primary text-white p-1 rounded-full">
                    <Check className="h-4 w-4" />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;

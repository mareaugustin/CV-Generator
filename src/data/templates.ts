
import { ResumeTemplate } from "../types";

// Nous définirons les composants de prévisualisation plus tard
const templates: ResumeTemplate[] = [
  {
    id: "modern",
    name: "Modern",
    thumbnail: "modern-template.png", // Ceci sera remplacé par une vraie image
    primaryColor: "#9b87f5",
    fontFamily: "system-ui, sans-serif",
    previewComponent: () => null // À implémenter plus tard
  },
  {
    id: "classic",
    name: "Classic",
    thumbnail: "classic-template.png",
    primaryColor: "#3B82F6",
    fontFamily: "Georgia, serif",
    previewComponent: () => null
  },
  {
    id: "minimalist",
    name: "Minimalist",
    thumbnail: "minimalist-template.png",
    primaryColor: "#10B981",
    fontFamily: "Inter, sans-serif",
    previewComponent: () => null
  },
  {
    id: "professional",
    name: "Professional",
    thumbnail: "professional-template.png",
    primaryColor: "#6366F1",
    fontFamily: "system-ui, sans-serif",
    previewComponent: () => null
  }
];

export default templates;

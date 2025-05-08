import modernThumbnail from "../assets/images/modern-template.png";
import classicThumbnail from "../assets/images/classic-template.png";
import minimalistThumbnail from "../assets/images/minimalist-template.png";
import professionalThumbnail from "../assets/images/professional-template.png";
import { ResumeTemplate } from "../types";

const templates: ResumeTemplate[] = [
  {
    id: "modern",
    name: "Moderne",
    thumbnail: modernThumbnail,
    primaryColor: "#9b87f5",
    fontFamily: "system-ui, sans-serif",
    previewComponent: () => null
  },
  {
    id: "classic",
    name: "Classique",
    thumbnail: classicThumbnail,
    primaryColor: "#3B82F6",
    fontFamily: "Georgia, serif",
    previewComponent: () => null
  },
  {
    id: "minimalist",
    name: "Minimaliste",
    thumbnail: minimalistThumbnail,
    primaryColor: "#10B981",
    fontFamily: "Inter, sans-serif",
    previewComponent: () => null
  },
  {
    id: "professional",
    name: "Professionnel",
    thumbnail: professionalThumbnail,
    primaryColor: "#6366F1",
    fontFamily: "system-ui, sans-serif",
    previewComponent: () => null
  }
];

export default templates;

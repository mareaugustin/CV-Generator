
import { ResumeData } from '@/types';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Fonction pour générer un PDF à partir du CV
export const generatePDF = async (resumeElement: HTMLElement, data: ResumeData): Promise<string> => {
  try {
    const canvas = await html2canvas(resumeElement, {
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    // Dimensions A4 en mm (210 x 297)
    const pdfWidth = 210;
    const pdfHeight = 297;
    
    // Calcul du ratio pour que l'image s'adapte correctement à la page PDF
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;
    
    pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

    // Nom du fichier PDF
    const fileName = `CV_${data.personalInfo.firstName}_${data.personalInfo.lastName}_${new Date().toISOString().slice(0,10)}.pdf`;
    
    // Générer le PDF
    const pdfBlob = pdf.output('blob');
    return URL.createObjectURL(pdfBlob);
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error);
    throw new Error('La génération du PDF a échoué');
  }
};

// Fonction pour générer une image à partir du CV
export const generateImage = async (resumeElement: HTMLElement, data: ResumeData): Promise<string> => {
  try {
    const canvas = await html2canvas(resumeElement, {
      scale: 3, // Haute résolution
      logging: false,
      useCORS: true,
      allowTaint: true
    });

    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Erreur lors de la génération de l\'image:', error);
    throw new Error('La génération de l\'image a échoué');
  }
};

// Cette fonction est une approximation car les conversions DOCX en frontend sont limitées
// Pour une implémentation plus robuste, un service backend serait nécessaire
export const generateDOCX = async (resumeElement: HTMLElement, data: ResumeData): Promise<string> => {
  try {
    // On utilise la même approche que pour l'image, car une conversion complète en DOCX
    // nécessiterait des outils plus avancés, généralement côté serveur
    const imageUrl = await generateImage(resumeElement, data);
    
    // On retourne simplement l'URL de l'image comme approximation
    // Dans une implémentation réelle, on pourrait passer cela à un service backend
    // qui génère un vrai fichier DOCX
    return imageUrl;
  } catch (error) {
    console.error('Erreur lors de la génération du DOCX:', error);
    throw new Error('La génération du DOCX a échoué');
  }
};

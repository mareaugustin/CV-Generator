import { ResumeData } from '@/types';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (resumeElement: HTMLElement, data: ResumeData): Promise<string> => {
  try {
    // 1. Sauvegarder les styles originaux
    const originalStyles = {
      overflow: resumeElement.style.overflow,
      width: resumeElement.style.width,
      height: resumeElement.style.height,
      position: resumeElement.style.position,
      transform: resumeElement.style.transform
    };

    // 2. Préparer l'élément pour la capture
    resumeElement.style.overflow = 'visible';
    resumeElement.style.width = '210mm';
    resumeElement.style.height = 'auto';
    resumeElement.style.position = 'relative';
    resumeElement.style.transform = 'none';

    // 3. Appliquer les styles pour éviter les coupures
    const elementsToProtect = resumeElement.querySelectorAll('li, .no-break');
    elementsToProtect.forEach(el => {
      const element = el as HTMLElement;
      element.style.pageBreakInside = 'avoid';
      element.style.breakInside = 'avoid';
      element.style.position = 'relative';

      // Ajouter un petit espace pour éviter les coupures trop près du contenu
      if (element.tagName.toLowerCase() === 'li') {
        element.style.paddingBottom = '2px';
      }
      
      // Protection supplémentaire pour les titres
      if (element.tagName.toLowerCase() === 'h2' || element.tagName.toLowerCase() === 'h3') {
        element.style.pageBreakAfter = 'avoid';
        element.style.marginBottom = '8px';
      }
    });

    // 4. Capture avec html2canvas
    const canvas = await html2canvas(resumeElement, {
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#FFFFFF',
      windowWidth: Math.floor(210 * 3.78), // Conversion mm en pixels
      windowHeight: resumeElement.scrollHeight,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.body.firstChild as HTMLElement;
        if (clonedElement) {
          clonedElement.style.transform = 'none';
          clonedElement.style.position = 'relative';
          clonedElement.style.overflow = 'visible';
        }
      }
    });

    // 5. Création du PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    // 6. Configuration des dimensions
    const pageWidth = 210;  // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const margins = {
      top: 0,    // marge en haut
      bottom: 0  // marge en bas
    };

    // 7. Calcul des dimensions de l'image
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // 8. Pagination avec gestion des marges
    let position = 0;
    let isFirstPage = true;

    while (position < imgHeight) {
      if (!isFirstPage) {
        pdf.addPage();
      }

      const remainingHeight = imgHeight - position;
      const heightToPrint = Math.min(pageHeight, remainingHeight);

      // Ajout de l'image avec prise en compte des marges
      pdf.addImage(
        canvas,
        'PNG',
        0,
        -position,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      );

      //position += heightToPrint;
      position += pageHeight;
      isFirstPage = false;
    }

    // 9. Restauration des styles originaux
    resumeElement.style.overflow = originalStyles.overflow;
    resumeElement.style.width = originalStyles.width;
    resumeElement.style.height = originalStyles.height;
    resumeElement.style.position = originalStyles.position;
    resumeElement.style.transform = originalStyles.transform;

    // 10. Génération du fichier
    const fileName = `CV_${data.personalInfo.firstName}_${data.personalInfo.lastName}.pdf`;
    const pdfBlob = pdf.output('blob');
    return URL.createObjectURL(pdfBlob);

  } catch (error) {
    console.error('Erreur génération PDF:', error);
    throw new Error('Échec de génération du PDF');
  }
};

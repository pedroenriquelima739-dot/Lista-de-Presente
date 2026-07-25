import jsPDF from 'jspdf';
import { GiftItem, WeddingInfo } from '../types';

export function generateSelectedGiftsPDF(gifts: GiftItem[], info: WeddingInfo) {
  const selectedGifts = gifts.filter((g) => g.isReserved);
  const doc = new jsPDF();

  // Header Banner
  doc.setFillColor(44, 59, 40); // #2C3B28 Dark Green
  doc.rect(0, 0, 210, 38, 'F');

  // Title text in white
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text(info.coupleNames || 'Thayná & Joelton', 14, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text('Lista de Presentes Selecionados - Chá de Casa Nova', 14, 28);

  // Subheader info
  const today = new Date().toLocaleDateString('pt-BR');
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(10);
  doc.text(`Data da consulta: ${today}`, 14, 48);

  if (selectedGifts.length === 0) {
    doc.setFillColor(254, 242, 242);
    doc.rect(14, 55, 182, 20, 'F');
    doc.setTextColor(185, 28, 28);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Nenhum presente foi selecionado até o momento.', 20, 67);
  } else {
    doc.setTextColor(44, 59, 40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(`Total de itens selecionados: ${selectedGifts.length}`, 14, 56);

    let y = 66;

    // Table Header
    doc.setFillColor(235, 242, 233);
    doc.rect(14, y - 5, 182, 9, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(44, 59, 40);
    doc.text('#', 18, y + 1);
    doc.text('Item / Presente', 30, y + 1);
    doc.text('Categoria', 125, y + 1);
    doc.text('Status', 168, y + 1);

    y += 9;
    doc.setFont('helvetica', 'normal');

    selectedGifts.forEach((gift, index) => {
      if (y > 270) {
        doc.addPage();
        y = 25;
      }

      // Zebra striping
      if (index % 2 === 1) {
        doc.setFillColor(248, 249, 247);
        doc.rect(14, y - 5, 182, 8, 'F');
      }

      doc.setTextColor(60, 60, 60);
      doc.text(`${index + 1}`, 18, y + 1);
      
      doc.setTextColor(20, 20, 20);
      doc.setFont('helvetica', 'bold');
      doc.text(gift.name, 30, y + 1);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80, 80, 80);
      doc.text(gift.category, 125, y + 1);

      doc.setTextColor(45, 106, 79);
      doc.setFont('helvetica', 'bold');
      doc.text('Selecionado', 168, y + 1);

      y += 9;
    });

    // Divider line
    doc.setDrawColor(200, 200, 200);
    doc.line(14, y + 2, 196, y + 2);
  }

  // Footer
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(140, 140, 140);
  doc.text('Documento gerado automaticamente pela Lista de Presentes de Thayná & Joelton.', 14, 285);

  doc.save('presentes-selecionados-thayna-joelton.pdf');
}

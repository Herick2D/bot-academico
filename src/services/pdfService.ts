import fs from "fs";
import { PDFDocument, StandardFonts } from "pdf-lib";
import pdfParse from 'pdf-parse';

export const createPDF = async (
    text: string,
    outputPath: string
): Promise<void> => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const fontSize = 12;
    const maxWidth = 550;

    const lines = text.match(/.{1,90}/g) || [];
    let y = 750;
    lines.forEach((line) => {
    page.drawText(line, { x: 50, y, size: fontSize, font });
    y -= 20;
    });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);
};

export const processPDF = async (filePath: string): Promise<string> => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        return data.text;
    } catch (error) {
        console.error("Erro ao processar PDF:", error);
        throw new Error("Erro ao processar PDF");
    }
}

import fs from "fs/promises";
import pdfParse from "pdf-parse";

export const processPDF = async (filePath: string): Promise<string> => {
    try {
        const pdfBuffer = await fs.readFile(filePath);
        const pdfData = await pdfParse(pdfBuffer);
        await fs.unlink(filePath);
        return pdfData.text;
    } catch (error) {
        console.error("Erro ao processar o PDF:", error);
        throw new Error("Erro ao processar o PDF");
    }
};

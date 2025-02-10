import { Request, Response } from 'express';
import { createPDF, processPDF } from '../services/pdfService';
import { getImprovedText } from '../services/aiService';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const upload = multer({ dest: 'uploads/' });

export const uploadMiddleware = upload.single('file');

export const handleFileUpload = async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
        res.status(400).json({ error: 'Nenhum arquivo enviado' });
        return;
    }

    try {
        const extractedText = await processPDF(req.file.path);
        const improvedText = await getImprovedText(extractedText);
    
        const outputPath = path.join(__dirname, '../../uploads/melhorias_sugeridas.pdf');
        await createPDF(improvedText, outputPath);

        res.json({ message: "Melhoria gerada!", downloadUrl: `/download` });
    } catch (error) {
        console.error('Erro ao processar o arquivo:', error);
        res.status(500).json({ error: 'Erro ao processar o arquivo' });
    }
};

export const handleDownload = (req: Request, res: Response): void => {
    const filePath = path.join(__dirname, '../../uploads/melhorias_sugeridas.pdf');

    if (!fs.existsSync(filePath)) {
        res.status(404).json({ error: 'Arquivo não encontrado' });
        return;
    }

    res.download(filePath, 'melhorias_sugeridas.pdf', (err) => {
        if (err) {
        console.error("Erro ao enviar arquivo:", err);
    }
    });
};

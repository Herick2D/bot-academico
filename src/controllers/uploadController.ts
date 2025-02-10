import { Request, Response } from 'express';
import { processPDF } from '../services/pdfService';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

export const uploadMiddleware = upload.single('file');

export const handleFileUpload = async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
        res.status(400).json({ error: 'Nenhum arquivo enviado' });
        return;
    }

    try {
        const extractedText = await processPDF(req.file.path);
        res.json({ text: extractedText });
    } catch (error) {
        console.error('Erro ao processar o arquivo:', error);
        res.status(500).json({ error: 'Erro ao processar o arquivo' });
    }
};

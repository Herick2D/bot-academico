import express, { Request, Response } from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import fs from 'fs/promises';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("OLÁAA");
});

app.post('/upload', upload.single('file'), async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).send('Nenhum arquivo enviado');
    return;
  }

  try {
    const pdfBuffer = await fs.readFile(req.file.path);
    const pdfData = await pdfParse(pdfBuffer);
    console.log('Texto retirado do PDF:', pdfData.text);

    await fs.unlink(req.file.path);

    res.json({ text: pdfData.text });
  } catch (error) {
    console.error('Erro ao processar o arquivo:', error);
    res.status(500).send('Erro ao processar o arquivo');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server rodando em http://localhost:${PORT}`);
});

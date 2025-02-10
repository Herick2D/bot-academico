import express from 'express';
import cors from 'cors';
import uploadRoutes from './routes/uploadRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/upload', uploadRoutes);

app.get('/', (req, res) => {
  res.send("OLÁAA");
});

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});

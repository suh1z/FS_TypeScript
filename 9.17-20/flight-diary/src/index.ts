import express from 'express';
import cors from 'cors';
import diaryRouter from './routes/diaries';

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

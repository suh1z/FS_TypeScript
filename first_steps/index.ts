import express from 'express';
import { calculateBmi } from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();
app.use(express.json())


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
      return res.status(400).json({ error: 'malformatted parameters' });
    }
  
    const bmi = calculateBmi(height, weight);
    return res.json({ height, weight, bmi: bmi });
  });
  

app.post('/exercises', (req, res) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if ((daily_exercises.some(isNaN)) || isNaN(target)) {
        res.status(400).json({ error: 'parameters missing' });
      }

    const exercises = daily_exercises.map(Number)
    const newTarget = Number(target)

    if ((exercises.some(isNaN)) || isNaN(newTarget)) {
        res.status(400).json({ error: 'malformatted parameters' });
      }

    const result = calculateExercises(exercises, newTarget);

      
    res.send({result});
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
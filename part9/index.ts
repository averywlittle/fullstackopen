import express from 'express';
import { calculateBMI } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, _res) => {
    _res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, _res) => {

    if(!_req.query.weight || !_req.query.height) _res.send({error: "malformatted parameters"});
    else {
        const weight = Number(_req.query.weight);
        const height = Number(_req.query.height);

        const bmiResult = calculateBMI(height, weight);
        _res.send({
            weight: weight,
            height: height,
            bmi: bmiResult
        });
    }
});

interface exercisesReq {
    daily_exercises: number[],
    target: number
}

app.post('/exercises', (_req, _res) => {
    const body: exercisesReq = _req.body;
    if (!body) _res.send({ error: "malformatted parameters" });
    const daily_exercises: number[] = body.daily_exercises;
    const target: number = body.target;
    const result = calculateExercises(daily_exercises, target);
    _res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
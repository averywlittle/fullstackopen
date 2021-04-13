import express from 'express';
import { calculateBMI } from './bmiCalculator';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
import express from 'express';
import cors from 'cors';
import { db } from './db';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!');

});

app.get('/games', async (req, res) => {
    const [rows] = await db.query(`select * from games;`)
    res.send(rows);
});

app.listen(3001, () => {
  console.log('backend running on: http://localhost:3001')

 });

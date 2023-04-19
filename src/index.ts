import express, { type Application } from 'express';

import dataJson from './data.json';

const app: Application = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.get('/api/resources', (_req, res) => {
  res.status(200).json(dataJson);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

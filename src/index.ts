import express, { type Application } from 'express';
import cors, { type CorsOptions } from 'cors';

import dataJson from './data.json';

const app: Application = express();
const PORT = 3001;
const corsOptions: CorsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
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

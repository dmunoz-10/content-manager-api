import express, { type Application } from 'express';
import cors, { type CorsOptions } from 'cors';

import dataJson from './data.json';

import type { ResourceData, ResourceDataCreate } from '@/types';

const resources = dataJson;

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
  res.status(200).json(resources);
});

app.post('/api/resources', (req, res) => {
  const id = String(Number(resources[-1].id) + 1);
  const createdAt = new Date().toString();
  const status = 'inactive';
  const resource: ResourceData = {
    ...(req.body as ResourceDataCreate),
    id,
    createdAt,
    status,
  };
  resources.unshift(resource);

  res.status(200).json({ resource });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

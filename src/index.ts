import express, { type Application } from 'express';
import cors, { type CorsOptions } from 'cors';

import dataJson from './data.json';

import type { ResourceData, ResourceDataCreate, ResourceDataUpdate } from '@/types';

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

app.get('/api/resources/active', (_req, res) => {
  const activeResource = resources.find(({ status }) => status === 'active');
  res.status(200).json(activeResource);
});

app.post('/api/resources', (req, res) => {
  const id = String(Number(resources[0].id) + 1);
  const createdAt = JSON.stringify(new Date());
  const status = 'inactive';
  const resource: ResourceData = {
    ...(req.body as ResourceDataCreate),
    id,
    createdAt,
    status,
    activatedAt: '',
  };
  resources.unshift(resource);

  res.status(200).json({ resource });
});

app.get('/api/resources/:id', (req, res) => {
  const { id: resourceId } = req.params;
  const resource: ResourceData | undefined = resources.find(({ id }) => resourceId === id);

  if (resource) {
    res.status(200).json({ resource });
  } else {
    res.status(404).json({ error: 'Resource not found' });
  }
});

app.put('/api/resources/:id', (req, res) => {
  const { id: resourceId } = req.params;
  const resource: ResourceData | undefined = resources.find(({ id }) => resourceId === id);

  if (resource) {
    const activeResource = resources.find(({ status }) => status === 'active');
    const activeResourceIndex = resources.findIndex(({ id }) => activeResource?.id === id);
    const resourceIndex = resources.findIndex(({ id }) => resourceId === id);
    const data = req.body as ResourceDataUpdate;

    if (data.status === 'active' && activeResource) {
      if (activeResource.id === resourceId) {
        return res.status(422).json({ error: "It's already activated!" });
      } else {
        resources[resourceIndex] = {
          id: resourceId,
          ...data,
          activatedAt: JSON.stringify(new Date()),
        };

        resources[activeResourceIndex] = {
          ...activeResource,
          status: 'inactive',
        };
      }
    } else {
      resources[resourceIndex] = {
        id: resourceId,
        ...data,
        activatedAt: JSON.stringify(new Date()),
      };
    }

    res.status(200).json({ message: 'Resource updated!' });
  } else {
    res.status(404).json({ error: 'Resource not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

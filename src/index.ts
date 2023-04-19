import express, { Application } from 'express';

const app: Application = express();

app.set('PORT', 3001);
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(app.get('PORT'), () => {
  console.log(`Server is listening on port ${app.get('PORT')}`);
});

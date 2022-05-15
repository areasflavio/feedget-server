import express from 'express';

const PORT = 3333;

const app = express();

app.get('/', (req, res) => {
  return res.json({ Hello: 'World' });
});

app.listen(PORT, () => {
  console.log('💻 Server is up on port... ' + PORT);
});

import 'dotenv/config';
import express from 'express';
import { routes } from './routes';

const PORT = process.env.PORT || 3333;

const app = express();
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log('💻 Server is up on port... ' + PORT);
});

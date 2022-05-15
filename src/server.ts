import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';

const PORT = process.env.PORT || 3333;

var transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 2525,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ Hello: 'World' });
});

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      comment,
      type,
      screenshot,
    },
  });

  transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Flávio Arêas <vflavio9@gmail.com>',
    subject: 'Novo feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`,
    ].join('\n'),
  });

  return res.status(201).json({ data: feedback });
});

app.listen(PORT, () => {
  console.log('💻 Server is up on port... ' + PORT);
});

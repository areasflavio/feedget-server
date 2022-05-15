import { Router } from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/NodemailerMailAdapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/PrismaFeedbacksRepository';
import { SubmitFeedbackUseCase } from './use-cases/SubmitFeedbackUseCase';

export const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ Hello: 'World' });
});

routes.post('/feedbacks', async (req, res) => {
  const { comment, type, screenshot } = req.body;

  const primaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    primaFeedbacksRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackUseCase.execute({
    comment,
    type,
    screenshot,
  });

  return res.status(201).send();
});

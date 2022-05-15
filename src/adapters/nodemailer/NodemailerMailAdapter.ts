import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../MailAdapter';

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 2525,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ body, subject }: SendMailData) {
    transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Flávio Arêas <vflavio9@gmail.com>',
      subject,
      html: body,
    });
  }
}

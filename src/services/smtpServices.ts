import * as nodemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import { verificationEmailTemplate } from '../templates/verificationEmailTemplate';

@Injectable()
class SMTP {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  CLIENT_PORT = this.configService.get('CLIENT_PORT');

  X_RAPID_API_KEY = this.configService.get('X_RAPID_API_KEY');
  X_RAPID_API_HOST = this.configService.get('X_RAPID_API_HOST');

  SMTP_PORT = this.configService.get('SMTP_PORT');
  SMTP_HOST = this.configService.get('SMTP_HOST');
  SMTP_PASSWORD = this.configService.get('SMTP_PASSWORD');
  SMTP_USERNAME = this.configService.get('SMTP_USERNAME');
  SMTP_FROM_ADDRESS = this.configService.get('SMTP_FROM_ADDRESS');

  async checkEmailExistence(email: string) {
    try {
      const options = {
        method: 'GET',
        url: 'https://email-checker.p.rapidapi.com/verify/v1',
        params: {
          email: email,
        },
        headers: {
          'X-RapidAPI-Key': this.X_RAPID_API_KEY,
          'X-RapidAPI-Host': this.X_RAPID_API_HOST,
        },
      };

      await this.httpService.axiosRef.request(options);
    } catch (error) {
      console.log(error);
    }
  }

  async sendMail({
    to,
    name,
    subject,
  }: {
    to: string;
    name: string;
    subject: string;
  }) {
    try {
      const url = `http://localhost:${this.CLIENT_PORT}`;

      const contentTemplate = verificationEmailTemplate(url);

      const transport = nodemailer.createTransport({
        host: this.SMTP_HOST,
        port: this.SMTP_PORT,
        secure: false,
        service: 'gmail',
        auth: {
          user: this.SMTP_USERNAME,
          pass: this.SMTP_PASSWORD,
        },
      });

      const options = {
        from: this.SMTP_FROM_ADDRESS,
        to: to,
        subject: subject,
        html: contentTemplate,
      };

      return await transport.sendMail(options);
    } catch (error) {
      console.error(error);
    }
  }
}

export { SMTP };

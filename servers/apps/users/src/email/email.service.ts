import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer'; // Import MailerService

type mailOptions = {
    subject: string;
    email: string;
    name: string;
    activationCode: string;
    
}


@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail({
   
    email,
    name,
    activationCode,
    
  }: mailOptions) {
      try {
          console.log(`Sending email to ${email}`);
          console.log(`Activation code: ${activationCode}`);
          console.log(`Name: ${name}`);
      await this.mailerService.sendMail({
        to: email,
          template: './activationMail',
          context: {
                name,
                activationCode,
          }
          
            

       
          
          
        
      });
  
    } catch (error) {
      console.error(`Failed to send email to ${email}`, error);
      throw error;
    }
  }
}

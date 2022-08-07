import sgMail from '@sendgrid/mail';
import { environment } from './environment';

sgMail.setApiKey(environment.sendgridApiKey);

export const sender =  sgMail;

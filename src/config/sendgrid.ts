import environment from '../config/environment';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(environment.sendgridApiKey);

export default sgMail;

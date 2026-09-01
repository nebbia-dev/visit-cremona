'use server'
import {sendMail} from "@/utils/nodemailer/sendMail";

export default async function send(formData:any) {

        const fullName = formData.get('name') + ' ' + formData.get('lastname');
        const email = formData.get('email');
        const newsletter = formData.get('newsletter');
        if(newsletter === 'false') {
            const subject = formData.get('subject');
            const message = formData.get('message');
            await sendMail({
                sendTo: 'info@visitcremona.com',
                subject:'Nuova richiesta di informazioni: ' + subject,
                text: fullName + ' ha mandato il seguente messaggio: ' + message,
                replyTo: email
            });
        } else {
            await sendMail({
                sendTo: 'info@visitcremona.com',
                subject:'Nuova iscrizione alla newsletter',
                text: fullName + ' si è iscritto alla newsletter ',
                replyTo: email
            });
        }
}
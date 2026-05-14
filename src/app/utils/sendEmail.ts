
import nodemailer from "nodemailer"
import { envVars } from "../config/env"
import path from "path"
import ejs from "ejs"
import AppError from "../errorHelper/AppError"


const transporter = nodemailer.createTransport({
    secure: true,
    host: envVars.SMTP_HOST,
    port: Number(envVars.SMTP_PORT),
    auth: {
        user: envVars.SMTP_USER,
        pass: envVars.SMTP_PASS
    }

})


interface SendEmailInterface {
    to: string,
    subject: string,
    templateName: string,
    templateData?: Record<string, string>
    attachments?: {
        filename: string,
        content: Buffer | string,
        contentType: string
    }[]
}


export const sendEmail = async ({
    to,
    subject,
    templateName,
    templateData,
    attachments
}: SendEmailInterface) => {
    try {
        const templatePath = path.join(__dirname, `templates/${templateName}.ejs`)
        const html = await ejs.renderFile(templatePath, templateData)
        const info = await transporter.sendMail({
            from: envVars.SMTP_FROM,
            to: to,
            subject: subject,
            html: html,
            attachments: attachments?.map(attachment => ({
                filename: attachment.filename,
                content: attachment.content,
                contentType: attachment.contentType

            }))
        })
        console.log(`\u2709\uFE0F Email sent to ${to}:${info.messageId}`);

    } catch (error) {
        console.log(error);

        throw new AppError(401, 'email error', '')
    }


}
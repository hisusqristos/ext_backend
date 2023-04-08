import nodemailer from "nodemailer"

const sendEmail = async (to: string, activationLink: string) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.SMTP_USER,
        to,
        subject: 'Accouunt activation',
        text: `http://localhost:${process.env.PORT}/reset-password` + activationLink
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


export { sendEmail }
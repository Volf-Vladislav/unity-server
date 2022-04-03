import * as nodemailer from 'nodemailer'

class MailService {

    private transport = nodemailer.createTransport({
        host: 'mail',
        port: 465,
        secure: true,
        auth: {
            user: 'testbotfotmail@mail.ru',
            pass: 'PoUupmpIP12%'
        }
    }, { from: 'Test Bot <testbotfotmail@mail.ru>' })

    private getRandomCode = (min: number, max: number) =>
        (Math.floor(Math.random() * (max - min)) + min).toString()


    public sendEmail(email: string) {
        this.transport.sendMail({
            text: this.getRandomCode(10000, 99999),
            to: email,
            subject: 'Code'
        },
            (error, info) => {
                console.log(error)
                console.log(info)
            })
    }
}

export default new MailService()
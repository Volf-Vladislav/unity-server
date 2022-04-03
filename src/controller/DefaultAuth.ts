import { Request, Response } from 'express'
import * as bcrypt from 'bcryptjs'

import tokenService from '../service/TokenService'
import User from '../model/User'
import Person from './helpers/Person'
import MailService from '../service/MailService'

class DefaultAuth {
    public async registration(req: Request, res: Response) {
        try {
            const person: Person = req.body
            const hashedPassword: string = bcrypt.hashSync(person.password, 3)

            const user = new User({
                nickname: person.nickname,
                email: person.email,
                phone: person.phone,
                password: hashedPassword,
                referralLink: '1234'
            })

            await user.save()
                .then(() => {
                    return res.status(200).json({ message: 'Пользователь создан' })
                })
        }

        catch (err) {
            console.log(err)
            return res.status(400).json({ message: 'Заполните все данные' })
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const person: Person = req.body

            const user = await User.findOne({ email: person.email })
            if (!user)
                return res.status(400).json({ message: 'Пользователь не найден' })

            const validPassword = bcrypt.compareSync(person.password, user.password)
            if (!validPassword)
                return res.status(400).json({ message: 'Неверный пароль' })

            const token = tokenService.generateToken(user._id, user.role)
            res.status(200).json({ message: 'Успешно', token: token })
        }

        catch (err) {
            console.log(err)
            return res.status(500).json({ message: 'Серверная ошибка' })
        }
    }
}

export default new DefaultAuth()
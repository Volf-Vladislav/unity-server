import * as jwt from 'jsonwebtoken'

class TokenService {
    private readonly SECRET_KEY = 'I&CBCNoid9wd8'

    public generateToken(id: string, role: string):string {
        const payload: Object = {
            id,
            role
        }

        return jwt.sign(payload, this.SECRET_KEY, { expiresIn: '72h' })
    }

    public decodeToken(token: string):string {
        return `${jwt.verify(token, this.SECRET_KEY)}`
    }
}

export default new TokenService()
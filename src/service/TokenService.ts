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

    public decodeToken = (token: string) =>
        (jwt.verify(token, this.SECRET_KEY)).toString()
}

export default new TokenService()
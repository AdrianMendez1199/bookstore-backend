import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const SECRET = 'Judoneyba*12345'

export function getUserId (request: any) : any {
     const header: string = request.get('authorization')

     if(!header)
        throw new Error(`Authentication required`)

     const token: string = header.replace('Bearer ', '')
     const {userId} : any = jwt.verify(token, SECRET)
     return userId
}

export async function hashPassword (password: string): Promise<string>  {
    if (password.length < 6)
            throw Error(`Password must be 6 characters or longer`)

    const salt = await bcrypt.genSalt(10)

    return bcrypt.hash(password, salt)
}


export async function  validatePassword  (requestPassword: string, password: string):  Promise<boolean>  {
    return await bcrypt.compare(requestPassword, password)
}


export function generateToken  (userId: string) : string {
    return jwt.sign({userId}, SECRET, {expiresIn: '2 days'})
}


import { hash } from 'bcrypt'

export default async function encryptPass(pass: string) {
    const salt = await hash(pass, 16)
    return salt
}

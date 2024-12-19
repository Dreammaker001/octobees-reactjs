import { SECRET_KEY } from "../constants/api.constants"
import { AES, enc } from "crypto-js"

// Enkripsi Token
function encryptToken(token) {
    const secretKey = SECRET_KEY
    return AES.encrypt(token, secretKey).toString()
}

// Dekripsi Token  
function decryptToken(encryptedToken) {
    const secretKey = SECRET_KEY
    const bytes = AES.decrypt(encryptedToken, secretKey)
    return bytes.toString(enc.Utf8)
}

// Simpan Token Terenkripsi
export function setToken(token) {
    const encryptedToken = encryptToken(token)
    localStorage.setItem('secure_token', encryptedToken)
}

// Ambil Token Terdekripsi
export function getToken() {
    const encryptedToken = localStorage.getItem('secure_token')
    if (!encryptedToken) return null
    return decryptToken(encryptedToken)
}
import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const password = `${process.env.ENCRYPTION_PASSWORD}`;

export const Encryption = {
  encrypt: function (text: string) {
    const cipher = crypto.createCipher(algorithm, password)
    let crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');

    return crypted;
  },
  decrypt: function (text: string) {
    const decipher = crypto.createDecipher(algorithm, password)
    let dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');

    return dec;
  }
}

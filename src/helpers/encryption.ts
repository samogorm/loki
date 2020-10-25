import crypto from 'crypto';

const algorithm = `${process.env.ENCRYPTION_ALGORITHM}`;
const password = `${process.env.ENCRYPTION_PASSWORD}`;

export const Encryption = {
  encrypt: (text: string) => {
    const cipher = crypto.createCipher(algorithm, password);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
  },
  decrypt: (text: string) => {
    const decipher = crypto.createDecipher(algorithm, password);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}

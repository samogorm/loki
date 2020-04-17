import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const password = '3zTvzr3p67VC61jmV54rIYu1545x4TlY'; // Todo: move to an env file

const Encryption = {
  encrypt: function (text: string) {
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');

    return crypted;
  },
  decrypt: function (text: string) {
    var decipher = crypto.createDecipher(algorithm, password)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');

    return dec;
  }
}

export default Encryption;

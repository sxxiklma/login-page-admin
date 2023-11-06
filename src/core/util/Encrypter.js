import cryptoJs from "crypto-js";
import { enc, Base64 } from 'crypto-js';
import { Config } from "../../config/Config";
// let key = process.env.KEY;
var key = Config.apiKey;
var secretkey = cryptoJs.enc.Base64.parse(key);

var encMode = {
    mode: cryptoJs.mode.ECB,
    padding: cryptoJs.pad.Pkcs7
}

export function encrypt(text, iv) {

    // var encrypted = cryptoJs.AES.encrypt(text, secretkey, { iv: iv });
    var encrypted = cryptoJs.AES.encrypt(text, secretkey, encMode);

    return encrypted.toString();
}


export function decrypt(text, iv) {

    // var decrypted = cryptoJs.AES.decrypt(text, secretkey, { iv: iv });
    var decrypted = cryptoJs.AES.decrypt(text, secretkey, encMode);

    return decrypted.toString(cryptoJs.enc.Utf8);
}

export function encodeB64(text) {
    // console.log(enc.Utf8.parse(text));
    // console.log(cryptoJs.enc.Base64.stringify(enc.Utf8.parse(text)));
    return enc.Base64.stringify(enc.Utf8.parse(text));
}

export function decodeB64(encodedText) {
    return Base64.parse(encodedText).toString(enc.Utf8);
}

// var iv = cryptoJs.enc.Base64.parse("qR0H585L4r8kW7o7gbJvLg==");
export class Encrypter {

    encrypt(text, iv) {
        return encrypt(text, iv);
    }

    decrypt(text, iv) {
        return decrypt(text, iv);
    }

    encodeB64(text) {
        return encodeB64(text);
    }

    decodeB64(encodedText) {
        return decodeB64(encodedText);
    }

}

// module.exports = {
//     encrypt, decrypt
// }
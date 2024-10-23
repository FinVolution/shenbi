import CryptoJS from 'crypto-js'
import JSEncrypt from 'jsencrypt'

const encryptor = new JSEncrypt()

// 生成 AESKEY
const aesKey = createAesKey()

let publicKey = '';

function createAesKey () {
  const expect = 16
  let str = Math.random().toString(36).substr(2)
  while (str.length < expect) {
    str += Math.random().toString(36).substr(2)
  }
  str = str.substr(0, 16)
  return str
}

/**
 * AES 加密
 * @param word 待加密字段
 * @param keyStr 加密 key
 * @returns {string} 返回加密字段
 */
export function aesEncrypt (word) {
    let keyHex = CryptoJS.enc.Utf8.parse(aesKey);
    let content = CryptoJS.enc.Utf8.parse(word);
    let ivHex = CryptoJS.enc.Utf8.parse("");
    let encrypted = CryptoJS.AES.encrypt(content, keyHex, {
        iv: ivHex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

/**
 * RSA 获取公钥
 */
export function getPublicKey() {
    return new Promise(resolve => {
        setPublicKey(publicKey);
        resolve(true);
    });
}

/**
 * AES 解密
 * @param word 待解密数据
 * @param keyStr 解密 key
 * @returns {string} 返回解密字符串
 */
export function aesDecrypt (word, key) {
    key = key || aesKey;
    try {
        let keyHex = CryptoJS.enc.Utf8.parse(key);
        let ivHex = CryptoJS.enc.Utf8.parse("");
        let decrypt = CryptoJS.AES.decrypt(word, keyHex, {
            iv: ivHex,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr;
    } catch (e) {
        console.log(e)
        return ""
    }

}

/**
 * RSA 设置公钥
 * @param val 公钥
 */
function setPublicKey (val) {
  encryptor.setPublicKey(val)
}

/**
 * RSA 加密
 * @param data 待加密数据
 * @returns {PromiseLike<ArrayBuffer>} 返回加密字符串
 */
function rsaEncrypt (data) {
  return encryptor.encrypt(data);
}

export function getRSAEncryptKey() {
    return rsaEncrypt(aesKey);
    // 传给服务端的
}

export function getOriginKey() {
    return aesKey;
    // 旧的key
}

export default {
    aesEncrypt,
    aesDecrypt,
    getPublicKey,
    getRSAEncryptKey,
    getOriginKey,
}

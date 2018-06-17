/*
 * RSA-Crypt.js
 * 公開鍵暗号RSAを使い、テキストの暗号化・複合化を行います。
 */

/*
 * BigNumber.js (c) MikeMcl MIT License
 * https://github.com/MikeMcl/bignumber.js
 * 
 * JavaScriptでは2^53-1より大きい数を正確に扱えないため、計算用ライブラリを導入。
 */
const BigNumber = require('./lib/bignumber.js');

// 計算用関数
const GCD = (x, y) => !(x % y) ? y : GCD(y, x % y);
const LCM = (a, b) => (a * b) / GCD(a, b)|0;
const range = (start, end) => Array.from(Array(end - start + 1).keys()).map(i => i + start) ;

/*
 * Object generateRSAKeys(int Prime, int Prime)
 * RSAキーを生成し、オブジェクトを返します。
 */
const generateRSAKeys = (p, q) => {
    const N = p * q;
    const L = LCM(p-1, q-1);

    let E, D, i;

    for(i = 2; i < L; i++){
        if(GCD(i, L) === 1){
            E = i;
            break;
        }
    }

    for(i = 2; i < L; i++){
        if((E * i) % L === 1){
            D = i;
            break;
        }
    }

    return ({
        public : [E, N],
        secret : [D, N]
    })

}

// 簡略化用 テキスト <==> CharCodeArray変換関数
const convertTextToIntArray = string => string.split("").map(v => v.charCodeAt());
const convertIntArrayToText = array => array.map(v => String.fromCharCode(v)).join("");

/*
 * Array encryptText(String plainText, Array publicKey)
 * PublicKeyに基づきテキストの内容を暗号化します。
 * 文字ごとに配列に格納され暗号化後返されます。
 */
const encryptText = (plainText, publicKey) => {
    const [E, N] = publicKey;
    const convertedPlainText = convertTextToIntArray(plainText)
    return convertedPlainText.map(v => new BigNumber(v).pow(E, N));
}

/*
 * Array encryptText(Array encryptedText, Array publicKey)
 * SecretKeyに基づきArrayの内容を復号化します。
 */
const decrypt = (encryptedText, secretKey) => {
    const [D, N] = secretKey;
    return encryptedText.map(v => new BigNumber(v).pow(D,N));
}

// NOTICE : 素数があまりに大きいと計算できない
const RSAKeys = generateRSAKeys(20983, 16061);

const plainText = "地獄のJavaScript"
const encryptedText = encryptText(plainText, RSAKeys.public)
const decryptedText = decrypt(encryptedText, RSAKeys.secret);

console.log(`
#--------------- RSA Keys ---------------#
   Secret Keys : [ ${RSAKeys.secret} ]
   Public Keys : [ ${RSAKeys.public} ]

#-------------- Plain Text --------------#
   "${plainText}"

#------------ Converted Text ------------#
   ${convertTextToIntArray(plainText)}

#------------ Encrypted Text ------------#
   ${encryptedText}

#------------ Decrypted Text ------------#
   ${decryptedText}

`)
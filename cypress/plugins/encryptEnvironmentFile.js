const fs = require('fs');

fs.readFile('../../samples/staging.json', function (err, data) {
    const json = JSON.parse(data);

    json.accounts.forEach(obj => {
        Object.entries(obj).forEach(([key, value]) => {
            if (key === 'user' | key === 'pass') obj[key] = Encrypt(value)
        });
    });

    fs.writeFile("../fixtures/staging.json", JSON.stringify(json), function(err){
    });
});

fs.readFile('../../samples/production.json', function (err, data) {
    const json = JSON.parse(data);

    json.accounts.forEach(obj => {
        Object.entries(obj).forEach(([key, value]) => {
            if (key === 'user' | key === 'pass') obj[key] = Encrypt(value)
        });
    });

    fs.writeFile("../fixtures/production.json", JSON.stringify(json), function(err){
    });
});


const crypto = require('crypto');
const ENCRYPTION_KEY = 'abcdef1234567890abcdef1234567890'; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

/**
 * @return {string}
 */
function Encrypt(text) {
 let iv = crypto.randomBytes(IV_LENGTH);
 let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
 let encrypted = cipher.update(text);

 encrypted = Buffer.concat([encrypted, cipher.final()]);

 return iv.toString('hex') + ':' + encrypted.toString('hex');
}

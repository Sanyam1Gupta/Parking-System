import { Aes, AesUtils, Pgp } from '../libs/dbat-crypto';

const Crypto = {
  encrypter,
  decrypter,
  encryptPayload,
  decryptPayload,
  encryptCreds,
};

export default Crypto;

function encryptPayload(body, auth, headers) {
  console.log('encryptPayload, headers', headers);
  const { token, requestTokenKey } = auth;
  console.log('encryptPayload, token', token);
  const tokenVlaue = (token && token[requestTokenKey]) || undefined;
  if (tokenVlaue) {
    const encryptionKey = AesUtils.extractKeyFromToken(tokenVlaue);
    const bodyString = JSON.stringify(body);
    const encryptParams = { key: encryptionKey, data: bodyString };
    const encryptedData = Aes.encrypt('aes-256-gcm', encryptParams);
    const encryptedBody = { payload: encryptedData };
    return encryptedBody;
  }
  return body;
}

async function encryptCreds(body, auth, headers) {
  const {
    pgpPublicKey: publicKeyArmored,
    pgpPassphrase: passphrase,
    pgpUserId: userIds,
  } = auth;
  const params = {
    data: body,
    publicKeyArmored,
    passphrase,
    userIds,
  };

  const encrptedBody = await Pgp.encrypt(params);
  return encrptedBody;
}

function decryptPayload(data, auth, headers) {
  console.log('decryptPayload data, auth, headers', data, auth, headers);
  const { responseTokenKey } = auth;
  const token = headers[responseTokenKey];
  console.log('decryptPayload token', token);
  if (token) {
    const decryptionKey = AesUtils.extractKeyFromToken(token);
    const { payload = '' } = data;
    const decryptParams = { key: decryptionKey, data: payload };
    const decryptedDataString = Aes.decrypt('aes-256-gcm', decryptParams);
    const decryptedData = JSON.parse(decryptedDataString);
    return decryptedData;
  }
  return data;
}

async function encrypter(data, headers, auth, type) {
  console.log('encrypter type', type);
  switch (type) {
    case 'AES':
      return encryptPayload(data, auth, headers);
    case 'PGP':
      return await encryptCreds(data, auth, headers);
    default:
      return data;
  }
}

async function decrypter(data, headers, auth, type) {
  console.log('decrypter type', type);
  switch (type) {
    case 'AES':
      return decryptPayload(data, auth, headers);
    case 'PGP':
      return await decryptCreds(data, auth, headers);
    default:
      return data;
  }
}

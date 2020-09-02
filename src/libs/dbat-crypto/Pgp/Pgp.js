import openpgp, { key, message } from 'openpgp';
import PgpUtils from './PgpUtils';

const Pgp = {
  encrypt,
  decrypt,
};
const DEFAULT_OPTIONS = {};
export default Pgp;
async function encrypt(params = {}, options = {}) {
  console.log('message', message);
  const {
    data = {},
    publicKeyArmored = '',
    passphrase = '',
    userIds = [],
  } = params;
  const dataString = JSON.stringify(data);

  if (typeof publicKeyArmored !== 'string' || !publicKeyArmored) {
    throw new Error('Provided "publicKeyArmored" must be a non-empty string');
  }

  if (typeof passphrase !== 'string' || !passphrase) {
    throw new Error('Provided "passphrase" must be a non-empty string');
  }

  const keyGenOpts = { userIds, passphrase };
  const newKeys = await PgpUtils.generateKeys(keyGenOpts);
  const { privateKeyArmored } = newKeys;
  const {
    keys: [privateKey],
  } = await key.readArmored(privateKeyArmored);
  await privateKey.decrypt(passphrase);

  const messageData = message.fromText(dataString);
  const publicKeys = await key.readArmored(publicKeyArmored);

  const encryptionOpts = {
    message: messageData,
    publicKeys: publicKeys.keys,
    privateKeys: [privateKey],
  };

  const encryptedDataObj = await openpgp.encrypt(encryptionOpts);

  return {
    payload: encryptedDataObj.data,
    publicKeyArmored: newKeys.publicKeyArmored,
  };
}
async function decrypt(params = {}, options = {}) {
  const { data = {}, privateKeyArmored = '', passphrase = '' } = params;

  if (typeof privateKeyArmored !== 'string' || !privateKeyArmored) {
    throw new Error('Provided "privateKeyArmored" must be a non-empty string');
  }

  if (typeof passphrase !== 'string' || !passphrase) {
    throw new Error('Provided "passphrase" must be a non-empty string');
  }

  const { payload, publicKeyArmored } = data;
  const {
    keys: [privateKey],
  } = await key.readArmored(privateKeyArmored);
  await privateKey.decrypt(passphrase);

  const messageData = await message.readArmored(payload);
  const publicKeys = await key.readArmored(publicKeyArmored);

  const decryptionOpts = {
    message: messageData,
    privateKey: [privateKey],
    publicKeys: publicKeys.keys,
  };

  const decryptedData = await openpgp.decrypt(decryptionOpts);

  return decryptedData;
}

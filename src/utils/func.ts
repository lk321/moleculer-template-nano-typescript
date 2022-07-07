import os from 'os';
import crypto from 'crypto';

export const isObjectId = (str: string) => /^[0-9a-fA-F]{24}$/.test(str);

export const sha256 = (str: string) => crypto.createHash('sha256').update(str, 'binary').digest('hex');

export const getUniqId = () => {
  const interfaces = os.networkInterfaces();
  let mac = os.hostname();

  if (interfaces.en0 && Array.isArray(interfaces.en0) && interfaces.en0.length > 0) {
    mac = interfaces.en0.filter((i) => i.family === 'IPv4')[0].mac;
  }

  return sha256(mac);
};

export const getRandomBytes = () => crypto.randomBytes(5).toString('hex');

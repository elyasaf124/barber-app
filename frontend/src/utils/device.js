// src/utils/device.js
import { v4 as uuidv4 } from 'uuid';

export function getDeviceId() {
  let did = localStorage.getItem('deviceId');
  if (!did) {
    did = uuidv4();
    localStorage.setItem('deviceId', did);
  }
  return did;
}

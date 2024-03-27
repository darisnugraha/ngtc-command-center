/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
const hexEncode = (str) => {
  let result = '';
  result = str.toString(16);
  return result;
};

const hexdec = (hex) => {
  let str = '';
  str = parseInt(hex, 16);
  return str;
};
const chr = (asci) => {
  let str = '';
  str = String.fromCharCode(asci);
  return str;
};

function maskingFunction(number) {
  const numberString = String(number);
  const list = numberString.split('');
  return Number(
    `${list
      .map((data) => {
        if (data === '.') {
          return '.';
        }
        // console.log(data);
        return String(Number(data) + 22);
      })
      .join('')}1`
  );
}

function unMaskingFunction(number) {
  const numberString = String(number).slice(0, String(number).length - 1);
  const list = numberString.split('.');
  return Number(
    list
      .map((data) => {
        const segment = data.split('').reduce((s, c) => {
          const l = s.length - 1;
          s[l] && s[l].length < 2 ? (s[l] += c) : s.push(c);
          return s;
        }, []);
        return segment
          .map((x) => {
            // console.log(x);
            return x - 22;
          })
          .join('');
      })
      .join('.')
  );
}

const encryptascii = (str) => {
  const key = 'b3r4sput1h';

  const dataKey = {};
  for (let i = 0; i < key.length; i++) {
    dataKey[i] = key.substr(`${i}`, 1);
  }

  let strEnc = '';
  let nkey = 0;
  const jml = str.length;

  for (let i = 0; i < parseInt(jml); i++) {
    strEnc += hexEncode(str[i].charCodeAt(0) + dataKey[nkey].charCodeAt(0));

    if (nkey === Object.keys(dataKey).length - 1) {
      nkey = 0;
    }
    nkey += 1;
  }
  return strEnc.toUpperCase();
};

const decryptascii = (str) => {
  if (str !== null) {
    const key = 'b3r4sput1h';
    const dataKey = {};
    for (let i = 0; i < key.length; i++) {
      dataKey[i] = key.substr(`${i}`, 1);
    }

    let strDec = '';
    let nkey = 0;
    const jml = str.length;
    let i = 0;
    while (i < parseInt(jml)) {
      strDec += chr(hexdec(str.substr(i, 2)) - dataKey[nkey].charCodeAt(0));
      if (nkey === Object.keys(dataKey).length - 1) {
        nkey = 0;
      }
      nkey += 1;
      i += 2;
    }
    return strDec;
  }
};

function doEncrypt(data, ignore = []) {
  if (typeof data === 'object') {
    // eslint-disable-next-line
    Object.keys(data).map((x) => {
      const result = ignore.find((find) => find === x);
      if (!result) {
        if (Array.isArray(data[x])) {
          // eslint-disable-next-line
          data[x].map((y, i) => {
            if (typeof y === 'string') {
              data[x][i] = encryptascii(y);
            } else {
              doEncrypt(y, ignore);
            }
          });
        } else if (typeof data[x] === 'string') {
          // console.log(data[x]);
          data[x] = encryptascii(data[x]);
        } else if (typeof data[x] === 'number') {
          data[x] = maskingFunction(data[x]);
        }
      }
    });
  } else if (typeof data === 'string') {
    // console.log(data);
    data = encryptascii(data);
  }
  return data;
}

function doDecrypt(data, ignore = []) {
  if (typeof data === 'object') {
    // eslint-disable-next-line
    Object.keys(data).map((x) => {
      const result = ignore.find((find) => find === x);
      if (!result) {
        if (Array.isArray(data[x])) {
          // eslint-disable-next-line
          data[x].map((y, i) => {
            if (typeof y === 'string') {
              data[x][i] = decryptascii(y);
            } else {
              doDecrypt(y, ignore);
            }
          });
        } else if (data[x]?.detail_inquiry !== undefined) {
          data[x].detail_inquiry.map((l, p) => {
            if (typeof l === 'string') {
              data[x][p] = decryptascii(y);
            } else {
              doDecrypt(l, ignore);
            }
          });
        } else if (typeof data[x] === 'string') {
          data[x] = decryptascii(data[x]);
        } else if (typeof data[x] === 'number') {
          data[x] = unMaskingFunction(data[x]);
        }
      }
    });
  } else if (typeof data === 'string') {
    // console.log(data);
    data = decryptascii(data);
  } else if (typeof data === 'number') {
    data = unMaskingFunction(data);
  }
  return data;
}

export function doDecryptData(dataBeforeCopy, ignore = []) {
  if (!dataBeforeCopy) {
    return dataBeforeCopy;
  }

  if (typeof dataBeforeCopy === 'object' && !(dataBeforeCopy instanceof Date)) {
    const data = Array.isArray(dataBeforeCopy) ? [...dataBeforeCopy] : { ...dataBeforeCopy };
    Object.keys(data).map((x) => {
      const result = ignore.find((find) => find === x);
      if (!result) {
        if (Array.isArray(data[x])) {
          // eslint-disable-next-line
          data[x] = data[x].map((y, i) => {
            if (typeof y === 'string') {
              return decryptascii(y);
              // eslint-disable-next-line
            } else if (typeof data[x] === 'object' && data[x] && !(data[x] instanceof Date)) {
              return doDecrypt(y, ignore);
            }
            return false;
          });
        } else {
          // Real Encrypt
          // eslint-disable-next-line
          if (typeof data[x] === 'string' && data[x]) {
            data[x] = decryptascii(data[x]);
          } else if (typeof data[x] === 'number' && data[x]) {
            // Call Unmasking Number()
          } else if (typeof data[x] === 'object' && data[x] && !(dataBeforeCopy instanceof Date)) {
            data[x] = doDecrypt(data[x], ignore);
          }
        }
      }
      return false;
    });
    return data;
    // eslint-disable-next-line
  } else if (typeof dataBeforeCopy === 'string') {
    const data = decryptascii(dataBeforeCopy);
    return data;
  }
}

export function doEncryptData(dataBeforeCopy, ignore = []) {
  if (!dataBeforeCopy) {
    return dataBeforeCopy;
  }
  if (typeof dataBeforeCopy === 'object' && !(dataBeforeCopy instanceof Date)) {
    const data = Array.isArray(dataBeforeCopy) ? [...dataBeforeCopy] : { ...dataBeforeCopy };
    Object.keys(data).map((x) => {
      const result = ignore.find((find) => find === x);
      if (!result) {
        if (Array.isArray(data[x])) {
          // eslint-disable-next-line
          data[x] = data[x].map((y, i) => {
            if (typeof y === 'string') {
              return encryptascii(y);
              // eslint-disable-next-line
            } else if (typeof data[x] === 'object' && data[x] && !(data[x] instanceof Date)) {
              return doEncrypt(y, ignore);
            }
            return false;
          });
        } else {
          // eslint-disable-next-line
          if (typeof data[x] === 'string' && data[x]) {
            data[x] = encryptascii(data[x]);
          } else if (typeof data[x] === 'number' && data[x]) {
            // Call Masking Number
          } else if (typeof data[x] === 'object' && data[x] && !(dataBeforeCopy instanceof Date)) {
            data[x] = doEncrypt(data[x], ignore);
          }
        }
      }
      return false;
    });
    return data;
    // eslint-disable-next-line
  } else if (typeof dataBeforeCopy === 'string') {
    const data = encryptascii(dataBeforeCopy);
    return data;
  }
}

export const saveLocal = async (name, payload, ignore = []) => {
  return new Promise((resolve, reject) => {
    try {
      if (Array.isArray(payload)) {
        const hasil = payload.map((x) => doEncryptData(x, ignore));
        localStorage.setItem(name, JSON.stringify(hasil));
        resolve('Berhasil');
      } else if (typeof payload === 'string') {
        localStorage.setItem(name, encryptascii(payload));
        resolve('Berhasil');
      } else {
        console.log(payload);
        localStorage.setItem(name, JSON.stringify(doEncrypt(payload, ignore)));
        resolve('Berhasil');
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const getLocal = (name, ignore = []) => {
  return new Promise((resolve, reject) => {
    try {
      const result = localStorage.getItem(name);

      if (result === null) {
        resolve([]);
      }
      if (result.includes('[')) {
        const hasil = JSON.parse(result).map((x) => doDecryptData(x, ignore));
        resolve(hasil);
      } else if (result.includes('{')) {
        const hasil = doDecryptData(JSON.parse(result), ignore);
        resolve(hasil);
      } else {
        resolve(doDecryptData(result, ignore));
      }
    } catch (error) {
      reject(error);
    }
  });
};

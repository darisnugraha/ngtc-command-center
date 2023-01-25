import Resizer from 'react-image-file-resizer';
import { createNumberMask } from 'redux-form-input-masks';

export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const dataURLtoFile = (dataurl, filename) => {
  // export const dataURLtoFile = (dataurl, filename) =>
  let arr = dataurl.split(','),
    // mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename + '.jpg', {
    type: 'image/jpg',
  });
};

export const dataURLtoPDFFile = (dataurl, filename) => {
  // export const dataURLtoFile = (dataurl, filename) =>
  let arr = dataurl.split(','),
    // mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename + '.pdf', {
    type: 'application/pdf',
  });
};

export const resizeFile = (file) =>
  new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      720,
      1366,
      'JPEG',
      50,
      0,
      (uri) => {
        resolve(uri);
      },
      'base64'
    );
  });

export const currencyMask = createNumberMask({
  prefix: 'Rp. ',
  locale: 'kr-KO',
});

export const NumberOnly = (value, previousValue) => {
  if (value) {
    return value.replace(/[^\d]/g, '');
  } else {
    return value;
  }
};

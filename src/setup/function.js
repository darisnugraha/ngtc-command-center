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

export const upper = (value) => value && value.toUpperCase();
export const normalizeAlphaWithUpper = (value) => {
  if (!value) {
    return value;
  }

  // Hanya memperbolehkan huruf dari a sampai z
  return value.replace(/[^a-z0-9]/gi, '').toUpperCase();
};

export const getToday = (indo) => {
  return indo
    ? ('0' + new Date().getDate()).slice(-2) +
        '-' +
        ('0' + (new Date().getMonth() + 1)).slice(-2) +
        '-' +
        new Date().getFullYear()
    : new Date().getFullYear() +
        '-' +
        ('0' + (new Date().getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + new Date().getDate()).slice(-2);
};

export const isPos = () => {
  // const version = process.env.REACT_APP_VERSION;
  const ua = navigator.userAgent;

  if (
    /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) &&
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return true;
  } else {
    return false;
  }
};

export const changeDateIndoToGlobal = (data) => {
  const part = data.split('/');
  return part.reverse().join('/');
};

export function replaceDashWithHyphen(input) {
  return input.replace(/–/g, '-');
}

export const manipulatePriceData = (data) => {
  if (data === 0) {
    return <p className='text-hover-primary d-block mb-1 text-bold'>FREE</p>;
  } else {
    return (
      <p className='text-hover-primary d-block mb-1 fs-6'>Rp. {data?.toLocaleString() || '0'}</p>
    );
  }
};

export const handleZeroToFree = (data) => {
  if (data === 0) {
    return 'FREE';
  } else {
    return data?.toLocaleString() || '0';
  }
};

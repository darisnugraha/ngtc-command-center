import firebase from '../firebase';
import { convertBase64, dataURLtoFile, resizeFile } from '../function.js';

export function postImage(file: any, name: string) {
  return new Promise((resolve, reject) => {
    const storage = firebase.storage();
    let storageRef = storage.ref('NSIPIC/BuktiBayar/' + name + '.jpg');
    storageRef
      .put(file)
      .then((res: any) => {
        storageRef.getDownloadURL().then(function (url: any) {
          resolve(url);
        });
      })
      .catch((err: string) => {
        reject(JSON.parse(err));
      });
  });
}

export function postImageResi(file: any, name: string) {
  return new Promise((resolve, reject) => {
    const storage = firebase.storage();
    let storageRef = storage.ref('NSIPIC/Resi/' + name + '.jpg');
    storageRef
      .put(file)
      .then((res: any) => {
        storageRef.getDownloadURL().then(function (url: any) {
          resolve(url);
        });
      })
      .catch((err: string) => {
        reject(JSON.parse(err));
      });
  });
}

export function postPDF(file: any, name: string) {
  return new Promise((resolve, reject) => {
    const storage = firebase.storage();
    let storageRef = storage.ref('NSIPIC/OkPDF/' + name + '.pdf');
    storageRef
      .put(file)
      .then((res: any) => {
        storageRef.getDownloadURL().then(function (url: any) {
          resolve(url);
        });
      })
      .catch((err: string) => {
        reject(JSON.parse(err));
      });
  });
}

export function postKwitansiPDF(file: any, name: string) {
  return new Promise((resolve, reject) => {
    const storage = firebase.storage();
    let storageRef = storage.ref('NSIPIC/KwitansiPDF/' + name + '.pdf');
    storageRef
      .put(file)
      .then((res: any) => {
        storageRef.getDownloadURL().then(function (url: any) {
          resolve(url);
        });
      })
      .catch((err: string) => {
        reject(JSON.parse(err));
      });
  });
}

export function deleteImage(name: string) {
  return new Promise((resolve, reject) => {
    let storage = firebase.storage();
    let storageRef = storage.ref();
    let desertRef = storageRef.child(`NSIPIC/BuktiBayar/${name}.jpg`);
    desertRef
      .delete()
      .then(function () {})
      .catch(function (error: any) {
        reject(error);
      });
  });
}

export function deletePDF(name: string) {
  return new Promise((resolve, reject) => {
    let storage = firebase.storage();
    let storageRef = storage.ref();
    let desertRef = storageRef.child(`NSIPIC/InvoicePDF/${name}.pdf`);
    desertRef
      .delete()
      .then(function () {})
      .catch(function (error: any) {
        reject(error);
      });
  });
}

export function getImage(file: string) {
  // console.log(file);
  return new Promise((resolve, reject) => {
    const storage = firebase.storage();
    let storageRef = storage.ref('NSIPIC/BuktiBayar/' + file + '.jpg');

    storageRef
      .getDownloadURL()
      .then(function (url: string | URL) {
        // console.log('ini url', url)
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = async () => {
          let data = await convertBase64(xhr.response);
          const file = dataURLtoFile(data);
          const res = await resizeFile(file);
          resolve(res);
        };
        xhr.open('GET', url);
        xhr.send();
        // resolve(url);
      })
      .catch((err: { customData: { serverResponse: string } }) => {
        reject(JSON.parse(err.customData.serverResponse).error);
      });
  });
}

export function getImageResi(file: string) {
  // console.log(file);
  return new Promise((resolve, reject) => {
    const storage = firebase.storage();
    let storageRef = storage.ref('NSIPIC/Resi/' + file + '.jpg');

    storageRef
      .getDownloadURL()
      .then(function (url: string | URL) {
        // console.log('ini url', url)
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = async () => {
          let data = await convertBase64(xhr.response);
          const file = dataURLtoFile(data);
          const res = await resizeFile(file);
          resolve(res);
        };
        xhr.open('GET', url);
        xhr.send();
        // resolve(url);
      })
      .catch((err: { customData: { serverResponse: string } }) => {
        reject(JSON.parse(err.customData.serverResponse).error);
      });
  });
}

export const getallimages = async () => {
  const storage = firebase.storage();
  let storageRef = storage.ref('NSIPIC/BuktiBayar');
  let result = await storageRef.listAll();
  let urlPromises = result.items.map((imageRef) => imageRef.getDownloadURL());

  return Promise.all(urlPromises);
};

export function fetchImages(link: string | URL) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = async () => {
      let data = await convertBase64(xhr.response);
      const file = dataURLtoFile(data);
      const res = await resizeFile(file);
      resolve(res);
    };
    xhr.open('GET', link);
    xhr.send();
  });
}

export function getImageUrl(file: string) {
  // console.log(file);
  return new Promise((resolve, reject) => {
    const storage = firebase.storage();
    let storageRef = storage.ref('NSIPIC/BuktiBayar/' + file + '.jpg');
    storageRef
      .getDownloadURL()
      .then(function (url: any) {
        // console.log('ini url', url)
        resolve(url);
      })
      .catch((err: { customData: { serverResponse: string } }) => {
        reject(JSON.parse(err.customData.serverResponse).error);
      });
  });
}

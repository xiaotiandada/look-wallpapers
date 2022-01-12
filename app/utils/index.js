import wallpaper from 'wallpaper';
import path from 'path';
import os from 'os';
import axios from 'axios';
import util from 'util';
import fs from 'fs';
import storage from 'electron-json-storage';
import { KEY_STORAGE_SAVE_PATH } from '../config';

/**
 * storage Get
 * @returns {Promise<unknown>}
 */
export const storageGet = key => new Promise((resolve, reject) => {
  storage.get(key, (error, data) => {
    if (error) {
      reject(error);
    }

    console.log(data);
    resolve(data);
  });
});

/**
 * storage Set
 * @param data
 * @returns {Promise<unknown>}
 */
export const storageSet = (key, data) => new Promise((resolve, reject) => {
  storage.set(key, data, (error) => {
    if (error) {
      reject(error);
    }
    resolve('success');
  });
});


// const handleDownload = () => {
//   setDownloadLoading(true);
//   axios.get(photoData.getIn(['links', 'download']), { responseType: 'arraybuffer' })
//     .then(({ data }) => {
//       const base64Image = new Buffer.from(data, 'binary').toString(
//         'base64',
//       );
//       let picturePath = path.join(
//         os.homedir(),
//         '/Downloads',
//         `unsplash-${photoData.get('id')}.png`,
//       );
//       picturePath = path.normalize(picturePath);
//       fs.writeFile(picturePath, base64Image, 'base64', () => {
//         setDownloadLoading(false);
//         new Notification('Download Completed!', {
//           body: `Image saved in "${os.homedir()}/Downloads"`,
//           icon: path.join(__dirname, '../resources/icons/64x64.png'),
//         });
//       });
//     })
//     .catch(() => {
//       setDownloadLoading(false);
//       new Notification('Download Failed!', {
//         body: 'network connection error...',
//         icon: path.join(__dirname, '../resources/icons/64x64.png'),
//       });
//     });
// };


/**
 * default Save Path
 * @returns {string}
 */
export const defaultSavePath = () => {
  const outputLocationPath = path.join(
    os.homedir(),
    '/Pictures',
  );

  return outputLocationPath;
};

/**
 * images Save Path
 * @returns {Promise<string|*>}
 */
export const imagesSavePath = async () => {
  const savePathData = await storageGet(KEY_STORAGE_SAVE_PATH);
  if (savePathData && savePathData.path) {
    return savePathData.path;
  }
  return defaultSavePath();
};

/**
 * modify Save Path
 * @param url
 * @returns {Promise<void>}
 */
export const modifySavePath = async (url) => {
  await storageSet(KEY_STORAGE_SAVE_PATH, { path: url });
};

/**
 * download image
 */
export const downloadImage = async ({
  name,
  url,
}) => {
  // path
  const imagePath = await imagesSavePath();
  const outputLocationPath = path.join(
    imagePath,
    name,
  );

  console.log('outputLocationPath', outputLocationPath);

  // download
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
  });

  const base64Image = new Buffer.from(
    response.data,
    'binary',
  ).toString('base64');
  await util.promisify(fs.writeFile)(outputLocationPath, base64Image, 'base64');

  return outputLocationPath;
};
/**
 * download wallpaper
 */
export const downloadWallpaper = async ({
  name,
  url,
}) => {
  await downloadImage({ name, url });
  console.log('download wallpaper success');
};

/**
 * set wallpaper
 */
export const setWallpaper = async ({
  name,
  url,
}) => {
  const imagePath = await downloadImage({ name, url });
  await wallpaper.set(imagePath, { scale: 'auto' });
  console.log('set wallpaper success');
};

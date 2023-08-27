import Taro from '@tarojs/taro';
import { USER_TOKEN_KEY } from '~/constants/storage';

const compressImg = (fileList: string[]) =>
  Promise.all(
    fileList.map(
      (filePath) =>
        new Promise((resolve) => {
          Taro.compressImage({
            src: filePath,
            quality: 50,
            success(tempFilePath) {
              resolve(tempFilePath.tempFilePath);
            },
          });
        })
    )
  ) as Promise<string[]>;

export const uploadImgList = async (fileList: string[]) => {
  const compressList = await compressImg(fileList);
  return Promise.all(
    compressList.map(
      (filePath) =>
        new Promise((resolve) => {
          Taro.uploadFile({
            url: `${API_BASE_URL}/upload`,
            filePath,
            header: {
              'content-type': 'multipart/form-data',
              token: Taro.getStorageSync(USER_TOKEN_KEY),
            },
            name: 'file',
            success(res) {
              const data = JSON.parse(res.data);
              resolve(data);
            },
          });
        })
    )
  );
};

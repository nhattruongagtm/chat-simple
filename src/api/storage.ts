import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

export const uploadMedia = (
  uid: string,
  idMessage: string,
  data: File[]
): Promise<string[]> => {
  let urls: string[] = [];
  return new Promise((resolve, reject) => {
    data.forEach((item, index) => {
      const path = `${idMessage}/${idMessage + uid + Date.now() + index}.png`;
      const mediaRef = ref(storage, path);
      uploadBytes(mediaRef, item)
        .then((snapshot) => {
          if (snapshot) {
            //   get url
            getDownloadURL(ref(storage, path))
              .then((url) => {
                urls.push(url);

                if (urls.length === data.length) {
                  resolve(urls);
                }
              })
              .catch((e) => {
                console.log(e);
                reject(e);
              });
          }
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  });
};

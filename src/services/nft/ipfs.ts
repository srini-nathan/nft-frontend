import pinataSDK from "@pinata/sdk";
import axios from "axios";
import fs from 'fs'
import { MetadataJson } from "../../types/metadata";

export const PINATA_BASE_GATEWAY_URL = "https://gateway.pinata.cloud/ipfs/";

export const pinFileToIPFS = (file: File) => {
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

  // we gather a local file for this example, but any valid readStream source will work here.
  const data = new FormData();
  data.append("file", file);

  return axios.post(url, data, {
    maxContentLength: Infinity, // this is needed to prevent axios from erroring out with large files
    headers: {
      "Content-Type": "multipart/form-data;",
      pinata_api_key: process.env.REACT_APP_PINATA_API_KEY!,
      pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET!,
    },
  });
};

interface pinJSONToIPFSInterface {
  name: string;
  description?: string;
  image: string;
}

export const pinJSONToIPFS = (JSONBody: pinJSONToIPFSInterface) => {
  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
  return axios.post(url, JSONBody, {
    headers: {
      pinata_api_key: process.env.REACT_APP_PINATA_API_KEY_JSON!,
      pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET_JSON!,
    },
  });
};

export const fetchMetaDataJson = async (
  ipfsHash: string
): Promise<MetadataJson> => {
  const res = await fetch(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);
  return res.json();
};



// export async function upload(file: Buffer, filename: string) {
//   const { Readable } = Stream;
//   const readableStreamForFile = Readable.from(file);

//   // Fixes upload issue: https://github.com/PinataCloud/Pinata-SDK/issues/28
//   // ¡¡ THE HACK !!
//   (readableStreamForFile as any).path = filename;
//   const r = await pinata.pinFileToIPFS(readableStreamForFile, {
//     pinataOptions: {
//       cidVersion: 0,
//     },
//   });
//   return r.IpfsHash;
// }

// export async function uploadAvatar(avatar: Buffer, filename: string) {
//   // First, validate we are uploading something that is probably right.
//   // if (!await validateImage(avatar, signature))
//   //   return null;
//   return upload(avatar, filename);
// }

export const createImage = (file: File): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      resolve(image);
    };

    image.onerror = (e) => {
      reject(e);
    };

    image.src = url;
  });

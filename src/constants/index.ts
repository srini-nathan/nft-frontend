export const ACTIVE_NETWORK = 1;
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const INFURA_ID = "";

export const LG_FILE_UPLOAD_TYPES_TEXT =
  'PNG, GIF, JPG, WEBP, or MP4. Max 30 MB.';

export const LG_FILE_UPLOAD_TYPES = {
  "image/png": true,
  "image/jpg": true,
  "image/jpeg": true,
  "image/gif": true,
  "image/webp": true,
  "video/mp4": true,
  "audio/mpeg": false,
  "audio/mp3": false,
};

export const LG_FILE_SIZE_UPLOAD_LIMIT = 30 * 1000000; // 30 MB
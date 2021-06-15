import { parse } from "uuid";

export const convertGuidToInt = (uuid: string) => {
    // parse accountId into Uint8Array[16] variable
    let parsedUuid = parse(uuid);
    console.log(`uuid ${uuid} parsed successfully`);
  
    // convert to integer - see answers to https://stackoverflow.com/q/39346517/2860309
    let buffer = Buffer.from(parsedUuid);
    console.log(`parsed uuid converted to buffer`);
    let result = buffer.readUInt32BE(0);
    console.log(`buffer converted to integer ${result} successfully`);
  
    return result;
  };
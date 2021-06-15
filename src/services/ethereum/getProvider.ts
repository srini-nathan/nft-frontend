import { ethers } from "ethers";
import { Web3Provider, JsonRpcProvider } from "@ethersproject/providers";
import { RPC_URLS } from "../../lib/connectors";

export const getProvider = (chainId: number) => {
  let provider: Web3Provider | JsonRpcProvider;

  if (
    typeof window !== "undefined" &&
    typeof (window as any).ethereum !== "undefined"
  ) {
    provider = new ethers.providers.Web3Provider((window as any).ethereum);
  } else {
    provider = new ethers.providers.JsonRpcProvider(RPC_URLS[chainId]);
  }

  return provider;
};

export const getSignerAddress = async (chainId: number) => {
  const provider = getProvider(chainId);
  try {
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    console.log(signerAddress);
    
    return signerAddress;
  } catch (err) {
    console.log(err.message);
  }
};

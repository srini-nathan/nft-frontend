import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { getInfuraUrl } from "../../services/contracts/contractConnector";

export const GetCurrentInfuraURL = () => {
  const walletContext = useWeb3React<Web3Provider>();
  const { chainId } = walletContext;
  return (chainId && getInfuraUrl(chainId!)) ?? "";
};

export const GetBaseEtherscanURL = () => {
  const walletContext = useWeb3React<Web3Provider>();
  const { chainId } = walletContext;
  if (chainId === 3) {
    return "https://ropsten.etherscan.io/";
  }

  if (chainId === 1) {
    return "https://etherscan.io/";
  }

  return "";
};

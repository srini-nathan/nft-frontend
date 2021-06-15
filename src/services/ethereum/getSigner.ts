import { ethers } from "ethers";

export const getSigner = ({
  provider,
  account,
}: {
  provider: 0 | ethers.providers.JsonRpcProvider | undefined;
  account: string;
}) => {
  return provider && provider.getSigner(account);
};

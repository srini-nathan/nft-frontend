import { BigNumber, BigNumberish, ethers } from "ethers";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useFetchMyNFT } from "../../../lib/hooks/useFetchMyNFT";
import { useUpdateWalletAddress } from "../../../lib/hooks/useUpdateWalletAddress";
import { getProvider } from "../../../services/ethereum/getProvider";
import { ModalTemplate } from "../../Modal/ModalTemplate";

export const MinterRoleAccessContainer = ({
  accountAddress,
  chainId,
  nftId,
  ipfsHash,
}: {
  accountAddress: string;
  chainId: number | undefined;
  ipfsHash: string;
  nftId: string;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentBalance, setCurrentBalance] = useState<BigNumberish | null | 0>(
    0
  );
  const { data, updateWalletAddress } = useUpdateWalletAddress();
  const { nFTData } = useFetchMyNFT();
  const nftDataByFilter = nFTData.find((x) => x.ipfsHash === ipfsHash);

  useEffect(() => {
    async function fetchBalance() {
      const balance: BigNumberish =
        (chainId && (await getProvider(chainId).getBalance(accountAddress))) ??
        0;
      setCurrentBalance(balance);
    }
    fetchBalance();
  }, [chainId, accountAddress, getProvider]);

  const bal = ethers.utils.formatUnits(currentBalance ?? 0, "ether");

  const onHide = () => setShowModal(false);

  useEffect(() => {
    if (data) onHide();
  }, [data]);

  const updateUserWalletAddress = async () => {
    await updateWalletAddress({
      nftId,
      ipfsHash,
      walletAddress: accountAddress,
    });
  };

  const walletAddressUpdated: boolean =
    nftDataByFilter?.walletAddress !== ethers.constants.AddressZero ?? false;
  return (
    <>
      <ModalTemplate name="Request Access" show={showModal} onHide={onHide}>
        {!walletAddressUpdated ? (
          <Card className="border-0">
            <Card.Body>
              <u>Account</u> <b>{accountAddress}</b>
              <h4>{Number(bal).toFixed(4)} ETH</h4>
            </Card.Body>
            <Card.Footer>
              <button
                type="button"
                className="btn btn-dark"
                onClick={updateUserWalletAddress}
              >
                Update
              </button>
            </Card.Footer>
          </Card>
        ) : (
          <h3>Access Requested Please Wait!!</h3>
        )}
      </ModalTemplate>
      <button
        type="button"
        className="btn btn-dark"
        onClick={() => setShowModal(true)}
      >
        request access to Mint
      </button>
    </>
  );
};

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Jumbotron } from "react-bootstrap";
import { useParams } from "react-router-dom";
import shortenHex from "../../components/common/shortenHex";
import Header from "../../components/Header";
import Meta from "../../components/Meta";
import { MakePatent } from "../../components/NFT/MakePatent";

export const MyCollectables = () => {
  const { owner, id, assetIndexHash } =
    useParams<{ owner: string; id: string; assetIndexHash: string }>();
  const walletContext = useWeb3React<Web3Provider>();
  const { account, chainId } = walletContext;
  let indexHash = assetIndexHash ?? "";

  const pageTitle =  "My Collectables";
  const pageDescription = account && shortenHex(account ?? "");
  return (
    <>
      <Meta title={pageTitle} />
      <Header head={pageTitle} description={pageDescription ?? ""} />

      <Jumbotron fluid>
        <MakePatent
          chainId={chainId}
          account={account!}
          assetIndexHash={indexHash}
          owner={owner}
          id={id}
        />
      </Jumbotron>
    </>
  );
};

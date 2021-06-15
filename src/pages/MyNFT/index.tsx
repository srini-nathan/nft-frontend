import { UploadItem } from "./UploadItem";
import { Container, Jumbotron } from "react-bootstrap";
import Meta from "../../components/Meta";
import Header from "../../components/Header";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import shortenHex from "../../components/common/shortenHex";

export const MyNFT = () => {
  const walletContext = useWeb3React<Web3Provider>();
  const { account, chainId } = walletContext;
  
  const pageTitle = "My NFT";
  const pageDescription = account && shortenHex(account ?? "");

  return (
    <>
      <Container>
        <Meta title={pageTitle} />
        <Header head={pageTitle} description={pageDescription ?? ""} />
      </Container>
      <Jumbotron>
        <UploadItem chainId={chainId}/>
      </Jumbotron>
    </>
  );
};

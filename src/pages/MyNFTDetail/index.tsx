import { Container, Jumbotron } from "react-bootstrap";
import Meta from "../../components/Meta";
import Header from "../../components/Header";
import { NFTDetail } from "../../components/NFT/NFTDetail";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import shortenHex from "../../components/common/shortenHex";
export const MyNFTDetail = () => {
  const walletContext = useWeb3React<Web3Provider>();
  const { account } = walletContext;

  const pageTitle = "My NFT Detail";
  const pageDescription = account && shortenHex(account ?? "");

  return (
    <>
      <Container>
        <Meta title={pageTitle} />
        <Header head={pageTitle} description={pageDescription ?? ""} />
      </Container>

      <NFTDetail />
    </>
  );
};

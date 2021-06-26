import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import React from "react";
import { Jumbotron } from "react-bootstrap";
import shortenHex from "../components/common/shortenHex";
import Header from "../components/Header";
import Meta from "../components/Meta";
import { AssetOnSale } from "../components/NFT/AssetOnSale";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const walletContext = useWeb3React<Web3Provider>();
  const { account } = walletContext;

  const pageTitle = "Turn Your Creative Ideas Into Patent";
  const pageDescription = account && shortenHex(account ?? "");

  return (
    <>
      <>
        <Meta title={pageTitle} />
        <Header head={pageTitle} description={pageDescription ?? ""} />
      </>
      <Jumbotron>
        <AssetOnSale account={account!}/>
      </Jumbotron>
    </>
  );
};

export default Home;

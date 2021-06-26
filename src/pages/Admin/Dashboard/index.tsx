import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Container, Jumbotron } from "react-bootstrap";
import Meta from "../../../components/Meta";
import Header from "../../../components/Header";
import { AdminLayout } from "../../../components/Admin/AdminLayout";
import shortenHex from "../../../components/common/shortenHex";

export const Dashboard = () => {
  const walletContext = useWeb3React<Web3Provider>();
  const { account } = walletContext;

  const pageTitle = "Admin";
  const pageDescription = account && shortenHex(account ?? "");

  return (
    <>
      <Container>
        <Meta title={pageTitle} />
        <Header head={pageTitle} description={pageDescription ?? ""} />
      </Container>
      <Jumbotron fluid>
        <AdminLayout />
      </Jumbotron>
    </>
  );
};

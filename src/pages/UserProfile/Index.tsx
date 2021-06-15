import { InviteUser } from "./InviteUser";
import {Container, Jumbotron } from "react-bootstrap";
import Header from "../../components/Header";
import Meta from "../../components/Meta";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import shortenHex from "../../components/common/shortenHex";
import { Spinner } from "../../components/common/spinner";
import { EmailTemplate } from "./EmailTemplate";
import useCurrentUser from "../../lib/hooks/useCurrentUser";
import { PasswordResetContainer } from "../../components/ResetPassword/PasswordResetContainer";

export const UserProfile = () => {
  const walletContext = useWeb3React<Web3Provider>();
  const { account } = walletContext;

  const { data, loading } = useCurrentUser();

  if (loading) return <Spinner size={30} />;
  const email = data?.me?.email;

  const pageTitle = "My Profile";
  const pageDescription = account && shortenHex(account ?? "");

  return (
    <>
      <Container>
        <Meta title={pageTitle} />
        <Header head={pageTitle} description={pageDescription ?? ""} />
      </Container>
      <Jumbotron>
        <EmailTemplate email={email ?? ""} />
        <hr/>
        <InviteUser />
        <hr/>
        <PasswordResetContainer />
      </Jumbotron>
    </>
  );
};

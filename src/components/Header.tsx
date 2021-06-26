import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useEagerConnect } from "../lib/hooks/provider-hooks";
import useNotification from "../lib/hooks/useNotification";
import { useChainSelector } from "../lib/providers/ChainSelectorProvider";
import ConnectToWallet from "./ConnectToWallet/ConnectToWallet";
import { ModalTemplate } from "./Modal/ModalTemplate";
import NotificationDrawer from "./NotificationDrawer/NotificationDrawer";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";


const Header = ({
  head,
  description,
}: {
  head: string;
  description: string;
}) => {
  const [isWalletOverlayOpen, setIsWalletOverlayOpen] = useState(false);
  const [show, setShow] = useState(false);

  //- Wallet Data
  const walletContext = useWeb3React<Web3Provider>();
  const { active, chainId } = walletContext;
  const { addNotification } = useNotification();
  const triedEagerConnect = useEagerConnect(); // This line will try auto-connect to the last wallet

  //- Chain Selection (@todo: refactor to provider)
  const chainSelector = useChainSelector();
  React.useEffect(() => {
    if (chainId && chainSelector.selectedChain !== chainId) {
      chainSelector.selectChain(chainId);
    }
  }, [chainId, chainSelector]);

  useEffect(() => {
    if (triedEagerConnect)
      addNotification(active ? "Wallet connected." : "Wallet disconnected.");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const closeWalletOptionModal = () => {
    setIsWalletOverlayOpen(false);
    setShow(false);
  };

  const openWalletOptionModal = () => {
    setShow(true);
    setIsWalletOverlayOpen(true);
  };

  return (
    <>
      <NotificationDrawer />
      <ReactNotification />
      <ModalTemplate
        show={show}
        name="Choose Wallet"
        onHide={closeWalletOptionModal}
      >
        {isWalletOverlayOpen && (
          <ConnectToWallet onConnect={closeWalletOptionModal} />
        )}
      </ModalTemplate>

      <Container fluid>
        <div className="starter-template text-center">
          <h1>{head}</h1>
          <span className="lead text-capitalize">
            <div className="d-flex justify-content-between">
              {!active && (
                <Button onClick={openWalletOptionModal} variant="success">
                  Connect To Wallet
                </Button>
              )}
              {description}
              {active && (
                <Button onClick={openWalletOptionModal} variant="success">
                  Disconnect Wallet
                </Button>
              )}
            </div>
          </span>
          <hr />
        </div>
      </Container>
    </>
  );
};

export default Header;

import { InjectedConnector as MetaMask } from '@web3-react/injected-connector';
import { NetworkConnector as Network } from '@web3-react/network-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const POLLING_INTERVAL = 12000;
export const RPC_URLS: { [chainId: number]: string } = {
	1: process.env.REACT_APP_RPC_URL_1 as string,
	3: process.env.REACT_APP_RPC_URL_3 as string,
};

export const injected = new MetaMask({
	supportedChainIds: [1, 3],
});

export const network = new Network({
	urls: { 1: RPC_URLS[1], 3: RPC_URLS[3] },
	defaultChainId: 1,
});

export const createWalletConnectConnector = () => {
	return new WalletConnectConnector({
		rpc: { 1: RPC_URLS[1], 3: RPC_URLS[3] },
		bridge: 'https://bridge.walletconnect.org',
		qrcode: true,
		pollingInterval: POLLING_INTERVAL,
		supportedChainIds: [1, 3],
	});
};
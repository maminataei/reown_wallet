/**
 * @desc Refference list of eip155 chains
 * @url https://chainlist.org
 */

/**
 * Types
 */
export type TEIP155Chain = keyof typeof EIP155_CHAINS;

export type EIP155Chain = {
  chainId: number;
  name: string;
  logo: string;
  rgb: string;
  rpc: string;
  namespace: string;
  smartAccountEnabled?: boolean;
};
const blockchainApiRpc = (chainId: number) => {
  return `https://rpc.walletconnect.org/v1?chainId=eip155:${chainId}&projectId=${process.env.NEXT_PUBLIC_PROJECT_ID}`;
};
/**
 * Chains
 */
export const EIP155_MAINNET_CHAINS: Record<string, EIP155Chain> = {
  'eip155:1': {
    chainId: 1,
    name: 'Ethereum',
    logo: '/chain-logos/eip155-1.png',
    rgb: '99, 125, 234',
    rpc: blockchainApiRpc(1),
    namespace: 'eip155',
  },
};

export const EIP155_TEST_CHAINS: Record<string, EIP155Chain> = {
  'eip155:5': {
    chainId: 5,
    name: 'Ethereum Goerli',
    logo: '/chain-logos/eip155-1.png',
    rgb: '99, 125, 234',
    rpc: blockchainApiRpc(5),
    namespace: 'eip155',
    smartAccountEnabled: true,
  },
  'eip155:11155111': {
    chainId: 11155111,
    name: 'Ethereum Sepolia',
    logo: '/chain-logos/eip155-1.png',
    rgb: '99, 125, 234',
    rpc: blockchainApiRpc(11155111),
    namespace: 'eip155',
    smartAccountEnabled: true,
  },
};

export const EIP155_CHAINS = { ...EIP155_MAINNET_CHAINS, ...EIP155_TEST_CHAINS };

/**
 * Methods
 */
export const EIP155_SIGNING_METHODS = {
  PERSONAL_SIGN: 'personal_sign',
  ETH_SIGN: 'eth_sign',
  ETH_SIGN_TRANSACTION: 'eth_signTransaction',
  ETH_SIGN_TYPED_DATA: 'eth_signTypedData',
  ETH_SIGN_TYPED_DATA_V3: 'eth_signTypedData_v3',
  ETH_SIGN_TYPED_DATA_V4: 'eth_signTypedData_v4',
  ETH_SEND_RAW_TRANSACTION: 'eth_sendRawTransaction',
  ETH_SEND_TRANSACTION: 'eth_sendTransaction',
  WALLET_CHECKOUT: 'wallet_checkout',
};

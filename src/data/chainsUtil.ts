import * as viemChains from 'viem/chains';
import { EIP155_CHAINS } from './etherData';

export const ALL_CHAINS = {
  ...EIP155_CHAINS,
};

export function getChainData(chainId?: string) {
  if (!chainId) return;
  const [namespace, reference] = chainId.toString().split(':');
  return Object.values(ALL_CHAINS).find((chain) => String(chain.chainId) == reference && chain.namespace === namespace);
}

export function getViemChain(id: number) {
  const chains = Object.values(viemChains) as viemChains.Chain[];

  return chains.find((x) => x.id === id);
}

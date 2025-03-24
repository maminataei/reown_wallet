import { createOrRestoreEIP155Wallet } from '../utils/wallets/etherWalletUtil';
import { createWalletKit, walletkit } from '../utils/wallets/walletConnectUtil';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSnapshot } from 'valtio';
import SettingsStore from '../store/SettingsStore';

const useInit = () => {
  const [initialized, setInitialized] = useState(false);
  const prevRelayerURLValue = useRef<string>('');

  const { relayerRegionURL } = useSnapshot(SettingsStore.state);

  const onInitialize = useCallback(async () => {
    try {
      const { eip155Addresses } = createOrRestoreEIP155Wallet();

      SettingsStore.setEIP155Address(eip155Addresses[0]);
      await createWalletKit(relayerRegionURL);
      setInitialized(true);
    } catch (err: unknown) {
      console.error('Initialization failed', err);
      alert(err);
    }
  }, [relayerRegionURL]);

  // restart transport if relayer region changes
  const onRelayerRegionChange = useCallback(() => {
    try {
      walletkit?.core?.relayer.restartTransport(relayerRegionURL);
      prevRelayerURLValue.current = relayerRegionURL;
    } catch (err: unknown) {
      alert(err);
    }
  }, [relayerRegionURL]);

  useEffect(() => {
    if (!initialized) {
      onInitialize();
    }
    if (prevRelayerURLValue.current !== relayerRegionURL) {
      onRelayerRegionChange();
    }
  }, [initialized, onInitialize, relayerRegionURL, onRelayerRegionChange]);

  return initialized;
};

export default useInit;

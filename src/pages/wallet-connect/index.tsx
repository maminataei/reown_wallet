import toast from 'react-hot-toast';
import useInit from '../../hooks/useInit';
import useWalletConnectEventsManager from '../../hooks/useWalletConnectEventManager';
import { walletkit } from '../../utils/wallets/walletConnectUtil';
import { useEffect } from 'react';
import { RELAYER_EVENTS } from '@walletconnect/core';
const WalletConnect = () => {
  // Step 1 - Initialize wallets and wallet connect client
  const initialized = useInit();
  // wallet connect event manager
  useWalletConnectEventsManager(initialized);

  useEffect(() => {
    if (!initialized) return;
    walletkit?.core.relayer.on(RELAYER_EVENTS.connect, () => {
      toast.success('Network connection is restored!');
    });

    walletkit?.core.relayer.on(RELAYER_EVENTS.disconnect, () => {
      toast.error('Network connection lost.');
    });
  }, [initialized]);

  return <div>WalletConnect</div>;
};

export default WalletConnect;

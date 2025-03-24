import SettingsStore from '../store/SettingsStore';
import { walletkit } from '../utils/wallets/walletConnectUtil';

export function refreshSessionsList() {
  if (!walletkit) return;
  SettingsStore.setSessions(Object.values(walletkit.getActiveSessions()));
}

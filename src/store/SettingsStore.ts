import { SessionTypes, Verify } from '@walletconnect/types';
import { proxy } from 'valtio';

const MODULE_MANAGEMENT_ENABLED_KEY = 'MODULE_MANAGEMENT';

/**
 * Types
 */
interface State {
  testNets: boolean;
  account: number;
  eip155Address: string;
  relayerRegionURL: string;
  activeChainId: string;
  currentRequestVerifyContext?: Verify.Context;
  sessions: SessionTypes.Struct[];
  moduleManagementEnabled: boolean;
}

/**
 * State
 */
const state = proxy<State>({
  testNets: true,
  account: 0,
  activeChainId: '1',
  eip155Address: '',
  relayerRegionURL: '',
  sessions: [],
  moduleManagementEnabled:
    typeof localStorage !== 'undefined' ? Boolean(localStorage.getItem(MODULE_MANAGEMENT_ENABLED_KEY)) : false,
});

/**
 * Store / Actions
 */
const SettingsStore = {
  state,

  setAccount(value: number) {
    state.account = value;
  },

  setEIP155Address(eip155Address: string) {
    state.eip155Address = eip155Address;
  },

  setRelayerRegionURL(relayerRegionURL: string) {
    state.relayerRegionURL = relayerRegionURL;
  },

  setActiveChainId(value: string) {
    state.activeChainId = value;
  },

  setCurrentRequestVerifyContext(context: Verify.Context) {
    state.currentRequestVerifyContext = context;
  },
  setSessions(sessions: SessionTypes.Struct[]) {
    state.sessions = sessions;
  },

  toggleModuleManagement() {
    state.moduleManagementEnabled = !state.moduleManagementEnabled;
    if (state.moduleManagementEnabled) {
      localStorage.setItem(MODULE_MANAGEMENT_ENABLED_KEY, 'YES');
    } else {
      localStorage.removeItem(MODULE_MANAGEMENT_ENABLED_KEY);
    }
  },
};

export default SettingsStore;

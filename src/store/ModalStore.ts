import { SessionTypes, SignClientTypes } from '@walletconnect/types';
import { proxy, subscribe } from 'valtio';

/**
 * Types
 */
interface ModalData {
  proposal?: SignClientTypes.EventArguments['session_proposal'];
  requestEvent?: SignClientTypes.EventArguments['session_request'];
  requestSession?: SessionTypes.Struct;
  loadingMessage?: string;
  authRequest?: SignClientTypes.EventArguments['session_authenticate'];
}

interface State {
  open: boolean;
  view?:
    | 'SessionProposalModal'
    | 'SessionSignModal'
    | 'SessionSignTypedDataModal'
    | 'SessionSendTransactionModal'
    | 'SessionGrantPermissionsModal'
    | 'SessionSendCallsModal'
    | 'SessionUnsuportedMethodModal'
    | 'SessionAuthenticateModal'
    | 'LoadingModal'
    | 'SessionCheckoutModal';
  data?: ModalData;
}

/**
 * State
 */
const state = proxy<State>({
  open: false,
});

/**
 * Store / Actions
 */
const ModalStore = {
  state,

  open(view: State['view'], data: State['data'], onClose?: () => void) {
    state.view = view;
    state.data = data;
    state.open = true;
    if (!onClose) return;
    const unsubscribe = subscribe(state, () => {
      if (!state.open) {
        console.log('ModalStore: Closing modal');
        unsubscribe();
        onClose?.();
      }
    });
  },

  close() {
    state.open = false;
  },
};

export default ModalStore;

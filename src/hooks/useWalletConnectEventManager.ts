import { EIP155_SIGNING_METHODS } from '../data/etherData';
import ModalStore from '../store/ModalStore';
import SettingsStore from '../store/SettingsStore';
import WalletCheckoutCtrl from '../store/WalletCheckoutController';
import WalletCheckoutUtil from '../utils/wallets/walletCheckoutUtil';
import { walletkit } from '../utils/wallets/walletConnectUtil';
import { SignClientTypes } from '@walletconnect/types';
import { useCallback, useEffect } from 'react';
import { refreshSessionsList } from '../utils/refreshSessionsList';
export default function useWalletConnectEventsManager(initialized: boolean) {
  /******************************************************************************
   * 1. Open session proposal modal for confirmation / rejection
   *****************************************************************************/
  const onSessionProposal = useCallback((proposal: SignClientTypes.EventArguments['session_proposal']) => {
    console.log('session_proposal', proposal);
    // set the verify context so it can be displayed in the projectInfoCard
    SettingsStore.setCurrentRequestVerifyContext(proposal.verifyContext);
    ModalStore.open('SessionProposalModal', { proposal });
  }, []);

  /******************************************************************************
   * 3. Open request handling modal based on method that was used
   *****************************************************************************/
  const onSessionRequest = useCallback(async (requestEvent: SignClientTypes.EventArguments['session_request']) => {
    const { topic, params, verifyContext, id } = requestEvent;
    const { request } = params;
    const requestSession = walletkit.engine.signClient.session.get(topic);
    // set the verify context so it can be displayed in the projectInfoCard
    SettingsStore.setCurrentRequestVerifyContext(verifyContext);
    switch (request.method) {
      case EIP155_SIGNING_METHODS.ETH_SIGN:
      case EIP155_SIGNING_METHODS.PERSONAL_SIGN:
        return ModalStore.open('SessionSignModal', { requestEvent, requestSession });

      case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA:
      case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V3:
      case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V4:
        return ModalStore.open('SessionSignTypedDataModal', { requestEvent, requestSession });

      case EIP155_SIGNING_METHODS.ETH_SEND_TRANSACTION:
      case EIP155_SIGNING_METHODS.ETH_SIGN_TRANSACTION:
        return ModalStore.open('SessionSendTransactionModal', { requestEvent, requestSession });

      case 'wallet_checkout':
        try {
          await WalletCheckoutCtrl.actions.prepareFeasiblePayments(request.params[0]);
        } catch (error) {
          return await walletkit.respondSessionRequest({
            topic,
            response: WalletCheckoutUtil.formatCheckoutErrorResponse(id, error),
          });
        }
        return ModalStore.open('SessionCheckoutModal', { requestEvent, requestSession });

      default:
        return ModalStore.open('SessionUnsuportedMethodModal', { requestEvent, requestSession });
    }
  }, []);

  const onSessionAuthenticate = useCallback((authRequest: SignClientTypes.EventArguments['session_authenticate']) => {
    ModalStore.open('SessionAuthenticateModal', { authRequest });
  }, []);

  /******************************************************************************
   * Set up WalletConnect event listeners
   *****************************************************************************/
  useEffect(() => {
    if (initialized && walletkit) {
      //sign
      walletkit.on('session_proposal', onSessionProposal);
      walletkit.on('session_request', onSessionRequest);
      // Handle session ping events
      walletkit.engine.signClient.events.on('session_ping', (data: { id: number; topic: string }) =>
        console.log('ping', data)
      );

      // Handle session deletion
      walletkit.on('session_delete', (data: { id: number; topic: string }) => {
        console.log('session_delete event received', data);
        refreshSessionsList();
      });

      // Handle session authentication
      walletkit.on('session_authenticate', onSessionAuthenticate);
      // load sessions on init
      refreshSessionsList();
    }
  }, [initialized, onSessionAuthenticate, onSessionProposal, onSessionRequest]);
}

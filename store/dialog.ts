import { getterTree, mutationTree, actionTree } from 'typed-vuex';
import { Dialog, DialogResponse, ShowDialogRequest } from "~/models/dialogModels";

interface State {
  dialogs: {
    [dialogName: string]: Dialog
  }
}

export const state = ():State => ({
  dialogs: {}
});

export const getters = getterTree(state, {
  getDialogs: (state: State) => state.dialogs
});

export interface payloadDialogRequest {
  [dialogName: string]: Dialog
}

export const mutations = mutationTree(state, {
  openDialog(state: State, dialog: payloadDialogRequest) {
    state.dialogs = { ...state.dialogs, ...dialog}
  },
  deleteDialog(state: State, dialogName: string) {
    delete state.dialogs[dialogName];
  },
  setDialogInstance(state: State, payload: {
    dialogName: string,
    instanceParams: InstanceType<any>
  }) {
    state.dialogs[payload.dialogName].instanceParams = payload.instanceParams;
  },
  resolveResponse(state: State, payload: DialogResponse) {
    const dialog = state.dialogs[payload.dialogName];
    if (dialog != null) {
      dialog.resolve(payload.response);
    }
  }
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    importDialog ({ commit }, request: ShowDialogRequest):Promise<string> {
      return new Promise((resolve) => {
        const dialogName = uuid();
        request.request = request.request ?? {};
        request.request.dialogName = dialogName;

        const dialog: Dialog = {
          component: request.component,
          request: request.request,
          response: null,
          resolve: () => {}
        };
        dialog.response = new Promise(dialogResolve => {
          dialog.resolve = dialogResolve;
        });

        const dialogRequest = {
          [dialogName]: dialog
        };

        this.app.$accessor.dialog.openDialog(dialogRequest);
        resolve(dialogName);
      });
    },
  }
);

const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

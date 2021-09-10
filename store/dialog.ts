import { getterTree, mutationTree, actionTree } from 'typed-vuex';

export const DIALOG_NOT_RESPONSE = Symbol();

export interface ShowDialogRequest {
  component: () => void,
  request?: any
}

export interface DialogResponse {
  dialogName: string,
  response: any
}

export interface Dialog {
  component: () => void,
  request: any,
  response: Promise<any> | null,
  resolve: ((value: any) => void)
}

export interface State {
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

interface payloadDialogRequest {
  [dialogName: string]: Dialog
}

export const mutations = mutationTree(state, {
  openDialog(state: State, dialog: payloadDialogRequest) {
    state.dialogs = { ...state.dialogs, ...dialog}
  },
  deleteDialog(state: State, dialogName: string) {
    delete state.dialogs[dialogName];
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
        dialog.response = new Promise(res => {
          dialog.resolve = res;
        });

        const dialogRequest = {
          [dialogName]: dialog
        };

        commit('openDialog', dialogRequest);
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

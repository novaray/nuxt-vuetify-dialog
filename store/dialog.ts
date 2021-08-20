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
  readonly dialogName: string,
  component: () => void,
  request: any,
  response: Promise<any> | null,
  resolve: ((value: any) => void)
}

export interface State {
  dialogs: Array<Dialog>
}

export const state = ():State => ({
  dialogs: []
});

export const getters = getterTree(state, {
  getDialogs: (state: State) => state.dialogs
});

export const mutations = mutationTree(state, {
  openDialog(state: State, payload: Dialog) {
    state.dialogs.push(payload);
  },
  deleteDialog(state: State, dialogName: string) {
    state.dialogs = state.dialogs.filter(t => t.dialogName !== dialogName);
  },
  resolveResponse(state: State, payload: DialogResponse) {
    const dialog = state.dialogs.find(t => t.dialogName === payload.dialogName);
    if (dialog != null) {
      dialog.resolve(payload.response);
    }
  }
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    importDialog ({ commit }, request: ShowDialogRequest):Promise<Dialog> {
      return new Promise((resolve) => {
        const dialogName = uuid();
        request.request = request.request ?? {};
        request.request.dialogName = dialogName;
        const dialog: Dialog = {
          dialogName,
          component: request.component,
          request: request.request,
          response: null,
          resolve: () => {}
        };
        dialog.response = new Promise(res => {
          dialog.resolve = res;
        });

        commit('openDialog', dialog);
        resolve(dialog);
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

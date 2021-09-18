export const DIALOG_NOT_RESPONSE = Symbol();

export interface DialogInfo {
  name: string,
  dialog: Dialog
}

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
  resolve: ((value: any) => void),
  instanceParams?: InstanceType<any>
}


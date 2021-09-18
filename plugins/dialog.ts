import { NuxtAppOptions, Plugin } from '@nuxt/types';
import { DialogInfo, ShowDialogRequest } from "~/models/dialogModels";

const openDialogWaitResponse = (app: NuxtAppOptions, dialogRequest: ShowDialogRequest): Promise<any> => {
  let requestDialogName = '';
  return Promise.resolve(app.$accessor.dialog.importDialog(dialogRequest)).then((dialogName: string) => {
    return new Promise(resolve => {
      requestDialogName = dialogName;
      resolve(app.$accessor.dialog.dialogs[dialogName].response);
    })
  }).then((result: any) => {
    app.$accessor.dialog.deleteDialog(requestDialogName);
    return result;
  });
}

const openDialogThenGetInstance = (app: NuxtAppOptions, dialogRequest: ShowDialogRequest): Promise<any> => {
  return Promise.resolve(app.$accessor.dialog.importDialog(dialogRequest)).then((dialogName: string) => {
    return new Promise(resolve => {
      const dialogInfo: DialogInfo = {
        name: dialogName,
        dialog: app.$accessor.dialog.dialogs[dialogName]
      };

      resolve(dialogInfo);
    })
  });
}

const dialog: Plugin = ({ app }, inject) => {
  inject('dialog', {
    tempDialog: (request: any) => new Promise(resolve => {
      const dialog = () => import('@/components/dialogs/TempDialog.vue');
      const dialogRequest: ShowDialogRequest = {
        component: () => dialog(),
        request
      }

      openDialogWaitResponse(app, dialogRequest).then((res: any) => {
        resolve(res);
      });
    }),
    tempDialogGetInstance: (request: any) => new Promise(resolve => {
      const dialog = () => import('@/components/dialogs/TempDialog.vue');
      const dialogRequest: ShowDialogRequest = {
        component: () => dialog(),
        request
      }

      openDialogThenGetInstance(app, dialogRequest).then((res: any) => {
        resolve(res);
      });
    }),
    loremDialog: (request: any) => new Promise(resolve => {
      const dialog = () => import('@/components/dialogs/LoremDialog.vue');
      const dialogRequest: ShowDialogRequest = {
        component: () => dialog(),
        request
      }

      openDialogWaitResponse(app, dialogRequest).then((res: any) => {
        resolve(res);
      });
    })
  })
}

export default dialog;

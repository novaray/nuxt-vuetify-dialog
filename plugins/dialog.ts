import {NuxtAppOptions, Plugin} from '@nuxt/types';
import {ShowDialogRequest} from '~/store/dialog';

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

const dialog: Plugin = ({ app }, inject) => {
  inject('dialog', {
    getAllOpenDialog: () => {
      return app.$accessor.dialog.getDialogs;
    },
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

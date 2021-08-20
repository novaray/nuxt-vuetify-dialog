import {NuxtAppOptions, Plugin} from '@nuxt/types';
import {Dialog, ShowDialogRequest} from '~/store/dialog';

const openDialogWaitResponse = (app: NuxtAppOptions, dialogRequest: ShowDialogRequest): Promise<any> => {
  let dialogName = '';
  return Promise.resolve(app.$accessor.dialog.importDialog(dialogRequest)).then((result: Dialog) => {
    dialogName = result.dialogName;
    return new Promise(resolve => {
      resolve(result.response);
    })
  }).then((result: any) => {
    app.$accessor.dialog.deleteDialog(dialogName);
    return result;
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

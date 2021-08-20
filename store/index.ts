import { getAccessorType } from 'typed-vuex';

import * as dialogs from '~/store/dialog';

export const accessorType = getAccessorType({
  modules: {
    dialogs
  }
});

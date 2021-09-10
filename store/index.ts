import { getAccessorType } from 'typed-vuex';

import * as dialog from '~/store/dialog';

export const accessorType = getAccessorType({
  modules: {
    dialog
  }
});

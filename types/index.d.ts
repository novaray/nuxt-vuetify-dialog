import Vue from 'vue';  //해당 선언 없앨 시 type을 찾을 수 없음. 삭제하지 말 것.
import {accessorType} from '~/store';

declare module 'vue/types/vue' {
  // this.$myInjectedFunction inside Vue components
  interface Vue {
    $dialog: {
      getAllOpenDialog: () => any,
      tempDialog: (request: any) => Promise<any>,
      loremDialog: (request: any) => Promise<any>
    },
    $accessor: typeof accessorType
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $dialog: {
      getAllOpenDialog: () => any,
      tempDialog: Promise<any>,
      loremDialog: Promise<any>
    },
    $accessor: typeof accessorType
  }
  // nuxtContext.$myInjectedFunction
  interface Context {
    $dialog: {
      getAllOpenDialog: () => any,
      tempDialog: Promise<any>,
      loremDialog: Promise<any>
    },
    $accessor: typeof accessorType
  }
}

declare module 'vuex/types/index' {
  // this.$myInjectedFunction inside Vuex stores
  interface Store<S> {
    $dialog: {
      getAllOpenDialog: () => any,
      tempDialog: Promise<any>,
      loremDialog: Promise<any>
    },
    $accessor: typeof accessorType
  }
}

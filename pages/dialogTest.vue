<template>
  <v-row>
    <v-btn color="primary" dark @click="showTempDialogStartLoading">
      call Dialog1
    </v-btn>
    <v-btn color="primary" dark @click="showLoremDialog">
      call Dialog2
    </v-btn>
    <v-btn color="primary" dark @click="showTempDialogThenStopLoading">
      call Dialog3
    </v-btn>
  </v-row>
</template>

<script lang="ts">
import {defineComponent, ref} from '@nuxtjs/composition-api';
import { DialogInfo } from "~/models/dialogModels";
import { useAccessor } from "~/composables/useAccessor";

export default defineComponent({
  name: 'dialogTest',
  setup() {
    const accessor = ref(useAccessor());

    return {
      accessor
    };
  },
  methods: {
    showTempDialogStartLoading() {
      this.$dialog.tempDialog({num1: 1, num2: 2}).then(res => {
        console.log('vueti close', res);
      })
    },
    showLoremDialog() {
      this.$dialog.loremDialog({str1: 'a', str2: 'b'});
    },
    showTempDialogThenStopLoading() {
      let name = '';
      this.$dialog.tempDialogGetInstance({num1: 1, num2: 2}).then((dialogInfo: DialogInfo) => {
        name = dialogInfo.name;
        // 인스턴스 안의 데이터 및 함수 제어, 호출 가능
        dialogInfo.dialog.instanceParams.off();
        return new Promise(resolve => {
          resolve(dialogInfo.dialog.response);
        })
      }).then((result: any) => {
        this.accessor.dialog.deleteDialog(name);
        console.log(result);
      });
    }
  },
})
</script>

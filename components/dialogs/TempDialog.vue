<template>
  <div class="text-center">
    <v-dialog
      v-model="visible"
      width="500"
      persistent
    >
      <v-card>

        <v-card-title class="text-h5 grey lighten-2">
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>
        <v-card-text>
          {{num1}}{{num2}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="openAnother"
          >
            Open Another
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="close"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';
import {dialogDefaultPropsSetting, dialogSetting} from '~/composables/DialogSettings'

export default defineComponent({
  name: 'TempDialog',
  props: {
    dialogName: {
      type: String,
      required: true
    },
    num1: Number,
    num2: Number
  },
  setup(props) {
    const { visible, close } = dialogSetting();

    return {
      visible,
    };
  },
  methods: {
    close() {
      this.visible = false;
      // 굳이 destroy를 안 해도 된다고 판단.
      // v-if나 v-for를 통해서도 충분히 destroy가 될 뿐더러, destroy를 해버리면 닫힐 때 transition이 씹혀버림(setTimeout으로 조절은 좀.. 그래..)
      // https://kr.vuejs.org/v2/api/index.html#vm-destroy
      // https://codingexplained.com/coding/front-end/vue-js/destroying-vue-instance
      this.$accessor.dialog.resolveResponse({
        dialogName: this.dialogName,
        response: {a: this.num1, b: this.num2}
      });
    },
    openAnother() {
      this.$dialog.loremDialog({str1: 'a', str2: 'b'}).then(res => {
        console.log('lorem close', res);
      });
    },
  }
})
</script>

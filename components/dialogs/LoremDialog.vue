<template>
  <v-row>
    <v-dialog
      v-model="visible"
      max-width="290"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5">
          Lorem ipsum dolor sit amet.
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto debitis doloremque esse exercitationem maxime omnis optio, provident quae suscipit?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="openAnother">
            open another
          </v-btn>

          <v-btn color="green darken-1" text @click="close">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { defaultDialogSetting } from '~/composables/dialogSettings';

export default defineComponent({
  name: 'VuetiDialog',
  props: {
    dialogName: {
      type: String,
      required: true
    },
    str1: String,
    str2: String
  },
  setup(props) {
    const { visible, closeAndResolveResponse } = defaultDialogSetting(props.dialogName);
    return {
      visible,
      closeAndResolveResponse
    };
  },
  methods: {
    close() {
      this.visible = false;
      this.closeAndResolveResponse({ c: 3, d: 4 });
    },
    openAnother() {
      this.$dialog.tempDialog({num1: 1, num2: 2}).then(res => {
        console.log('vueti close by LoremDialog', res);
      })
    }
  }
})
</script>

<style scoped>

</style>

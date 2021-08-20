<template>
  <v-row>
    <v-btn color="primary" dark @click="showTempDialog">
      call Dialog1
    </v-btn>
    <v-btn color="primary" dark @click="showLoremDialog">
      call Dialog2
    </v-btn>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'dialogTest',
  methods: {
    showTempDialog() {
      this.$dialog.tempDialog({num1: 1, num2: 2}).then(res => {
        console.log('vueti close', res);
      })
    },
    showLoremDialog() {
      this.$dialog.loremDialog({str1: 'a', str2: 'b'});
    },
  },
})
</script>

<style scoped>

</style>

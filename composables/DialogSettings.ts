import {ref, onMounted, useStore} from '@nuxtjs/composition-api';

//타입 추론이 안 됨.. 믹스인을 해도 마찬가지로 타입추론이 안 되서 줫같음
export const dialogDefaultPropsSetting = () => ({
  dialogName: {
    type: String,
    required: true
  }
});

export const dialogSetting = () => {
  const visible = ref(false);
  const store = useStore();
  const close = () => {
    visible.value = false;
  }

  onMounted(() => {
    visible.value = true;
  });

  // console.log(store.$accessor.dialog.resolveResponse());

  return {
    visible,
    close
  };
}

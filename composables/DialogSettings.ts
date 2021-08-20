import {ref, onMounted, useStore} from '@nuxtjs/composition-api';

//타입 추론이 안 됨..
export const dialogDefaultPropsSetting = () => ({
  dialogName: {
    type: String,
    required: true
  }
});

export const dialogSetting = () => {
  const visible = ref(false);
  const store = useStore();

  onMounted(() => {
    visible.value = true;
  });

  return {
    visible,
    store
  };
}


import {ref, onMounted, useStore, getCurrentInstance} from '@nuxtjs/composition-api';

//타입 추론이 안 됨.. 믹스인을 해도 마찬가지로 타입추론이 안 됨.
export const dialogDefaultPropsSetting = () => ({
  dialogName: {
    type: String,
    required: true
  }
});

export const defaultDialogSetting = (dialogName: string) => {
  const visible = ref(false);
  const loading = ref(false);
  const store = useStore();

  const handleLoadingOn = () => {
    loading.value = true;
  }

  const handleLoadingOff = () => {
    loading.value = false;
  }

  const closeAndResolveResponse = (response: any) => {
    visible.value = false;
    store.$accessor.dialog.resolveResponse({
      dialogName,
      response: response
    });
  }

  onMounted(() => {
    visible.value = true;

    const { emit } = getCurrentInstance() as NonNullable<ReturnType<typeof getCurrentInstance>>;
    emit('switch', {
      on: handleLoadingOn,
      off: handleLoadingOff
    });
    store.$accessor.dialog.setDialogInstance({
      dialogName,
      instance: getCurrentInstance()
    });
  });

  return {
    visible,
    loading,
    closeAndResolveResponse
  };
}

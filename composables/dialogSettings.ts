import { ref, onMounted } from '@nuxtjs/composition-api';
import { useAccessor } from "~/composables/useAccessor";

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
  const accessor = ref(useAccessor());

  const handleLoadingOn = () => {
    loading.value = true;
  }

  const handleLoadingOff = () => {
    loading.value = false;
  }

  const closeAndResolveResponse = (response: any) => {
    visible.value = false;
    accessor.value.dialog.resolveResponse({
      dialogName,
      response: response
    });
  }

  onMounted(() => {
    visible.value = true;

    const instanceParams = {
      on: handleLoadingOn,
      off: handleLoadingOff
    }

    accessor.value.dialog.setDialogInstance({
      dialogName,
      instanceParams: instanceParams
    });
  });

  return {
    visible,
    loading,
    closeAndResolveResponse
  };
}

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    v-show="props.visible"
    class="loading-spinner"
  >
    <div class="spinner" />
  </div>
</template>

<style scoped lang="scss">
.loading-spinner {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}

.spinner {
  border: 16px solid $grey;
  border-top: 16px solid $blue;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

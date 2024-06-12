<script lang="ts" setup>
import { PropType, defineProps } from "vue";

type TIcon = {
  src: string;
  title: string;
  alt: string;
  callback: () => void;
};

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: Object as PropType<TIcon>,
    default: () => ({
      src: "",
      title: "",
      alt: "",
      callback: () => {
        //empty default callback no acction needed by default
      },
    }),
  },
});
</script>

<template>
  <div class="list-header pl-24">
    <h2 class="title">
      {{ props.title }}
    </h2>
    <img
      v-if="props.icon?.src"
      class="title-icon"
      :title="props.icon.title"
      :alt="props.icon.alt"
      :src="props.icon.src"
      @click="props.icon.callback"
    >
  </div>
</template>

<style scoped lang="scss">
.list-header {
  align-items: center;
  display: flex;
  border-bottom: 1px solid #ccc;
  height: 56px;
  .title {
    font-weight: $font-weight-bold;
    font-size: $font-size-small;
    margin: 0;
    &-icon {
      cursor: pointer;
    }
  }
}
</style>

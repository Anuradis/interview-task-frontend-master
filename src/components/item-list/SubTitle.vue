<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <h2 class="sub-title pl-24 pt-20 pb-10">
    {{ props.title }}
  </h2>
</template>


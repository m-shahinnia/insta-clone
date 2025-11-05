<template>
  <Card style="width: 20rem; overflow: hidden">
    <template #header>
      <img alt="user header" :src="data.img" />
    </template>
    <template #title>{{ data.name }}</template>
    <template #subtitle>Card subtitle</template>
    <template #content>
      <p class="m-0">
        {{ data.discptions }}
      </p>
    </template>
  </Card>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["data"]);
</script>

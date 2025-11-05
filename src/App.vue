<script setup>
import TheHeader from "@/components/TheHeader.vue";
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { useUserStore } from "@/stores/users.js";

const userStore = useUserStore();
onMounted(() => {
  userStore.getUser();
});
</script>

<template>
  <main>
    <TheHeader />
    <RouterView />
  </main>
</template>

<style scoped></style>

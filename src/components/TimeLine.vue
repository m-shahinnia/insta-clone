<template>
  <Container>
    <div class="bg-amber-200 flex flex-col items-center space-y-2 justify-center py-3">
      <TheCard v-for="data in data" :key="data.id" :data="data" />
    </div>
  </Container>
</template>

<script setup>
import Container from "@/layout/Container.vue";
import TheCard from "@/components/TheCard.vue";
const data = [
  {
    id: "1",
    name: "Tilor Swift",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz_MqMU3J8OAq5PXuWWsUMHwwCLt8YL-E4Pg&s",
    discptions: "i have anons ment in April",
  },
  {
    id: "2",
    name: " Van gogh",
    img: "https://www.vangoghmuseum.nl/assets/f9a7a187-484e-4821-b84a-79c836109029?w=1280&h=720&c=12f8ae08a908d9261f58a6bb1bfaa67e8daf061b56752678819c8c241a881bbe",
    discptions: "Stray night is my best Paint",
  },
];
</script>

<style></style>

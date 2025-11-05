<template>
  <div class="bg-red-100 px-2 py-2">
    <div class="grid grid-cols-3 gap-3 p-0 m-0">
      <!-- <img v-for="post in posts" :key="post.id" :src="`https://xkzzfoqtqnphbpvkmlsg.supabase.co/storage/v1/object/public/images/${post.url}`" />
        -->
      <img
        v-for="post in posts"
        :key="post.id"
        :src="`https://xkzzfoqtqnphbpvkmlsg.supabase.co/storage/v1/object/public/images/${post.url}`"
        class="w-70 h-60" />
    </div>
  </div>
  <!-- <div class="flex gap-4 bg-amber-500"></div> -->
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps(["posts"]);
</script>

<style></style>

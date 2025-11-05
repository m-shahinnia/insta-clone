<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import Container from "@/layout/Container.vue";
import AuthModal from "@/components/AuthModal.vue";
import { useUserStore } from "@/stores/users.js";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user, isLoadingBtn } = storeToRefs(userStore);

const router = useRouter();

const username = ref("");
const isAthnenticated = ref(false);

const handleLogout = async () => {
  await userStore.handleLogout();
};

const goToUserProfile = () => {
  router.push({
    name: "ProfileViews",
    params: {
      user: user.value.username,
    },
  });
};
const toggle = () => {
  if (username.value) {
    router.push({
      name: "ProfileViews",
      params: {
        user: username.value,
      },
    });
    username.value = "";
  }
};
</script>

<template>
  <nav class="h-12 bg-black flex items-center">
    <Container>
      <div class="flex w-full justify-between items-center">
        <div class="flex items-center gap-4">
          <router-link to="/" class="text-white">Instageam</router-link>
          <InputGroup class="h-8">
            <InputText placeholder="UserName" v-model="username" />
            <InputGroupAddon>
              <Button icon="pi pi-search" severity="secondary" variant="text" @click="toggle" />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div v-if="!isLoadingBtn">
          <div v-if="!user" class="flex gap-2 h-8">
            <AuthModal :modelIsLogIn="false" />
            <AuthModal :modelIsLogIn="true" />
          </div>
          <div v-else class="flex gap-2 h-8">
            <Button label="Profile" @click="goToUserProfile" />
            <Button label="Log Out" @click="handleLogout" />
          </div>
        </div>
      </div>
    </Container>
  </nav>
</template>

<style scoped></style>

<script setup>
import { ref, defineProps, reactive } from "vue";
import { useUserStore } from "@/stores/users.js";
import { storeToRefs } from "pinia";
const userStore = useUserStore();
const { errorMessage, isLoading, user } = storeToRefs(userStore);

const userCredentials = reactive({
  username: "",
  email: "",
  password: "",
});
const props = defineProps({
  modelIsLogIn: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const errorClear = () => {
  // we can even and that function but iguess it's not necessary
  // clearUserCredentials();
  userStore.errorClear();
  visible.value = false;
};
const getUserData = async () => {
  if (props.modelIsLogIn) {
    await userStore.handleLogin({
      email: userCredentials.email,
      password: userCredentials.password,
    });
  } else {
    await userStore.handleSignup(userCredentials);
  }

  if (user.value) {
    clearUserCredentials();
    visible.value = false;
  }
};
const openDialog = () => {
  clearUserCredentials();
  errorClear();
  visible.value = true;
};
const clearUserCredentials = () => {
  userCredentials.username = "";
  userCredentials.email = "";
  userCredentials.password = "";
  // errorClear();
};
const visible = ref(false);
</script>

<template>
  <div class="card flex justify-center">
    <Button @click="openDialog">{{ props.modelIsLogIn ? "Login" : "Sing up" }}</Button>
    <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
      <span class="text-surface-500 dark:text-surface-400 block mb-8"
        >Update your information.</span
      >
      <div v-if="!isLoading">
        <div v-if="!modelIsLogIn" class="flex items-center gap-1 mb-4">
          <label for="username" class="font-semibold w-24">Username</label>
          <InputText
            id="username"
            v-model="userCredentials.username"
            class="flex-auto"
            autocomplete="off" />
        </div>
        <div class="flex items-center gap-1 mb-8">
          <label for="email" class="font-semibold w-24">Email</label>
          <InputText
            id="email"
            v-model="userCredentials.email"
            class="flex-auto"
            autocomplete="off" />
        </div>
        <div class="flex items-center gap-1 mb-8">
          <label for="Password" class="font-semibold w-24">Password</label>
          <Password
            id="Password"
            v-model="userCredentials.password"
            class="flex-auto"
            fluid
            autocomplete="off" />
        </div>
      </div>
      <div v-else class="card flex justify-center">
        <ProgressSpinner
          style="width: 50px; height: 50px"
          strokeWidth="8"
          fill="transparent"
          animationDuration=" 1s"
          aria-label="Custom ProgressSpinner" />
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="errorClear"></Button>
        <Button type="button" :disabled="isLoading" label="Save" @click="getUserData()"></Button>
      </div>

      <h1 v-if="errorMessage" class="text-red-500">{{ errorMessage }}</h1>
    </Dialog>
  </div>
</template>

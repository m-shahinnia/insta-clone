<script setup>
// import DilogImage from "./DilogImage.vue";
import { useRoute } from "vue-router";
import { defineProps } from "vue";
import ImageUploadBtn from "./ImageUploadBtn.vue";
import { useUserStore } from "@/stores/users";
import { storeToRefs } from "pinia";
import { supabase } from "@/superbase";

const route = useRoute();
const userStore = useUserStore();

const { user: userProfile } = route.params;
const { user } = storeToRefs(userStore);

const props = defineProps({
  username: String,
  userInfo: Object,
  addPost: Function,
  isFollowing: Boolean,
});
// console.log(username);
const followUser = async () => {
  await supabase.from("followers_following").insert({
    following_id: user.value.id,
    follower_id: props.username.id,
  });
};
const unFollowUser = async () => {
  await supabase.from("followers_following").delete().eq("following_id", user.value.id).eq(" follower_id", props.username.id);
};
</script>

<template>
  <div class="bg-red-300 px-2 py-2" v-if="props.username">
    <div>
      <span class="text-xl font-bold">{{ props.username.username }}</span>
      <div v-if="username">
        <ImageUploadBtn v-if="user && userProfile === user.username" :addPost="addPost" />
        <div v-else>
          <Button v-if="!props.isFollowing" @click="followUser">Follow</Button>
          <Button v-else @click="unFollowUser">Follwing</Button>
        </div>
      </div>
    </div>
    <div class="flex justify-between">
      <div class="flex gap-4">
        <span>{{ props.userInfo.potes }}Postes</span>
        <span>{{ props.userInfo.followers }} Followers</span>
        <span>{{ props.userInfo.folloing }} Folloing</span>
      </div>
    </div>
  </div>
  <div v-else>user not fouund</div>
</template>

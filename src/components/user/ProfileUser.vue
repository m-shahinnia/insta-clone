<script setup>
import Container from "@/layout/Container.vue";
import UserInfo from "./UserInfo.vue";
import UserImages from "./UserImages.vue";
import { useRoute } from "vue-router";
import { supabase } from "@/superbase";
import { ref, onMounted, watch, reactive } from "vue";
import { useUserStore } from "@/stores/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user: loggedInUser } = storeToRefs(userStore);
const route = useRoute();
const isLoading = ref(false);
const usernameUrl = route.params.user;
const posts = ref([]);
const user = ref(null);
const isFollowing = ref(false);
// console.log("route", usernameUrl);
const userInformation = reactive({ potes: null, followers: null, folloing: null });

const numberOfFollwers = async () => {
  const count = await supabase.from("followers_following").select("*", { count: "exact" }).eq("follower_id", user.value.id);
  return count;
};
const numberOfFollweing = async () => {
  const count = await supabase.from("followers_following").select("*", { count: "exact" }).eq("following_id", user.value.id);
  return count;
};

const addpost = (mnd) => {
  posts.value.unshift(mnd);
};

const fetchData = async () => {
  isLoading.value = true;
  const { data: userData } = await supabase.from("profiles").select().eq("username", usernameUrl).single();
  if (!userData) {
    isLoading.value = false;
    return (user.value = null);
  }

  user.value = userData;

  const { data: postData } = await supabase.from("posts").select().eq("owner_id", user.value.id);
  posts.value = postData;
  await fetchFollowing();

  const numFollowing = await numberOfFollweing();
  const numFollower = await numberOfFollwers();
  userInformation.folloing = numFollowing.count;
  userInformation.followers = numFollower.count;
  userInformation.potes = posts.value.length;
  // console.log(user);
  isLoading.value = false;
  // console.log(postData);
};
const fetchFollowing = async () => {
  if (loggedInUser.value && loggedInUser.value.id !== user.value.id) {
    const { data } = await supabase
      .from("followers_following")
      .select()
      .eq("following_id", loggedInUser.value.id)
      .eq("follower_id", user.value.id)
      .single();
    if (data) isFollowing.value = true;
  }
};
watch(loggedInUser, () => {
  fetchFollowing();
});
onMounted(() => {
  fetchData();
});
</script>

<template>
  <Container>
    <div class="flex flex-col justify-center space-y-3 py-10" v-if="!isLoading">
      <UserInfo :key="$route.params.user" :username="user" :addPost="addpost" :isFollowing="isFollowing" :userInfo="userInformation" />
      <UserImages :posts="posts" />
    </div>
    <div class="card flex justify-center items-center h-screen" v-else>
      <ProgressSpinner
        style="width: 50px; height: 50px"
        strokeWidth="8"
        fill="transparent"
        animationDuration=".5s"
        aria-label="Custom ProgressSpinner" />
    </div>
  </Container>
</template>

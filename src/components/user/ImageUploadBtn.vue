<script setup>
import { useToast } from "primevue/usetoast";
import { ref, defineProps } from "vue";
import { supabase } from "@/superbase";
import { useUserStore } from "@/stores/users";
import { storeToRefs } from "pinia";

const generateUUID = () => {
  // Returns a standard UUID v4 string
  return crypto.randomUUID();
};
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const props = defineProps({
  addPost: Function,
});
const textAreaCaptions = ref("");
const isLoading = ref(false);
const file = ref(null);
const visible = ref(false);
const toast = useToast();

// const upload = async () => {
//   if (!file.value) return;

//   isLoading.value = true;

//   const { data, error } = await supabase.storage.from("images").upload("public/" + generateUUID(), file.value);

//   if (error) {
//     toast.add({
//       severity: "error",
//       summary: "Upload Failed",
//       detail: error.message,
//       life: 3000,
//     });
//     isLoading.value = false;
//     return;
//   }

//   // Insert post right here
//   await supabase.from("posts").insert({
//     url: data.path,
//     caption: textAreaCaptions.value,
//     owner_id: user.value.id,
//   });

//   // Then handle UI updates
//   props.addPost({
//     url: data.path,
//     caption: textAreaCaptions.value,
//   });

//   toast.add({
//     severity: "success",
//     summary: "Upload Successful",
//     detail: "Your image has been uploaded.",
//     life: 3000,
//   });

//   textAreaCaptions.value = "";
//   visible.value = false;
//   isLoading.value = false;
// };

const upload = async () => {
  isLoading.value = true;
  let mnd;
  if (file.value) {
    const { data, error } = await supabase.storage.from("images").upload("public/" + generateUUID(), file.value);

    if (error) {
      toast.add({ severity: "error", summary: "Upload Failed", detail: error.message, life: 3000 });
    } else {
      toast.add({ severity: "success", summary: "Upload Successful", detail: "Your image has been uploaded.", life: 3000 });
    }
    mnd = data.path;
    await supabase.from("posts").insert({
      url: mnd,
      caption: textAreaCaptions.value,
      owner_id: user.value.id,
    });
  }
  isLoading.value = false;
  visible.value = false;
  textAreaCaptions.value = "";
  props.addPost({
    url: mnd,
    caption: textAreaCaptions.value,
  });
};

const checkUploadChanghe = (e) => {
  // console.log("File selected!", e.files[0]);
  if (e.files[0]) {
    file.value = e.files[0];
  }
  // console.log("file.value", file.value);
};
</script>

<template>
  <div class="card flex justify-center">
    <Button label="Show" @click="visible = true" />
    <Dialog v-model:visible="visible" modal :style="{ width: '35rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <template #header>
        <span class="text-xl font-bold">Image & Caption Upload</span>
      </template>

      <div class="card bg-gray-100 flex flex-col gap-3 p-4 items-center" v-if="!isLoading">
        <div class="w-full">
          <Textarea
            v-model="textAreaCaptions"
            placeholder="Enter captions (max 20 characters)..."
            autoResize
            maxlength="20"
            rows="5"
            cols="30"
            class="w-full" />
        </div>
        <FileUpload
          mode="basic"
          name="image_file"
          accept="image/*"
          :maxFileSize="1000000"
          @select="checkUploadChanghe"
          :auto="false"
          chooseLabel="Select Image"
          class="w-full" />
        <Button label="Upload" @click="upload" severity="secondary" />
      </div>
      <div v-else class="flex items-center">
        <ProgressSpinner
          style="width: 50px; height: 50px"
          strokeWidth="8"
          fill="transparent"
          animationDuration=" 1s"
          aria-label="Custom ProgressSpinner" />
      </div>
    </Dialog>

    <Toast />
  </div>
</template>

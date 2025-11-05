import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/superbase";

export const useUserStore = defineStore("users", () => {
  const user = ref(null);
  const errorMessage = ref("");
  const isLoading = ref(false);
  const isLoadingBtn = ref(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async (credentials) => {
    const { email, password } = credentials;
    if (!password.length) {
      errorMessage.value = "Password cannot be empty.";
      return;
    }
    if (!validateEmail(email)) {
      errorMessage.value = "email is not valid.";
      return;
    }
    isLoading.value = true;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      isLoading.value = false;
      return (errorMessage.value = error.message);
    }
    const { data: existingUser } = await supabase
      .from("profiles")
      .select()
      .eq("email", email)
      .single();

    user.value = {
      email: existingUser.email,
      username: existingUser.username,
      id: existingUser.id,
    };
    isLoading.value = false;
    errorMessage.value = "";
  };

  // just for Singinup
  const handleSignup = async (credentials) => {
    const { email, password, username } = credentials;

    if (password.length < 6) {
      errorMessage.value = "Password must be at least 6 characters long.";
      return;
    }

    if (username.length < 3) {
      errorMessage.value = "Username must be at least 3 characters long.";
      return;
    }

    if (!validateEmail(email)) {
      errorMessage.value = "Please enter a valid email address.";
      return;
    }
    // errorMessage.value = "";
    isLoading.value = true;
    // cheack if username is eqyual to existing username
    const { data: userWithUsername } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username)
      .single();
    if (userWithUsername) {
      isLoading.value = true;
      return (errorMessage.value = "User already registered");
    }
    errorMessage.value = "";
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      isLoading.value = true;
      console.error("Signup error:", error.message);
      errorMessage.value = error.message;
      return;
    }
    await supabase.from("profiles").insert({
      username,
      email,
    });
    // errorMessage.value = "";
    const { data: newUser } = await supabase.from("profiles").select().eq("email", email).single();
    user.value = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    };
    // user.value = { ...newUser };

    isLoading.value = false;
    // console.log("Signup successful:", data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    user.value = null;
  };

  // we can get user data from supabase auth and be in our acc
  const getUser = async () => {
    isLoadingBtn.value = true;
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      isLoadingBtn.value = false;
      return (user.value = null);
    }
    const { data: userEmail } = await supabase
      .from("profiles")
      .select()
      .eq("email", data.user.email)
      .single();
    user.value = {
      id: userEmail.id,
      email: userEmail.email,
      username: userEmail.username,
    };
    isLoadingBtn.value = false;
  };

  const errorClear = () => {
    errorMessage.value = "";
  };
  return {
    user,
    isLoadingBtn,
    errorMessage,
    isLoading,
    errorClear,
    user,
    handleLogin,
    handleSignup,
    handleLogout,
    getUser,
  };
});

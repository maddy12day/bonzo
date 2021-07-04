<template>
  <div>
    <h1>Bonzo Dashboard Login</h1>
    <UserAuthForm buttonText="Login" :submitForm="loginUser" />
  </div>
</template>

<script>
import UserAuthForm from "@/components/UserAuthForm.vue";
export default {
  components: {
    UserAuthForm,
  },
  methods: {
    async loginUser(loginInfo) {
      try {
        await this.$auth.loginWith("local", {
          data: loginInfo,
        });
        if (this.$auth.loggedIn) {
          this.$router.push("/");
        }
      } catch {
        // Display error
      }
    },
  },

};
</script>

<style>
</style>
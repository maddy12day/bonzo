<template>
  <div class="row">
    <div class="col-md-6 col-sm-12 offset-md-3 mt-5">
      <card>
        <h4 slot="header" class="card-title text-bold font-weight-bold">
          Bonzo Dashboard
        </h4>
        <UserAuthForm buttonText="Login" :submitForm="loginUser" />
      </card>
    </div>
  </div>
</template>

<script>
import UserAuthForm from "@/components/UserAuthForm.vue";
export default {
  layout: "auth",
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
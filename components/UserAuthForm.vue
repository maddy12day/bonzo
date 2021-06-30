<template>
  <card>
    <h5 slot="header" class="title">Login to your account!</h5>
    <form>
      <div class="row">
        <div class="col-md-4">
          <base-input
            type="email"
            label="Email address"
            placeholder="your email adddress"
            v-model="userInfo.email"
            :rules="[required('email'), emailFormat()]"
          >
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <base-input
            :type="showPassword ? 'text' : 'password'"
            counter="true"
            label="Password"
            placeholder="your password"
            v-model="userInfo.password"
            :rules="[required('password'), minLength('password', 8)]"
          >
          </base-input>
        </div>
      </div>
      <base-button
        native-type="submit"
        type="primary"
        class="btn-fill"
        @click="submitForm(userInfo)"
      >
        {{ buttonText }}
      </base-button>
    </form>
  </card>
</template>

<script>
import validations from "@/util/validations";
export default {
  data() {
    return {
      valid: false,
      showPassword: false,
      userInfo: {
        email: "anilm@aretove.com",
        password: "Asdf123$",
      },
      ...validations,
    };
  },
  props: ["submitForm", "buttonText", "hasName"],
};
</script>

<style lang="scss" scoped>
</style>
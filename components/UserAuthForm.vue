<template>
  <card class="w-75">
    <div class="row">
      <div class="col-md-6">
        <h5 slot="header" class="title">Login to your account!</h5>
        <form @submit.prevent="userLogin">
          <div class="row">
            <div class="col-md-12">
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
            <div class="col-md-12">
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
      </div>
      <div class="col-md-6">
        <img src="/icon.png" />
      </div>
    </div>
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
        email: "kristen.doherty@formabrands.com",
        password: "k3J#R3#$w7rf*UD5",
      },
      ...validations,
    };
  },
  props: ["submitForm", "buttonText", "hasName"],
};
</script>

<style lang="scss" scoped>
</style>
<template>
  <card>
    <div class="row">
      <div class="col-md-6">
        <h5 slot="header" class="title mt-5 text-center">
          Login to your account!
        </h5>
        <form @submit.prevent="userLogin">
          <div class="row">
            <div class="col-md-12 mt-5">
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
        <p ><span >Create an account</span></p>
        <sidebar-item 
        id="reg-text"
          :link="{
            name: `Register`,
            path: '/register',
          }"
        >
        </sidebar-item>
      </div>
      <div class="col-md-6">
        <div class="text-center">
          <img src="/icon.png" class="mx-auto w-75" />
        </div>
        <div>
          <h4 class="text-center">
            Bonzo.ai is a hosted Data Science as a Service (DSaaS) platform for
            predictive as well as prescriptive analytics, enabling enterprises
            with strategic actionable insights.
          </h4>
        </div>
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
        email: "",
        password: "",
      },
      ...validations,
    };
  },
  props: ["submitForm", "buttonText", "hasName"],
};
</script>

<style lang="scss" scoped>
*{
  list-style: none;
}
a{
  text-decoration: underline;
}
</style>

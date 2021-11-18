<template>
  <card>
    <div class="row">
      <div class="col-md-6 reg-title">
        <h5 slot="header" class="title mt-5 text-center">
          Register yourself to our service
        </h5>
        <form id="form">
          <div class="row">
            <div class="col-md-12 mt-5">
              <base-input
                type="text"
                label="First Name"
                placeholder="your First Name"
                v-model="userInfo.FirstName"
                :rules="[required('FirstName')]"
              >
              </base-input>
              <p id="error1" class="error"></p>
            </div>
          </div>
          <div class="row lname">
            <div class="col-md-12 mt-5">
              <base-input
                type="text"
                label="Last Name"
                placeholder="your Last Name"
                v-model="userInfo.LastName"
                :rules="[required('LastName')]"
              >
              </base-input>
              <p id="error2" class="error"></p>
            </div>
          </div>
          <div class="row email">
            <div class="col-md-12 mt-5">
              <base-input
                type="email"
                label="Email address"
                placeholder="your email adddress"
                v-model="userInfo.email"
                :rules="[required('email'), emailFormat()]"
              >
              </base-input>
              <p id="error3" class="error"></p>
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
              <p id="error4" class="error"></p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <base-input
                :type="showPassword ? 'text' : 'password'"
                counter="true"
                label="Confirm Password"
                placeholder="Confirm password"
                v-model="userInfo.ConfirmPassword"
                :rules="[required('ConfirmPassword'), minLength('password', 8)]"
              >
              </base-input>
              <p id="error5" class="error"></p>
            </div>
          </div>
          <base-button
            native-type="submit"
            type="primary"
            class="btn-fill"
            @click="takeUserDetail($event)"
          >
            {{ buttonText }}
          </base-button>
        </form>
        <p ><span >Already have an account?</span></p>
        <sidebar-item 
        id="reg-text"
          :link="{
            name: `Login`,
            path: '/login',
          }"
        >
        </sidebar-item>
      </div>
      <div class="col-md-6 branding">
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
      fname: false,
      lname: false,
      email: false,
      password: false,
      valid: false,
      showPassword: false,
      userInfo: {
        FirstName: "",
        LastName: "",
        email: "",
        password: "",
        ConfirmPassword: "",
      },
      ...validations,
    };
  },
  props: ["submitForm", "buttonText", "hasName"],
  methods: {
    async takeUserDetail(event) {
      event.preventDefault()
      if (this.userInfo.FirstName != "" && this.userInfo.FirstName.length > 3) {
        this.fname = true;
        document.getElementById("error1").innerHTML = "";
      } else {
        this.fname = false;
        document.getElementById("error1").innerHTML = "incorrect First Name";
      }
      if (this.userInfo.LastName != "" && this.userInfo.LastName.length > 3) {
        this.lname = true;
        document.getElementById("error2").innerHTML = "";
      } else {
        this.lname = false;
        document.getElementById("error2").innerHTML = "incorrect Last Name";
      }
      if (
        this.userInfo.email.includes("@formabrands") &&
        this.userInfo.email != ""
      ) {
        this.email = true;
        document.getElementById("error3").innerHTML = "";
      } else {
        this.email = false;
        document.getElementById("error3").innerHTML = "incorrect Email Address";
      }
      if (
        this.userInfo.password === this.userInfo.ConfirmPassword &&
        this.userInfo.password != "" && this.userInfo.password.length>8
      ) {
        this.password = true;
        document.getElementById("error4").innerHTML = "";
      } else {
        this.password = false;
        document.getElementById("error4").innerHTML = "incorrect Password";
      }
      if (this.fname && this.lname && this.email && this.password) {
        const data = {
          first_name: this.userInfo.FirstName,
          last_name: this.userInfo.LastName,
          email: this.userInfo.email,
          password: this.userInfo.password,
        };
        this.userInfo.FirstName=""
        this.userInfo.LastName=""
        this.userInfo.email=""
        this.userInfo.password=""
        this.userInfo.ConfirmPassword=""
        const registerUser = await this.$axios.$post(
          `/register-user`,
          data
        );
          console.log(registerUser);
        document.getElementById("form").reset();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.lname {
  margin-top: -45px;
}
.email {
  margin-top: -45px;
}
.error {
  font-size: 10px;
  color: #5c0c0c;
}
#error1,
#error2,
#error3,
#error4 {
    position: absolute;
    margin-top: -0.75rem;
    // margin-left: 5%;
}
.branding{
  margin: auto 0;
}
.reg-title{
  margin-top: -3rem;
}
#reg-text{
  list-style: none;
  text-decoration: underline;
  
}
</style>
<style scoped>
#reg-text p{color: #1d8cf8;
text-decoration: underline;}
</style>
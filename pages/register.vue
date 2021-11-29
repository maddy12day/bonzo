<template>
  <div class="row reg-form">
    <div class="col-md-6 col-sm-12 offset-md-3 mt-5">
      <card class="complete-form">
        <h4 slot="header" class="card-title text-bold font-weight-bold">
          Bonzo Dashboard
        </h4>
        <NewUserForm buttonText="Sign In" :hasName="true"  />
      </card>
    </div>
  </div>
</template>

<script>
import NewUserForm from "@/components/NewUserForm.vue";
export default {
  auth: "guest",
  components: {
    NewUserForm
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
*{
  margin: 0px;
  left: 0;
  right: 0;
  padding: 0;
  top: 0;
  list-style: none;
}
.reg-form{
  display: flex;
  justify-content: center;
  position: absolute;
  top: 1rem;
}
a{
  text-decoration: underline;
}
.complete-form{
  margin: 0px 0px;
  margin-top: -2rem;
  width: 100%;
}
.white-content .footer .copyright {
  color: #1d253b;
  margin-top: -1.5rem;
}
#reg-text{
  display: inline-block;
}
</style>
<style>
#reg-text p{
  color: #1d8cf8;
}
</style>
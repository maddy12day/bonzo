import Vue from "vue";

Vue.filter("capitalize", (val) => val.toUpperCase());
Vue.filter("toLocaleStr", (val) => parseInt(val).toLocaleString());

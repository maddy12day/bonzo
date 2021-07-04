import Vue from "vue";
import moment from "moment";

Vue.prototype.moment = moment;

Vue.filter("capitalize", (val) => val.toUpperCase());
Vue.filter("toLocaleStr", (val) => Number(val).toLocaleString());

Vue.filter("toTwoDigitsFloat", function(val) {
  console.log("val,", val);
  if (!val) {
    return 0;
  }
  if (isNaN(val)) {
    return val.toFixed(2);
  }
  return Number(val).toLocaleString();
});

Vue.filter("toLocaleStr", function(val) {
  if (!val) {
    return 0;
  }
  if (isNaN(val)) {
    return val;
  }
  return Number(val).toLocaleString();
});

Vue.filter("dateYMDHMSFormat", function(dateStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dateStr).format(pattern);
});
Vue.filter("dateYMDFormat", function(dateStr, pattern = "YYYY-MM-DD") {
  return moment(dateStr).format(pattern);
});

Vue.filter("booleanToText", function(boolVal) {
  if (boolVal == 0) {
    return "No";
  }
  if (boolVal == 1) {
    return "Yes";
  }
});

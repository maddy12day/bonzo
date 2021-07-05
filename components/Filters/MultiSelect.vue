<template>
  <multiselect
    v-model="values"
    :options="Options"
    :multiple="multiple"
    :close-on-select="false"
    :clear-on-select="false"
    :placeholder="placeholder"
    :preserve-search="true"
    label="name"
    track-by="name"
    @input="getDropdownValue"
  >
    <template slot="selection" slot-scope="{ values, isOpen }"
      ><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen"
        >{{ values.length }} {{ SelectedMessValue }}</span
      ></template
    >
  </multiselect>
</template>
<script>
import Multiselect from "vue-multiselect";
export default {
  name: "CustomMultiSelect",
  props: ["Options", "SelectedMessValue", "placeholder", "multiple"],
  components: {
    Multiselect,
  },
  data() {
    return {
      values: [],
      Options2: [],
    };
  },
  methods: {
    getDropdownValue() {
      this.$emit("customEvent", this.values);
      console.log("this.values", this.values);
    },
  },
};
</script>

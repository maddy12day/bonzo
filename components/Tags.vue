<template>
  <div class="row">
    <el-tag
      v-for="(item, index) in allAppliedFilters"
      :key="index"
      :type="'warning'"
    >
      {{ item }}
    </el-tag>
  </div>
</template>
<script>
import { Tag } from "element-ui";

export default {
  name: "Tags",
  components: {
    [Tag.name]: Tag,
  },
  props: ["allAppliedFilters"],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
};
</script>
<style lang="scss"></style>

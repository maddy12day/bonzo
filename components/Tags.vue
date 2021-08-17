<template>
  <div class="row selected-filters">
    <el-tag
      v-for="(item, index) in allAppliedFilters"
      :key="index"
      :type="'warning'"
    >
      <div v-html="tagHtmlMarkup(item)"></div>
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
  methods: {
    tagHtmlMarkup(item) {
      let tagData = item.split(":");
      return `<span class"filter-category"><b>${tagData[0]}: </b></span>${tagData[1]}`;
    },
  },
  watch: {},
  created() {},
};
</script>
<style lang="scss">
.filter-category {
  font-size: 16px;
}

.row {
  &.selected-filters {
    overflow-x: auto;
  }
}
</style>

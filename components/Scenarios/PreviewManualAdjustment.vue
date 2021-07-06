<template>
  <div class="row">
    <el-dialog :visible.sync="showDialog" width="90%">
      <span slot="title"
        ><i class="el-icon-info"></i>Manual AdjustmentTable Preview</span
      >


      <span slot="footer" class="dialog-footer">
        <div class="text-right ">
          <button class="btn btn-primary " @click="showDialog = false">
            Close
          </button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { Table, TableColumn, Dialog } from "element-ui";

export default {
  name: "dashboard",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dialog.name]: Dialog,
  },
  props: [
    "dialogVisible",
  ],
  data() {
    return {
      showDialog: false,
    };
  },
  computed: {},
  watch: {
    showDialog: function() {
      if (!this.showDialog) {
        this.$emit("dialogVisible", false);
      }
    },
  },
  created() {
    console.log("inisde");
    this.showDialog = true;
  },
};
</script>
<style lang="scss">
.el-dialog {
  background: #f5f6fa;
}
</style>

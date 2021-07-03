<template>
  <div class="row">
    <div class="col-lg-12">
      <card card-body-classes="table-full-width">
        <h4 slot="header" class="card-title text-bold font-weight-bold">
          {{ tableHeading }}
        </h4>
        <el-table :data="metricsTableData">
          <el-table-column
            min-width="170"
            sortable
            label="Metrics Name"
            property="metrics_master.title"
          >
          </el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="Yearly"
            property="yearly_aggregate"
            align="right"
          >
            <template slot-scope="scope">
              {{ scope.row.yearly_aggregate | toLocaleStr }}
            </template>
          </el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="w01"
            property="w01"
            align="right"
          >
            <template
              v-if="
                [
                  'Sales',
                  'Sales Build',
                  'Units Sales',
                  'Units Sales Build',
                ].includes(scope.row.metrics_master.title)
              "
              slot-scope="scope"
            >
              <el-input
                v-model="scope.row.w01"
                @blur="onDataChange(scope.row.w01)"
              >
              </el-input>
            </template>
            <template v-else slot-scope="scope">
              {{ scope.row.w01 | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w02"
            property="w02"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w02"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w03"
            property="w03"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w03"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w04"
            property="w40"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w04"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w05"
            property="w05"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w05"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w06"
            property="w06"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w06"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w07"
            property="w07"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w07"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w08"
            property="w08"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w08"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w09"
            property="w09"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w09"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w10"
            property="w10"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w10"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w11"
            property="w11"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w11"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w12"
            property="w12"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w12"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w13"
            property="w13"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w13"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w14"
            property="w14"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w14"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w15"
            property="w15"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w15"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w16"
            property="w16"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w16"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w17"
            property="w17"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w17"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w18"
            property="w18"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w18"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w19"
            property="w19"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w19"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w20"
            property="w20"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w20"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w21"
            property="w21"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w21"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w22"
            property="w22"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w22"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w23"
            property="w23"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w23"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w24"
            property="w24"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w24"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w25"
            property="w25"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w25"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w26"
            property="w26"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w26"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w27"
            property="w27"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w27"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w28"
            property="w28"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w28"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w29"
            property="w29"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w29"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w30"
            property="w30"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w30"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w31"
            property="w31"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w31"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w32"
            property="w32"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w32"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w33"
            property="w33"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w33"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w34"
            property="w34"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w34"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w35"
            property="w35"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w35"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w36"
            property="w36"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w36"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w37"
            property="w37"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w37"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w38"
            property="w38"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w38"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w39"
            property="w39"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w39"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w40"
            property="w40"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w40"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w41"
            property="w41"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w41"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w42"
            property="w42"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w42"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w43"
            property="w43"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w43"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w44"
            property="w44"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w44"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w45"
            property="w45"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w45"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w46"
            property="w46"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w46"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w47"
            property="w47"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w47"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w48"
            property="w48"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w48"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w49"
            property="w49"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w49"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w50"
            property="w50"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w50"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w51"
            property="w51"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w51"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="w52"
            property="w52"
            align="right"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.w52"> </el-input>
            </template>
          </el-table-column>
        </el-table>
      </card>
    </div>
  </div>
</template>
<script>
import { Table, TableColumn } from "element-ui";

export default {
  name: "dashboard",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  props: ["tableHeading", "metricsTableData"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    onDataChange(value) {
      console.log("value", value);
    },
  },
  mounted() {
    console.log(this.metricsTableData);
  },
};
</script>
<style>
</style>

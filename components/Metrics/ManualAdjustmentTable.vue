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
            label="early"
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
            <template slot-scope="scope">
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w01"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w01, scope.$index, 1)"
              >
              </el-input>
              <p v-else>{{ scope.row.w01 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w02"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w02, scope.$index, 2)"
              >
              </el-input>
              <p v-else>{{ scope.row.w02 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w03"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w03, scope.$index, 3)"
              >
              </el-input>
              <p v-else>{{ scope.row.w03 | toLocaleStr }}</p>
            </template>
          </el-table-column>

          <el-table-column
            min-width="150"
            sortable
            label="w04"
            property="w04"
            align="right"
          >
            <template slot-scope="scope">
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w04"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w04, scope.$index, 4)"
              >
              </el-input>
              <p v-else>{{ scope.row.w04 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w05"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w05, scope.$index, 5)"
              >
              </el-input>
              <p v-else>{{ scope.row.w05 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w06"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w06, scope.$index, 6)"
              >
              </el-input>
              <p v-else>{{ scope.row.w06 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w07"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w07, scope.$index, 7)"
              >
              </el-input>
              <p v-else>{{ scope.row.w07 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w08"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w08, scope.$index, 8)"
              >
              </el-input>
              <p v-else>{{ scope.row.w08 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w09"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w09, scope.$index, 9)"
              >
              </el-input>
              <p v-else>{{ scope.row.w09 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w10"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w10, scope.$index, 10)"
              >
              </el-input>
              <p v-else>{{ scope.row.w10 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w11"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w11, scope.$index, 11)"
              >
              </el-input>
              <p v-else>{{ scope.row.w11 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w12"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w12, scope.$index, 12)"
              >
              </el-input>
              <p v-else>{{ scope.row.w12 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w13"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w13, scope.$index, 13)"
              >
              </el-input>
              <p v-else>{{ scope.row.w13 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w14"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w14, scope.$index, 14)"
              >
              </el-input>
              <p v-else>{{ scope.row.w14 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w15"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w15, scope.$index, 15)"
              >
              </el-input>
              <p v-else>{{ scope.row.w15 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w16"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w16, scope.$index, 16)"
              >
              </el-input>
              <p v-else>{{ scope.row.w16 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w17"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w17, scope.$index, 17)"
              >
              </el-input>
              <p v-else>{{ scope.row.w17 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w18"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w18, scope.$index, 18)"
              >
              </el-input>
              <p v-else>{{ scope.row.w18 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w19"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w19, scope.$index, 19)"
              >
              </el-input>
              <p v-else>{{ scope.row.w19 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w20"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w20, scope.$index, 20)"
              >
              </el-input>
              <p v-else>{{ scope.row.w20 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w21"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w21, scope.$index, 21)"
              >
              </el-input>
              <p v-else>{{ scope.row.w21 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w22"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w22, scope.$index, 22)"
              >
              </el-input>
              <p v-else>{{ scope.row.w22 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w23"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w23, scope.$index, 23)"
              >
              </el-input>
              <p v-else>{{ scope.row.w23 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w24"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w24, scope.$index, 24)"
              >
              </el-input>
              <p v-else>{{ scope.row.w24 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w25"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w25, scope.$index, 25)"
              >
              </el-input>
              <p v-else>{{ scope.row.w25 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w26"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w26, scope.$index, 26)"
              >
              </el-input>
              <p v-else>{{ scope.row.w26 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w27"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w27, scope.$index, 27)"
              >
              </el-input>
              <p v-else>{{ scope.row.w27 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w28"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w28, scope.$index, 28)"
              >
              </el-input>
              <p v-else>{{ scope.row.w28 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w29"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w29, scope.$index, 29)"
              >
              </el-input>
              <p v-else>{{ scope.row.w29 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w30"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w30, scope.$index, 30)"
              >
              </el-input>
              <p v-else>{{ scope.row.w30 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w31"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w31, scope.$index, 31)"
              >
              </el-input>
              <p v-else>{{ scope.row.w31 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w32"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w32, scope.$index, 32)"
              >
              </el-input>
              <p v-else>{{ scope.row.w32 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w33"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w33, scope.$index, 33)"
              >
              </el-input>
              <p v-else>{{ scope.row.w33 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w34"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w34, scope.$index, 34)"
              >
              </el-input>
              <p v-else>{{ scope.row.w34 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w35"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w35, scope.$index, 35)"
              >
              </el-input>
              <p v-else>{{ scope.row.w35 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w36"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w36, scope.$index, 36)"
              >
              </el-input>
              <p v-else>{{ scope.row.w36 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w37"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w37, scope.$index, 37)"
              >
              </el-input>
              <p v-else>{{ scope.row.w37 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w38"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w38, scope.$index, 38)"
              >
              </el-input>
              <p v-else>{{ scope.row.w38 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w39"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w39, scope.$index, 39)"
              >
              </el-input>
              <p v-else>{{ scope.row.w39 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w40"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w40, scope.$index, 40)"
              >
              </el-input>
              <p v-else>{{ scope.row.w40 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w41"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w41, scope.$index, 41)"
              >
              </el-input>
              <p v-else>{{ scope.row.w41 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w42"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w42, scope.$index, 42)"
              >
              </el-input>
              <p v-else>{{ scope.row.w42 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w43"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w43, scope.$index, 43)"
              >
              </el-input>
              <p v-else>{{ scope.row.w43 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w44"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w44, scope.$index, 44)"
              >
              </el-input>
              <p v-else>{{ scope.row.w44 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w45"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w45, scope.$index, 45)"
              >
              </el-input>
              <p v-else>{{ scope.row.w45 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w46"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w46, scope.$index, 46)"
              >
              </el-input>
              <p v-else>{{ scope.row.w46 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w47"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w47, scope.$index, 47)"
              >
              </el-input>
              <p v-else>{{ scope.row.w47 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w48"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w48, scope.$index, 48)"
              >
              </el-input>
              <p v-else>{{ scope.row.w48 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w49"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w49, scope.$index, 49)"
              >
              </el-input>
              <p v-else>{{ scope.row.w49 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w50"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w50, scope.$index, 50)"
              >
              </el-input>
              <p v-else>{{ scope.row.w50 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w51"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w51, scope.$index, 51)"
              >
              </el-input>
              <p v-else>{{ scope.row.w51 | toLocaleStr }}</p>
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
              <el-input
                v-if="
                  !isDisble &&
                    [
                      'Sales',
                      'Sales Build',
                      'Units Sales',
                      'Units Sales Build',
                    ].includes(scope.row.metrics_master.title)
                "
                v-model="scope.row.w52"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w52, scope.$index, 52)"
              >
              </el-input>
              <p v-else>{{ scope.row.w52 | toLocaleStr }}</p>
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
    return {
      tableData: [],
      isDisble: false,
    };
  },
  computed: {},
  methods: {
    onDataChange(e, value, index, innerIndex) {
      const oldTableData = JSON.parse(
        localStorage.getItem("adjustmentTableData")
      );
      if (
        oldTableData[index][
          `${innerIndex < 10 ? `w0${innerIndex}` : `w${innerIndex}`}`
        ] !== value
      ) {
        this.$emit('EvtAdjValues', {
          new_value: value,
          weekend_date: JSON.parse(localStorage.getItem("weekendDates"))[innerIndex],
          old_value: oldTableData[index][`${innerIndex < 10 ? `w0${innerIndex}` : `w${innerIndex}`}` ],
          metrics_name:  oldTableData[index]['metrics_name'],
          ele: e.target.parentNode.parentNode.parentNode 
        });
        e.target.parentNode.parentNode.parentNode.style.background='#ffeacb';
        this.isDisble = true;
      } else {
        this.isDisble = false;
      }
    },
  },
  mounted() {},
};
</script>
<style></style>

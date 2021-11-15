<template>
  <div class="row filteredForecastMetrics">
    <div class="col-lg-12">
      <div class="col-md-12 text-right p-0">
        <br />
        <a>
          <button
            v-if="metricTableDataExportDataProp.length > 0"
            class="mt-1 btn btn-sm"
            style="line-height: 1"
            @click="exportToExcel"
          >
            Download Excel
          </button>
        </a>
      </div>
      <card card-body-classes="table-full-width">
        <h4 class="card-title text-bold font-weight-bold">
          {{ tableHeading }}
        </h4>
        <div
          class="applied-filter-container"
          v-if="allAppliedFilters.length > 0"
        >
          <h5 class="text-bold font-weight-bold">Applied Filters</h5>
          <Tags :allAppliedFilters="allAppliedFilters" />
        </div>
        <el-table :data="filteredForecastMetrics.parsedFilteredForecastData">
          <template
            v-if="
              filteredForecastMetrics &&
              !filteredForecastMetrics.parsedFilteredForecastData
            "
          >
            <div slot="append" :style="'text-align: center;'">
              Loading {{ tableHeading }} ...
            </div>
          </template>
          <el-table-column
            min-width="185"
            label="Metrics Name"
            property="Metrics Name"
            class-name="metrics-fix-header"
            fixed
          >
          </el-table-column>
          <el-table-column
            min-width="185"
            label="Yearly"
            property="yearly_aggregate"
            align="right"
          >
            <template slot-scope="scope"
              >{{ scope.row.yearly_aggregate | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="185"
            label="Q1"
            property="Q1"
            align="right"
          >
            <template slot-scope="scope"
              >{{ scope.row.Q1 | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="185"
            label="Q2"
            property="Q2"
            align="right"
          >
            <template slot-scope="scope"
              >{{ scope.row.Q2 | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="185"
            label="Q3"
            property="Q3"
            align="right"
          >
            <template slot-scope="scope"
              >{{ scope.row.Q3 | toLocaleStr }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="185"
            label="Q4"
            property="Q4"
            align="right"
          >
            <template slot-scope="scope"
              >{{ scope.row.Q4 | toLocaleStr }}
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 1 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
                "
                v-model="scope.row.w1"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w1, scope.$index, 1)"
              >
              </el-input>
              <p v-else>{{ scope.row.w1 | toLocaleStr }}</p>
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 2 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
                "
                v-model="scope.row.w2"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w2, scope.$index, 2)"
              >
              </el-input>
              <p v-else>{{ scope.row.w2 | toLocaleStr }}</p>
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 3 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
                "
                v-model="scope.row.w3"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w3, scope.$index, 3)"
              >
              </el-input>
              <p v-else>{{ scope.row.w3 | toLocaleStr }}</p>
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 4 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
                "
                v-model="scope.row.w4"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w4, scope.$index, 4)"
              >
              </el-input>
              <p v-else>{{ scope.row.w4 | toLocaleStr }}</p>
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 5 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
                "
                v-model="scope.row.w5"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w5, scope.$index, 5)"
              >
              </el-input>
              <p v-else>{{ scope.row.w5 | toLocaleStr }}</p>
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 6 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
                "
                v-model="scope.row.w6"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w6, scope.$index, 6)"
              >
              </el-input>
              <p v-else>{{ scope.row.w6 | toLocaleStr }}</p>
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 7 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
                "
                v-model="scope.row.w7"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w7, scope.$index, 7)"
              >
              </el-input>
              <p v-else>{{ scope.row.w7 | toLocaleStr }}</p>
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 8 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
                "
                v-model="scope.row.w8"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w8, scope.$index, 8)"
              >
              </el-input>
              <p v-else>{{ scope.row.w8 | toLocaleStr }}</p>
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 9 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
                "
                v-model="scope.row.w9"
                :disabled="isDisble"
                @blur="(e) => onDataChange(e, scope.row.w9, scope.$index, 9)"
              >
              </el-input>
              <p v-else>{{ scope.row.w9 | toLocaleStr }}</p>
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 10 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 11 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 12 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 13 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 14 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 15 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 16 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 17 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 18 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 19 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 20 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 21 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 22 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 23 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 24 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 25 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 26 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 27 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 28 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 29 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 30 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 31 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  !isDisble &&
                  weekNo() < 32 &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 33 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 34 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 35 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 36 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 37 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 38 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 39 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 40 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 41 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 42 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 43 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 44 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 45 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 46 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 47 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 48 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 49 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 50 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 51 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
                autofocus
                :class="`weekend-${weekNo()}`"
                type="number"
                v-if="
                  weekNo() < 52 &&
                  !isDisble &&
                  [
                    'Sales',
                    'Sales Build',
                    'Units Sales',
                    'Units Sales Build',
                  ].includes(scope.row['Metrics Name'])
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
// import $ from "jQuery";
import { Table, TableColumn } from "element-ui";
import Tags from "../../components/Tags.vue";
import moment from "moment";
import XLSX from "xlsx";

export default {
  name: "FilterWeeklyManualAdjustment",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    Tags,
  },
  data() {
    return {
      metricTableDataExportData: [],
      weekIndex: null,
      weekIndexTill: 52,
      isDisble: false,
    };
  },
  props: [
    "tableHeading",
    "filteredForecastMetrics",
    "allAppliedFilters",
    "filterArray",
  ],
  computed: {
    metricTableDataExportDataProp() {
      return this.metricTableDataExportData;
    },
  },
  watch: {
    filteredForecastMetrics: function () {
      this.createExportCSV();
    },
  },
  updated() {
    this.onFocus();
  },
  methods: {
    onFocus() {
      document.querySelector(`.weekend-${this.weekNo()}`).focus();
    },
    weekNo() {
      return moment(new Date()).week() - 1;
    },
    onDataChange(e, value, index, innerIndex) {
      console.log(e, value, index, innerIndex)
      const oldTableData = JSON.parse(
        localStorage.getItem("adjustmentTableData")
      );
      console.log(oldTableData);
      console.log(oldTableData[index][`W${innerIndex}`]);
      if (
        Number(oldTableData[index][`W${innerIndex}`]) !== Number(value)
      ) { 
         this.$emit("EvtAdjValues", {
          new_value: value,
          weekend_date: JSON.parse(localStorage.getItem("weekendDates"))[
            innerIndex - 1
          ],
          old_value:
            oldTableData[index][`W${innerIndex}`],
          metrics_name: oldTableData[index]["Metrics Slug"],
          ele: e.target.parentNode.parentNode.parentNode,
        });
        e.target.parentNode.parentNode.parentNode.style.background = "#ffeacb";
        this.isDisble = true;
      } else {
        this.isDisble = false;
      } 
    },
    exportToExcel() {
      let metricTableDataExportData = XLSX.utils.json_to_sheet(
        this.metricTableDataExportData
      );
      let filterArray = XLSX.utils.json_to_sheet(this.filterArray);

      let wb = XLSX.utils.book_new(); // make Workbook of Excel

      // add Worksheet to Workbook
      // Workbook contains one or more worksheets
      XLSX.utils.book_append_sheet(wb, filterArray, "Applied Filters");
      XLSX.utils.book_append_sheet(
        wb,
        metricTableDataExportData,
        "Filtered Weekly Metrics"
      ); // sheetAName is name of Worksheet

      // export Excel file
      XLSX.writeFile(wb, this.getCSVName()); // name of the file is 'book.xlsx'
    },
    getCSVName() {
      return `Filtered Weekly Metrics Table ${moment().format(
        "MM-DD-YYYY"
      )}.xlsx`;
    },
    createExportCSV() {
      this.metricTableDataExportData =
        this.filteredForecastMetrics.parsedFilteredForecastData.map((data) => {
          let metricTableRow = {
            "Metrics Name": data["Metrics Name"],
            Yearly: data.yearly_aggregate,
            Q1: data.Q1,
            Q2: data.Q2,
            Q3: data.Q3,
            Q4: data.Q4,
          };
          metricTableRow[`W1 ${this.getWeekendDates(1)}`] = data.w1;
          metricTableRow[`W2 ${this.getWeekendDates(2)}`] = data.w2;
          metricTableRow[`W3 ${this.getWeekendDates(3)}`] = data.w3;
          metricTableRow[`W4 ${this.getWeekendDates(4)}`] = data.w4;
          metricTableRow[`W5 ${this.getWeekendDates(5)}`] = data.w5;
          metricTableRow[`W6 ${this.getWeekendDates(6)}`] = data.w6;
          metricTableRow[`W7 ${this.getWeekendDates(7)}`] = data.w7;
          metricTableRow[`W8 ${this.getWeekendDates(8)}`] = data.w8;
          metricTableRow[`W9 ${this.getWeekendDates(9)}`] = data.w9;
          metricTableRow[`W10 ${this.getWeekendDates(10)}`] = data.w10;
          metricTableRow[`W11 ${this.getWeekendDates(11)}`] = data.w11;
          metricTableRow[`W12 ${this.getWeekendDates(12)}`] = data.w12;
          metricTableRow[`W13 ${this.getWeekendDates(13)}`] = data.w13;
          metricTableRow[`W14 ${this.getWeekendDates(14)}`] = data.w14;
          metricTableRow[`W15 ${this.getWeekendDates(15)}`] = data.w15;
          metricTableRow[`W16 ${this.getWeekendDates(16)}`] = data.w16;
          metricTableRow[`W17 ${this.getWeekendDates(17)}`] = data.w17;
          metricTableRow[`W18 ${this.getWeekendDates(18)}`] = data.w18;
          metricTableRow[`W19 ${this.getWeekendDates(19)}`] = data.w19;
          metricTableRow[`W20 ${this.getWeekendDates(20)}`] = data.w20;
          metricTableRow[`W21 ${this.getWeekendDates(21)}`] = data.w21;
          metricTableRow[`W22 ${this.getWeekendDates(22)}`] = data.w22;
          metricTableRow[`W23 ${this.getWeekendDates(23)}`] = data.w23;
          metricTableRow[`W24 ${this.getWeekendDates(24)}`] = data.w24;
          metricTableRow[`W25 ${this.getWeekendDates(25)}`] = data.w25;
          metricTableRow[`W26 ${this.getWeekendDates(26)}`] = data.w26;
          metricTableRow[`W27 ${this.getWeekendDates(27)}`] = data.w27;
          metricTableRow[`W28 ${this.getWeekendDates(28)}`] = data.w28;
          metricTableRow[`W29 ${this.getWeekendDates(29)}`] = data.w29;
          metricTableRow[`W30 ${this.getWeekendDates(30)}`] = data.w30;
          metricTableRow[`W31 ${this.getWeekendDates(31)}`] = data.w31;
          metricTableRow[`W32 ${this.getWeekendDates(32)}`] = data.w32;
          metricTableRow[`W33 ${this.getWeekendDates(33)}`] = data.w33;
          metricTableRow[`W34 ${this.getWeekendDates(34)}`] = data.w34;
          metricTableRow[`W35 ${this.getWeekendDates(35)}`] = data.w35;
          metricTableRow[`W36 ${this.getWeekendDates(36)}`] = data.w36;
          metricTableRow[`W37 ${this.getWeekendDates(37)}`] = data.w37;
          metricTableRow[`W38 ${this.getWeekendDates(38)}`] = data.w38;
          metricTableRow[`W39 ${this.getWeekendDates(39)}`] = data.w39;
          metricTableRow[`W40 ${this.getWeekendDates(40)}`] = data.w40;
          metricTableRow[`W41 ${this.getWeekendDates(41)}`] = data.w41;
          metricTableRow[`W42 ${this.getWeekendDates(42)}`] = data.w42;
          metricTableRow[`W43 ${this.getWeekendDates(43)}`] = data.w43;
          metricTableRow[`W44 ${this.getWeekendDates(44)}`] = data.w44;
          metricTableRow[`W45 ${this.getWeekendDates(45)}`] = data.w45;
          metricTableRow[`W46 ${this.getWeekendDates(46)}`] = data.w46;
          metricTableRow[`W47 ${this.getWeekendDates(47)}`] = data.w47;
          metricTableRow[`W48 ${this.getWeekendDates(48)}`] = data.w48;
          metricTableRow[`W49 ${this.getWeekendDates(49)}`] = data.w49;
          metricTableRow[`W50 ${this.getWeekendDates(50)}`] = data.w50;
          metricTableRow[`W51 ${this.getWeekendDates(51)}`] = data.w51;
          metricTableRow[`W52 ${this.getWeekendDates(52)}`] = data.w52;
          return metricTableRow;
        });
    },
    getWeekendDates(index) {
      return JSON.parse(window.localStorage.getItem("weekendDates"))
        ? `(${moment(
            JSON.parse(window.localStorage.getItem("weekendDates"))[index - 1]
          ).format("MM/DD/YYYY")})`
        : "";
    },
    valueOfWeek() {
      this.weekIndex = $("#weekOfYear").val();
      console.log(this.weekIndex);
    },
    valueOfWeekTill() {
      this.weekIndexTill = $("#weekOfYearTill").val();
      console.log(this.weekIndexTill);
    },
    checkIfPastWeek(index) {
      let className = "";
      let className1 = "";
      let className2 = "";
      if (this.weekIndex > index) {
        className1 = "disappearWeek";
      }
      if (this.weekIndexTill < index) {
        className2 = "disappearWeek";
      }
      if (moment(new Date()).week() > index) {
        className = "disableWeek";
      }
      return `${className} ${className1} ${className2}`;
    },
  },
};
</script>

<style>
.disableWeek {
  background: #e8e8e8;
}

.filteredForecastMetrics .el-table__empty-block {
  display: none !important;
}
.disappearWeek {
  display: none;
}
#weekOfYear {
  border: none;
  border: 1px solid rgb(168 156 156);
  width: 150px;
  height: 35px;
  border-radius: 6px;
  margin-left: 15px;
  text-align: justify;
}
#weekOfYearTill {
  border: none;
  border: 1px solid rgb(168 156 156);
  width: 150px;
  height: 35px;
  border-radius: 6px;
  margin-left: 15px;
  text-align: justify;
}


</style>

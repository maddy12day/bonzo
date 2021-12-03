<template>
  <card card-body-classes="table-full-width">
    <h4 class="card-title text-bold font-weight-bold">
      {{ tableHeading }}
    </h4>
    <div class="applied-filter-container" v-if="allAppliedFilters.length > 0">
      <h5 class="text-bold font-weight-bold">Applied Filters</h5>
      <Tags :allAppliedFilters="allAppliedFilters" />
    </div>
    <el-table :data="topSkusData.parsedWeeklyData">
      <template
        v-if="
          topSkusData &&
            topSkusData.parsedWeeklyData &&
            topSkusData.parsedWeeklyData.length == '0'
        "
      >
        <div slot="append"></div>
      </template>
      <template v-else>
        <el-table-column
          min-width="150"
          label="SKU"
          property="sku"
          class-name="metrics-fix-header"
          fixed
        >
        </el-table-column>
        <el-table-column
          min-width="250"
          label="Title"
          property="title"
          class-name="metrics-fix-header"
          fixed
        >
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w1 ${getWeekendDates(1)}`"
          :class-name="checkIfPastWeek(1)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(1) == true"
              autofocus
              v-model="scope.row.data[0][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[0][`${forecast_attribute}`],
                    scope.$index,
                    0
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[0][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[0]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w2 ${getWeekendDates(2)}`"
          :class-name="checkIfPastWeek(2)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(2) == true"
              autofocus
              v-model="scope.row.data[1][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[1][`${forecast_attribute}`],
                    scope.$index,
                    2
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[1][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[1]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w3 ${getWeekendDates(3)}`"
          :class-name="checkIfPastWeek(3)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(3) == true"
              autofocus
              v-model="scope.row.data[2][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[2][`${forecast_attribute}`],
                    scope.$index,
                    3
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[2][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[2]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w4 ${getWeekendDates(4)}`"
          :class-name="checkIfPastWeek(4)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(4) == true"
              autofocus
              v-model="scope.row.data[3][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[3][`${forecast_attribute}`],
                    scope.$index,
                    4
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[3][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[3]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w5 ${getWeekendDates(5)}`"
          :class-name="checkIfPastWeek(5)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(5) == true"
              autofocus
              v-model="scope.row.data[4][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[4][`${forecast_attribute}`],
                    scope.$index,
                    5
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[4][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[4]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w6 ${getWeekendDates(6)}`"
          :class-name="checkIfPastWeek(6)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(6) == true"
              autofocus
              v-model="scope.row.data[5][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[5][`${forecast_attribute}`],
                    scope.$index,
                    6
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[5][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[5]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w7 ${getWeekendDates(7)}`"
          :class-name="checkIfPastWeek(7)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(7) == true"
              autofocus
              v-model="scope.row.data[6][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[6][`${forecast_attribute}`],
                    scope.$index,
                    7
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[6][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[6]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w8 ${getWeekendDates(8)}`"
          :class-name="checkIfPastWeek(8)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(8) == true"
              autofocus
              v-model="scope.row.data[7][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[7][`${forecast_attribute}`],
                    scope.$index,
                    8
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[7][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[7]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w9 ${getWeekendDates(9)}`"
          :class-name="checkIfPastWeek(9)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(9) == true"
              autofocus
              v-model="scope.row.data[8][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[8][`${forecast_attribute}`],
                    scope.$index,
                    9
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[8][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[8]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w10 ${getWeekendDates(10)}`"
          :class-name="checkIfPastWeek(10)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(10) == true"
              autofocus
              v-model="scope.row.data[9][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[9][`${forecast_attribute}`],
                    scope.$index,
                    10
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[9][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[9]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w11 ${getWeekendDates(11)}`"
          :class-name="checkIfPastWeek(11)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(11) == true"
              autofocus
              v-model="scope.row.data[10][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[10][`${forecast_attribute}`],
                    scope.$index,
                    11
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[10][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[10]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w12 ${getWeekendDates(12)}`"
          :class-name="checkIfPastWeek(12)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(12) == true"
              autofocus
              v-model="scope.row.data[11][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[11][`${forecast_attribute}`],
                    scope.$index,
                    12
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[11][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[11]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w13 ${getWeekendDates(13)}`"
          :class-name="checkIfPastWeek(13)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(13) == true"
              autofocus
              v-model="scope.row.data[12][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[12][`${forecast_attribute}`],
                    scope.$index,
                    13
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[12][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[12]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w14 ${getWeekendDates(14)}`"
          :class-name="checkIfPastWeek(14)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(14) == true"
              autofocus
              v-model="scope.row.data[13][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[13][`${forecast_attribute}`],
                    scope.$index,
                    14
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[13][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[13]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w15 ${getWeekendDates(15)}`"
          :class-name="checkIfPastWeek(15)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(15) == true"
              autofocus
              v-model="scope.row.data[14][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[14][`${forecast_attribute}`],
                    scope.$index,
                    15
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[14][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[14]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w16 ${getWeekendDates(16)}`"
          :class-name="checkIfPastWeek(16)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(16) == true"
              autofocus
              v-model="scope.row.data[15][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[15][`${forecast_attribute}`],
                    scope.$index,
                    16
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[15][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[15]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w17 ${getWeekendDates(17)}`"
          :class-name="checkIfPastWeek(17)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(17) == true"
              autofocus
              v-model="scope.row.data[16][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[16][`${forecast_attribute}`],
                    scope.$index,
                    17
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[16][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[16]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w18 ${getWeekendDates(18)}`"
          :class-name="checkIfPastWeek(18)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(18) == true"
              autofocus
              v-model="scope.row.data[17][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[17][`${forecast_attribute}`],
                    scope.$index,
                    18
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[17][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[17]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w19 ${getWeekendDates(19)}`"
          :class-name="checkIfPastWeek(19)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(19) == true"
              autofocus
              v-model="scope.row.data[18][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[18][`${forecast_attribute}`],
                    scope.$index,
                    19
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[18][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[18]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w20 ${getWeekendDates(20)}`"
          :class-name="checkIfPastWeek(20)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(20) == true"
              autofocus
              v-model="scope.row.data[19][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[19][`${forecast_attribute}`],
                    scope.$index,
                    20
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[19][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[19]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w21 ${getWeekendDates(21)}`"
          :class-name="checkIfPastWeek(21)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(21) == true"
              autofocus
              v-model="scope.row.data[20][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[20][`${forecast_attribute}`],
                    scope.$index,
                    21
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[20][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[20]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w22 ${getWeekendDates(22)}`"
          :class-name="checkIfPastWeek(22)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(22) == true"
              autofocus
              v-model="scope.row.data[21][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[21][`${forecast_attribute}`],
                    scope.$index,
                    22
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[21][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[21]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w23 ${getWeekendDates(23)}`"
          :class-name="checkIfPastWeek(23)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(23) == true"
              autofocus
              v-model="scope.row.data[22][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[22][`${forecast_attribute}`],
                    scope.$index,
                    23
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[22][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[22]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w24 ${getWeekendDates(24)}`"
          :class-name="checkIfPastWeek(24)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(24) == true"
              autofocus
              v-model="scope.row.data[23][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[23][`${forecast_attribute}`],
                    scope.$index,
                    24
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[23][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[23]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w25 ${getWeekendDates(25)}`"
          :class-name="checkIfPastWeek(25)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(25) == true"
              autofocus
              v-model="scope.row.data[24][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[24][`${forecast_attribute}`],
                    scope.$index,
                    25
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[24][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[24]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w26 ${getWeekendDates(26)}`"
          :class-name="checkIfPastWeek(26)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(26) == true"
              autofocus
              v-model="scope.row.data[25][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[25][`${forecast_attribute}`],
                    scope.$index,
                    26
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[25][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[25]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w27 ${getWeekendDates(27)}`"
          :class-name="checkIfPastWeek(27)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(27) == true"
              autofocus
              v-model="scope.row.data[26][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[26][`${forecast_attribute}`],
                    scope.$index,
                    27
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[26][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[26]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w28 ${getWeekendDates(28)}`"
          :class-name="checkIfPastWeek(28)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(28) == true"
              autofocus
              v-model="scope.row.data[27][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[27][`${forecast_attribute}`],
                    scope.$index,
                    28
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[27][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[27]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w29 ${getWeekendDates(29)}`"
          :class-name="checkIfPastWeek(29)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(29) == true"
              autofocus
              v-model="scope.row.data[28][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[28][`${forecast_attribute}`],
                    scope.$index,
                    29
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[28][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[28]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w30 ${getWeekendDates(30)}`"
          :class-name="checkIfPastWeek(30)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(30) == true"
              autofocus
              v-model="scope.row.data[29][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[29][`${forecast_attribute}`],
                    scope.$index,
                    30
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[29][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[29]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w31 ${getWeekendDates(31)}`"
          :class-name="checkIfPastWeek(31)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(31) == true"
              autofocus
              v-model="scope.row.data[30][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[30][`${forecast_attribute}`],
                    scope.$index,
                    31
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[30][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[30]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w32 ${getWeekendDates(32)}`"
          :class-name="checkIfPastWeek(32)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(32) == true"
              autofocus
              v-model="scope.row.data[31][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[31][`${forecast_attribute}`],
                    scope.$index,
                    32
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[31][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[31]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w33 ${getWeekendDates(33)}`"
          :class-name="checkIfPastWeek(33)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(33) == true"
              autofocus
              v-model="scope.row.data[32][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[32][`${forecast_attribute}`],
                    scope.$index,
                    33
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[32][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[32]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w34 ${getWeekendDates(34)}`"
          :class-name="checkIfPastWeek(34)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(34) == true"
              autofocus
              v-model="scope.row.data[33][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[33][`${forecast_attribute}`],
                    scope.$index,
                    34
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[33][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[33]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w35 ${getWeekendDates(35)}`"
          :class-name="checkIfPastWeek(35)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(35) == true"
              autofocus
              v-model="scope.row.data[34][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[34][`${forecast_attribute}`],
                    scope.$index,
                    35
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[34][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[34]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w36 ${getWeekendDates(36)}`"
          :class-name="checkIfPastWeek(36)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(36) == true"
              autofocus
              v-model="scope.row.data[35][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[35][`${forecast_attribute}`],
                    scope.$index,
                    36
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[35][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[35]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w37 ${getWeekendDates(37)}`"
          :class-name="checkIfPastWeek(37)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(37) == true"
              autofocus
              v-model="scope.row.data[36][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[36][`${forecast_attribute}`],
                    scope.$index,
                    37
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[36][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[36]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w38 ${getWeekendDates(38)}`"
          :class-name="checkIfPastWeek(38)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(38) == true"
              autofocus
              v-model="scope.row.data[37][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[37][`${forecast_attribute}`],
                    scope.$index,
                    38
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[37][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[37]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w39 ${getWeekendDates(39)}`"
          :class-name="checkIfPastWeek(39)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(39) == true"
              autofocus
              v-model="scope.row.data[38][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[38][`${forecast_attribute}`],
                    scope.$index,
                    39
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[38][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[38]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w40 ${getWeekendDates(40)}`"
          :class-name="checkIfPastWeek(40)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(40) == true"
              autofocus
              v-model="scope.row.data[39][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[39][`${forecast_attribute}`],
                    scope.$index,
                    40
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[39][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[39]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w41 ${getWeekendDates(41)}`"
          :class-name="checkIfPastWeek(41)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(41) == true"
              autofocus
              v-model="scope.row.data[40][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[40][`${forecast_attribute}`],
                    scope.$index,
                    41
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[40][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[40]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w42 ${getWeekendDates(42)}`"
          :class-name="checkIfPastWeek(42)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(42) == true"
              autofocus
              v-model="scope.row.data[41][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[41][`${forecast_attribute}`],
                    scope.$index,
                    42
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[41][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[41]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w43 ${getWeekendDates(43)}`"
          :class-name="checkIfPastWeek(43)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(43) == true"
              autofocus
              v-model="scope.row.data[42][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[42][`${forecast_attribute}`],
                    scope.$index,
                    43
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[42][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[42]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w44 ${getWeekendDates(44)}`"
          :class-name="checkIfPastWeek(44)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(44) == true"
              autofocus
              v-model="scope.row.data[43][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[43][`${forecast_attribute}`],
                    scope.$index,
                    44
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[43][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[43]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w45 ${getWeekendDates(45)}`"
          :class-name="checkIfPastWeek(45)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(45) == true"
              autofocus
              v-model="scope.row.data[44][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[44][`${forecast_attribute}`],
                    scope.$index,
                    45
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[44][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[44]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w46 ${getWeekendDates(46)}`"
          :class-name="checkIfPastWeek(46)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(46) == true"
              autofocus
              v-model="scope.row.data[45][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[45][`${forecast_attribute}`],
                    scope.$index,
                    46
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[45][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[45]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w47 ${getWeekendDates(47)}`"
          :class-name="checkIfPastWeek(47)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(47) == true"
              autofocus
              v-model="scope.row.data[46][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[46][`${forecast_attribute}`],
                    scope.$index,
                    47
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[46][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[46]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w48 ${getWeekendDates(48)}`"
          :class-name="checkIfPastWeek(48)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(48) == true"
              autofocus
              v-model="scope.row.data[47][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[47][`${forecast_attribute}`],
                    scope.$index,
                    48
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[47][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[47]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w49 ${getWeekendDates(49)}`"
          :class-name="checkIfPastWeek(49)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(49) == true"
              autofocus
              v-model="scope.row.data[48][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[48][`${forecast_attribute}`],
                    scope.$index,
                    49
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[48][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[48]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w50 ${getWeekendDates(50)}`"
          :class-name="checkIfPastWeek(50)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(50) == true"
              autofocus
              v-model="scope.row.data[49][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[49][`${forecast_attribute}`],
                    scope.$index,
                    50
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[49][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[49]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w51 ${getWeekendDates(51)}`"
          :class-name="checkIfPastWeek(51)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(51) == true"
              autofocus
              v-model="scope.row.data[50][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[50][`${forecast_attribute}`],
                    scope.$index,
                    51
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[50][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[50]) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="`w52 ${getWeekendDates(52)}`"
          :class-name="checkIfPastWeek(52)"
          align="right"
        >
          <template slot-scope="scope">
            <el-input
              v-if="isManualAdjustment && weekNo(52) == true"
              autofocus
              v-model="scope.row.data[51][`${forecast_attribute}`]"
              :disabled="isDisble"
              @blur="
                (e) =>
                  handleDataChange(
                    e,
                    forecast_attribute,
                    scope.row.data[51][`${forecast_attribute}`],
                    scope.$index,
                    52
                  )
              "
            >
            </el-input>
            <p v-else>
              {{ scope.row.data[51][`${forecast_attribute}`] | toLocaleStr }}
              {{ getPercent(forecast_attribute, scope.row.data[51]) }}
            </p>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <button
      class="btn btn-primary pull-right btn-sm"
      @click="handleManualAdjustment"
      v-if="!isManualAdjustment &&
      allowManualAdjustment"
      :disabled="getDisabledAdjustment"
    >
      Manual Adjustment
    </button>
    <button
      @click="submitManualAdjustment"
      class="btn btn-primary pull-right btn-sm"
      v-if="isValueChanged"
    >
      Submit Adjustment
    </button>
    <button
      class="btn btn-primary pull-right btn-sm"
      @click="discardChanges"
      v-if="isManualAdjustment"
    >
      Discard
    </button>
  </card>
</template>
<script>
import { Table, TableColumn } from "element-ui";
import Tags from "/components/Tags.vue";
import moment from "moment";

export default {
  name: "ForecastBySkuTable",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    Tags,
  },
  props: [
    "tableHeading",
    "allowManualAdjustment",
    "forecast_attribute",
    "topSkusData",
    "allAppliedFilters",
    "disbleAdjustment",
    "checkYear"
  ],
  data() {
    return {
      forecastData: [],
      isManualAdjustment: false,
      isDisble: false,
      isValueChanged: false,
      topSkusDataState: localStorage.getItem("topSkuLevelData"),
      
    };
  },
  computed: {
    getDisabledAdjustment() {
      return this.disbleAdjustment
    }
  },
  methods: {
    submitManualAdjustment() {
      this.isManualAdjustment = false;
      this.isDisble = true;
      this.$emit("createFilterAdjustment");
      this.isValueChanged = false;
    },

    handleManualAdjustment() {
      this.isManualAdjustment = true;
    },

    weekNo(num) {
      let year = new Date().getFullYear();
      if (year>=this.checkYear) {
        return (moment(new Date()).week()-1)<num;
      }
      else{
        return true
      }
    },

    discardChanges() {
      this.$emit("discardChanges");
      this.isManualAdjustment = false;
      this.isValueChanged = false;
      const elements = document.querySelectorAll(".filter-changed");
      elements.forEach(function(item) {
        item.classList.remove("filter-changed");
      });
    },

    handleDataChange(e, forecast_attribute, data, index, innerIndex) {
      console.log("inner", innerIndex);
      const idx = innerIndex - 1;
      const oldData = JSON.parse(
        localStorage.getItem("topSkuLevelData")
      );
      console.log(oldData,"oldData");
      if (Number(data) !== Number(oldData[`${forecast_attribute}`])) {
        this.isValueChanged = true;
        e.target.classList.add("filter-changed");
        e.target.style.border = "none";
        e.target.parentNode.parentNode.classList.add(
          "filter-changed"
        );
        this.$emit("getAdjustmentChanges", {
          adjusted_metrics_name: forecast_attribute,
          weekend: oldData?.weekend ? new Date(oldData?.weekend) : new Date(),
          before_adjustment_value: parseFloat(oldData[`${forecast_attribute}`]),
          new_adjusted_value: parseFloat(data),
          filter_skus: oldData?.sku,
        });
      }
    },

    getPercent(forecast_attribute, rowData) {
      if (forecast_attribute != "aur" && rowData[forecast_attribute] != 0) {
        let percent =
          (rowData[forecast_attribute] /
            rowData[`total_${forecast_attribute}`]) *
          100;
        return `(${percent.toFixed(2)}%)`;
      } else {
        return "";
      }
    },

    async getFilteredForecastData(forecastYear) {
      // const data = await this.$axios.$get(`/get-filtered-forecast-data/${forecastYear}`);
      // this.forecastData = data;
    },

    getWeekendDates(index) {
      return JSON.parse(window.localStorage.getItem("weekendDates"))
        ? `(${moment(
            JSON.parse(window.localStorage.getItem("weekendDates"))[index - 1]
          ).format("MM/DD/YYYY")})`
        : "";
    },

    checkIfPastWeek(index) {
      let className = "";
      if (moment(new Date()).week() > index && new Date().getFullYear()>=this.checkYear) {
        className = "disableWeek";
      }
      return className;
    },
  },
};
</script>
<style lang="scss">
.applied-filter-container {
  text-transform: capitalize;
  margin-bottom: 10px;

  h5 {
    margin-bottom: 10px;
  }
}
.disableWeek {
  background: #e8e8e8;
}
.filter-changed {
  background-color: rgb(233, 206, 140);
}
</style>

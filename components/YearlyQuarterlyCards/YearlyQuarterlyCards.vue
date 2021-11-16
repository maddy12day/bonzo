<template>
  <div class="card mb-0">
    <div class="card-header card-chart card-header-success">
      <div class="ct-chart font-weight-bold" id="completedTasksChart">
        {{ title | capitalize }}
      </div>
    </div>
    <div class="card-body">
      <h5
        class="card-category"
        :class="
          !units || (units == 0 && isAPIFetchComplete)
            ? 'empty-stats-parent'
            : ''
        "
      >
        Units:
        <span
          v-if="title === 'Planned'"
          class="text-info display-4 font-weight-normal"
        >
          <span v-if="units && isAPIFetchComplete">
            <!-- {{ units | toLocaleStr }} -->
            {{beauty(units)}}
          </span>
          <span
            class=""
            v-else-if="!units && isAPIFetchComplete"
          >
            &nbsp; -
          </span>
          <span v-else-if="!isAPIFetchComplete">
            <i class="el-icon-loading"></i>
          </span>
        </span>
        <span
          v-if="['2021','2022'].includes(title) "
          class="text-info display-4 font-weight-normal"
        >
          <span v-if="units && isAPIFetchComplete">
            <!-- {{ units | toLocaleStr }} -->
            {{beauty(units)}}
          </span>
          <span
            class="empty-stats"
            v-else-if="!units && isAPIFetchComplete"
          >
            &nbsp; -
          </span>
          <span v-else-if="!isAPIFetchComplete">
            <i class="el-icon-loading"></i>
          </span>
        </span>

        <span
          v-if="title === 'Forecast'"
          class="text-info display-4 font-weight-normal"
        >
          <span v-if="units && units !== '0' && isAPIFetchComplete">
            <!-- {{ units | toLocaleStr }} -->
            {{beauty(units)}}
          </span>
          <span
            class="empty-stats"
            v-else-if="!units && isAPIFetchComplete"
          >
            &nbsp; -
          </span>
          <span v-else-if="!isAPIFetchComplete">
            <i class="el-icon-loading"></i>
          </span>
        </span>
      </h5>
      <h5
        class="card-category"
        :class="
          !units || (units == 0 && isAPIFetchempty - stats - parentComplete)
            ? 'empty-stats-parent'
            : ''
        "
      >
        Revenue:
        <span
          v-if="title === 'Planned'"
          class="text-info display-4 font-weight-normal"
        >
          <span v-if="revenue && isAPIFetchComplete">
            <!-- $ {{ revenue | toLocaleStr }} -->
            ${{beauty(revenue)}}
          </span>
          <span
            class="empty-stats"
            v-else-if="!revenue && isAPIFetchComplete"
          >
            &nbsp; -
          </span>
          <span v-else-if="!isAPIFetchComplete">
            <i class="el-icon-loading"></i>
          </span>
        </span>
        <span
          v-if="['2021','2022'].includes(title) "
          class="text-info display-4 font-weight-normal"
        >
          <span v-if="revenue && isAPIFetchComplete">
            <!-- $ {{ revenue | toLocaleStr }} -->
            ${{beauty(revenue)}}
          </span>
          <span
            class="empty-stats"
            v-else-if="!revenue && isAPIFetchComplete"
          >
            &nbsp; -
          </span>
          <span v-else-if="!isAPIFetchComplete">
            <i class="el-icon-loading"></i>
          </span>
        </span>
        <span
          v-if="title === 'Forecast'"
          class="text-info display-4 font-weight-normal"
        >
          <span v-if="revenue && revenue !== '0' && isAPIFetchComplete">
            <!-- $ {{ revenue | toLocaleStr }} -->
            ${{beauty(revenue)}}
          </span>
          <span
            class="empty-stats"
            v-else-if="!revenue && isAPIFetchComplete"
          >
            &nbsp; -
          </span>
          <span v-else-if="!isAPIFetchComplete">
            <i class="el-icon-loading"></i>
          </span>
        </span>
      </h5>
    </div>
  </div>
</template>
<script>
import numberAbbreviate from "number-abbreviate";
export default {
  name: "yearlyQuarterlyCard",
  props: ["title", "units", "revenue"],
  computed: {
    isAPIFetchComplete() {
      return this.$store.state.isAPIFetchComplete;
    },
  },
    methods: {
    beauty(payload) {
      var numabbr = new numberAbbreviate(['K','M','B']);
      return numabbr.abbreviate(payload, 1);
    },
  },
};
</script>

<style>
.empty-stats {
  display: inline-block;
  /* margin-top: 4px; */
  line-height: 1;
  font-size: 20px;
}

.empty-stats-parent {
  display: flex;
  align-items: center;
}
</style>

<template>
  <div class="card mb-0">
    <div class="card-header card-chart card-header-success">
      <div class="ct-chart font-weight-bold" id="completedTasksChart">
        {{ title | capitalize }}
      </div>
    </div>
    <div class="card-body">
      <h5 class="card-category">
        Units:
        <span
          v-if="title === 'Planned'"
          class="text-info display-4 font-weight-normal"
        >
          <span v-if="units && isAPIFetchComplete">
            {{ units | toLocaleStr }}
          </span>
          <span v-else-if="!units && isAPIFetchComplete">
            -
          </span>
          <span v-else-if="!isAPIFetchComplete">
            <i class="el-icon-loading"></i>
          </span>
        </span>
        <span
          v-if="title === 'This Year'"
          class="text-danger display-4 font-weight-normal"
        >
          <span v-if="units && isAPIFetchComplete">
            {{ units | toLocaleStr }}
          </span>
          <span v-else-if="!units && isAPIFetchComplete">
            -
          </span>
          <span v-else-if="!isAPIFetchComplete">
            <i class="el-icon-loading"></i>
          </span>
        </span>

        <span
          v-if="title === 'Forecast'"
          class="text-warning display-4 font-weight-normal"
        >
         <span v-if="units && isAPIFetchComplete">
            {{ units | toLocaleStr }}
          </span>
          <span v-else-if="!units && isAPIFetchComplete">
            -
          </span>
          <span v-else-if="!isAPIFetchComplete">
            <i class="el-icon-loading"></i>
          </span>
        </span>
      </h5>
      <h5 class="card-category">
        Revenue:
        <span
          v-if="title === 'Planned'"
          class="text-info display-4 font-weight-normal"
        >
          <span v-if="revenue && isAPIFetchComplete"> 
            $ {{ revenue | toLocaleStr }} 
          </span>
          <span v-else-if="!revenue && isAPIFetchComplete">
            -
          </span>
          <span v-else-if="!isAPIFetchComplete">
            <i class="el-icon-loading"></i>
          </span>
        </span>
        <span
          v-if="title === 'This Year'"
          class="text-danger display-4 font-weight-normal"
        >
          <span v-if="revenue && isAPIFetchComplete"> 
            $ {{ revenue | toLocaleStr }} 
          </span>
          <span v-else-if="!revenue && isAPIFetchComplete">
            -
          </span>
          <span v-else-if="!isAPIFetchComplete">
            <i class="el-icon-loading"></i>
          </span>
        </span>
        <span
          v-if="title === 'Forecast'"
          class="text-warning display-4 font-weight-normal"
        >
          <span v-if="revenue && isAPIFetchComplete"> 
            $ {{ revenue | toLocaleStr }} 
          </span>
          <span v-else-if="!revenue && isAPIFetchComplete">
            -
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
export default {
  name: "yearlyQuarterlyCard",
  props: ["title", "units", "revenue"],
  computed: {
    isAPIFetchComplete() {
      return this.$store.state.isAPIFetchComplete
    },
  }
};
</script>

<template>
  <div class="card mb-0">
    <div class="card-header card-chart card-header-success">
      <div class="ct-chart" id="completedTasksChart"></div>
    </div>
    <div class="card-body">
      <h4 class="card-title font-weight-bold">{{ title | capitalize }}</h4>
      <h5 class="card-category">
        Units -
        <span class="text-white display-4 font-weight-normal">{{
          units | toLocaleStr
        }}</span>
      </h5>
      <h5 class="card-category">
        Revenue -
        <span class="text-white display-4 font-weight-normal">{{
          revenue | toLocaleStr
        }}</span>
      </h5>
    </div>
  </div>
</template>
<script>
export default {
  name: "yearlyQuarterlyCard",
  props: ["title", "units", "revenue"],
};
</script>

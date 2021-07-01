<template>
  <div class="card">
    <div class="card-header card-chart card-header-success">
      <div class="ct-chart" id="completedTasksChart"></div>
    </div>
    <div class="card-body">
      <h4 class="card-title text-bold">{{ title | capitalize }}</h4>
      <h4 class="card-category font-weight-bold">
        Units - {{ units | toLocaleStr }}
      </h4>
      <h4 class="card-category font-weight-bold">
        Revenue - {{ revenue | toLocaleStr }}
      </h4>
    </div>
  </div>
</template>
<script>
export default {
  name: "yearlyQuarterlyCard",
  props: ["title", "units", "revenue"],
};
</script>

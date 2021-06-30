<template>
  <div class="card">
    <div class="card-header card-chart card-header-success">
      <div class="ct-chart" id="completedTasksChart"></div>
    </div>
    <div class="card-body">
      <h4 class="card-title text-bold">{{ title }}</h4>
      <h4 class="card-category font-weight-bold">{{ units }}</h4>
      <h4 class="card-category font-weight-bold">{{ revenue }}</h4>
    </div>
  </div>
</template>
<script>
export default {
  name: "yearlyQarterlyCard",
  props: ["title", "units", "revenue"],
};
</script>

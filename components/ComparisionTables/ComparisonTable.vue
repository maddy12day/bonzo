<template>
  <div class="card py-3">
    <div class="card-body comparision-table">
      <table class="table table-stripped table-bordered">
        <thead>
          <tr class="text-center">
            <th></th>
            <th class="" colspan="2">Total</th>
            <th class="" colspan="2">Ecomm</th>
            <th class="" colspan="2">Retail</th>
          </tr>
          <tr>
            <th>Name</th>
            <th>Units</th>
            <th>Revenue</th>
            <th>Units</th>
            <th>Revenue</th>
            <th>Units</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td>{{ row.total.collection }}</td>
            <td>{{ row.total.total_units }}</td>
            <td>{{ row.total.total_revenue }}</td>
            <td>{{ row.ecomm.total_units }}</td>
            <td>{{ row.ecomm.total_revenue }}</td>
            <td>{{ row.retail.total_units }}</td>
            <td>{{ row.retail.total_revenue }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "ComparisonTable",
  props: ["tableData"],
};
</script>
<style scoped>
.comparision-table {
    height: 400px;
    overflow-y: scroll;
}
</style>

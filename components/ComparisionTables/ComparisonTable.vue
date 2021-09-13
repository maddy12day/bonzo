<template>
  <div class="card py-3">
    
    <div class="card-body comparision-table">
      <h3> {{jsonkey}} comparison</h3>
      <table class="table table-stripped table-bordered">
        <thead>
          <tr class="text-center">
            <th></th>
            <th
              class="border-left border-right border-muted border-bottom"
              colspan="2"
            >
              Total
            </th>
            <th
              class="border-left border-right border-muted border-bottom"
              colspan="2"
            >
              Ecomm
            </th>
            <th
              class="border-left border-right border-muted border-bottom"
              colspan="2"
            >
              Retail
            </th>
          </tr>
          <tr class="text-right">
            <th class="text-left">Name</th>
            <th class="border-left border-muted">Units</th>
            <th class="border-right border-muted">Revenue</th>
            <th class="border-left border-muted">Units</th>
            <th class="border-right border-muted">Revenue</th>
            <th class="border-left border-muted">Units</th>
            <th class="border-right border-muted">Revenue</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td>{{ row.total[jsonkey] | toLocaleStr }}</td>
            <td class="text-right">
              {{ row.total.total_units | toLocaleStr }}
            </td>
            <td class="text-right">
              {{ row.total.total_revenue | toLocaleStr }}
            </td>
            <td class="text-right">
              {{ row.ecomm.total_units | toLocaleStr }}
            </td>
            <td class="text-right">
              {{ row.ecomm.total_revenue | toLocaleStr }}
            </td>
            <td class="text-right">
              {{ row.retail.total_units | toLocaleStr }}
            </td>
            <td class="text-right">
              {{ row.retail.total_revenue | toLocaleStr }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "ComparisonTable",
  props: ["tableData","jsonkey"],
};
</script>
<style scoped>
.comparision-table {
  height: 400px;
  overflow-y: scroll;
}
</style>

<template>
  <div>
    <h1>Forecast page</h1>
    <!-- Filters component (Vishal) -->
    <!-- Applied filters pills (Vishal) -->
    <!-- Base Year/Quarter Stats / Filtered Year/Quarter Stats (Vishal) -->
    <!-- Base Metrics / Filtered Metrics (Jubin) -->
    <!-- Filter: Revenue table (Jubin) -->
    <!-- Filter: Units table (Jubin) -->
    <!-- Filter: AUR table (Jubin) -->
    <RegularFilters />
  </div>
</template>

<script>
import RegularFilters from "../components/Filters/RegularFilter.vue";
export default {
  name: "Forecast",
  components: {
    RegularFilters,
  },

  data() {
    return {};
  },
};
</script>

<style></style>

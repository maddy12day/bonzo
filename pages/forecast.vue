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
    <div class="col-md-12 text-right">
      <div class="btn-group btn-group-toggle p-0 mb-2" data-toggle="buttons">
        <label
          v-for="(option, index) in filtersType"
          :key="option.name"
          class="btn btn-sm btn-primary btn-simple"
          :id="index"
          :class="{ active: activeFilterType == option.name }"
        >
          <input
            type="radio"
            name="options"
            autocomplete="off"
            checked=""
            @click="showFilterType(option.name)"
          />
          <span class="d-none d-sm-block">{{ option.name }}</span>
          <span class="d-block d-sm-none">
            <i :class="option.icon"></i>
          </span>
        </label>
      </div>
      <RegularFilters
        :showAplyFilterBtn="true"
        v-if="activeFilterType == 'Regular'"
      />
      <ProgramFilters
        :showAplyFilterBtn="true"
        v-if="activeFilterType == 'Program'"
      />
    </div>
  </div>
</template>

<script>
import RegularFilters from "../components/Filters/RegularFilter.vue";
import ProgramFilters from "../components/Filters/ProgramFilter.vue";
export default {
  name: "Forecast",
  components: {
    RegularFilters,
    ProgramFilters,
  },

  data() {
    return {
      activeFilterType: "Regular",
    };
  },
  methods: {
    showFilterType(type) {
      this.activeFilterType = type;
    },
  },
  computed: {
    filtersType() {
      return [
        { name: "Regular", icon: "tim-icons icon-single-02" },
        {
          name: "Program",
          icon: "tim-icons icon-gift-2",
        },
      ];
    },
  },
};
</script>

<style></style>

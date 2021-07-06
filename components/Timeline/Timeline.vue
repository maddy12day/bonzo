<template>
  <div>
    <div md="12" class="pl-2 ">
      <div
        style="display:inline-block;width:100%;overflow: auto;"
        class="pt-5 custom-timeline-container"
      >
        <ul class="timeline timeline-horizontal pb-0 mb-0">
          <li class="timeline-item">
            <div class="timeline-badge primary">
              <i class="glyphicon glyphicon-check"></i>
            </div>
            <div class="timeline-panel">
              <div class="timeline-heading">
                <h4 class="timeline-title">Genesis Node</h4>
                <p>
                  <small class="text-muted"
                    ><i class="glyphicon glyphicon-time"></i>
                    {{ formatData(genesisTimeLineNode.genesis_time) }}</small
                  >
                </p>
              </div>
              <div class="timeline-body">
                <p>Run ID: {{ genesisTimeLineNode.genesis_id }}</p>
                <p>God User: {{ genesisTimeLineNode.god_user }}</p>
                <p>
                  <button class="btn btn-dark btn-sm mr-1">
                    View details
                  </button>
                  <!--  @click="() => getGenesisData(genesisTimeLineNode)" -->
                  <!--  <base-button
                  @click="() => genesisAdjustmentDetails(genesisTimeLineNode)"
                  v-if="genesisTimeLineNode.adjustment_count > 0"
                  type="primary"
                  size='sm'
                  class="btn-small"
                >
                  Adjustments &nbsp;<badge type="info" >
                    {{ genesisTimeLineNode.adjustment_count }}</badge
                  >
                </base-button> -->
                </p>
              </div>
            </div>
          </li>
          <li
            class="timeline-item"
            v-for="(data, index) in timeLineData"
            :key="index"
          >
            <div class="timeline-badge success">
              <i class="glyphicon glyphicon-check"></i>
            </div>
            <div class="timeline-panel">
              <div class="timeline-heading">
                <h4 class="timeline-title">{{ data.scenario_name }}</h4>
                <p>
                  <small class="text-muted"
                    ><i class="glyphicon glyphicon-time"></i> Merged at:
                    {{ formatData(data.merged_at) }}</small
                  >
                </p>
              </div>
              <div class="timeline-body">
                <p>Run ID: {{ data.id }}</p>
                <p>Planner Name: {{ data.first_name }} {{ data.last_name }}</p>
                <p>
                  Scenario Type: {{ data.scenario_type }} ({{ data.amount }}%)
                </p>
                <p>Start Date: {{ dateFormat(data.start_date) }}</p>
                <p>End Date: {{ dateFormat(data.end_date) }}</p>
                <p>
                  <button
                    class="btn btn-dark  btn-sm mr-1"
                    @click="() => handleScenarioClick(data)"
                  >
                    View details
                  </button>
                  <button
                    v-if="data.adjustment_count > 0"
                    class="btn btn-info btn-sm mr-1"
                    @click="() => showAdjustments(data)"
                  >
                    Adjustments
                    <i class="ml-1 p-1 badge badge-light">
                      {{ data.amount }}
                    </i>
                  </button>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- Scenario Forecast Preview -->
      <PreviewScenario
        v-if="dialogVisible"
        @dialogVisible="closeDialog"
        :dialogVisible="dialogVisible"
        :scenarioSalesSummary="scenarioSalesSummary"
        :scenarioUnitSalesComparison="scenarioUnitSalesComparison"
        :scenarioCategorySalesComparison="scenarioCategorySalesComparison"
        :scenarioCategoryComparison="scenarioCategoryComparison"
        :previewBtnText="'Unmerge'"
      />
    </div>
  </div>
</template>
<script>
import moment from "moment";
import PreviewScenario from "../Scenarios/PreviewScenario.vue";
export default {
  name: "TimeLine",
  components: {
    PreviewScenario,
  },
  data() {
    return {
      scenarioTableDataForTable: [],
      loadTable: false,
      dialogVisible: false,
      scenarioSalesSummary: [],
      scenarioUnitSalesComparison: [],
      scenarioCategorySalesComparison: [],
      scenarioCategoryComparison: [],
      currentScenarioId: null,
      page: 1,
      pageSize: 3,
      typeColor: ["", "info", "success", "warning", "danger"],
    };
  },
  props: [
    "genesisTimeLineNode",
    "timeLineData",
    "showUnmergeBtn",
    "showAdjustmentsEvt",
  ],
  methods: {
    closeDialog() {
      this.dialogVisible = false;
    },
    async handleScenarioClick(data) {
      this.currentScenarioId = data.id;
      console.log("data--", this.dialogVisible);
      this.scenarioSalesSummary = await this.$axios.$get(
        `/get-scenario-sales-summary/${data.id}`
      );
      this.scenarioUnitSalesComparison = await this.$axios.$get(
        `/get-scenario-unit-sales-comparison/${data.id}`
      );
      this.scenarioCategorySalesComparison = await this.$axios.$get(
        `/get-scenario-category-sales-comparison/${data.id}`
      );
      this.scenarioCategoryComparison = await this.$axios.$get(
        `/get-scenario-category-comparison/${data.id}`
      );
      this.dialogVisible = true;
    },

    sendCurrentObject(data) {
      this.$emit("customTimelineEvent", data);
    },
    formatData(date) {
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    dateFormat(date) {
      return moment(date).format("YYYY-MM-DD");
    },
  },
};
</script>
<style scoped>
.timeline,
.timeline-horizontal {
  list-style: none;
  padding: 20px;
  position: relative;
}
.timeline:before {
  top: 40px;
  bottom: 0;
  position: absolute;
  content: " ";
  width: 3px;
  background-color: #eeeeee;
  left: 50%;
  margin-left: -1.5px;
}
.timeline .timeline-item .timeline-badge {
  left: 58px !important;
}
.timeline .timeline-item {
  margin-bottom: 20px;
  position: relative;
}
.timeline .timeline-item:before,
.timeline .timeline-item:after {
  content: "";
  display: table;
}
.timeline .timeline-item:after {
  clear: both;
}
.timeline .timeline-item .timeline-badge {
  color: #fff;
  width: 27px;
  height: 27px;
  line-height: 52px;
  font-size: 22px;
  text-align: center;
  position: absolute;
  top: 18px;
  left: 50%;
  margin-left: -25px;
  background-color: #7c7c7c;
  border: 3px solid #ffffff;
  z-index: 100;
  border-top-right-radius: 50%;
  border-top-left-radius: 50%;
  border-bottom-right-radius: 50%;
  border-bottom-left-radius: 50%;
}
.timeline .timeline-item .timeline-badge i,
.timeline .timeline-item .timeline-badge .fa,
.timeline .timeline-item .timeline-badge .glyphicon {
  top: 2px;
  left: 0px;
}
.timeline .timeline-item .timeline-badge.primary {
  background-color: #1f9eba;
}
.timeline .timeline-item .timeline-badge.info {
  background-color: #5bc0de;
}
.timeline .timeline-item .timeline-badge.success {
  background-color: #59ba1f;
}
.timeline .timeline-item .timeline-badge.dark {
  background-color: #d1bd10;
}
.timeline .timeline-item .timeline-badge.danger {
  background-color: #ba1f1f;
}
.timeline .timeline-item .timeline-panel {
  position: relative;
  width: 59%;
  float: left;
  right: 16px;

  border: 1px solid #c0c0c0;
  background: #ffffff;
  border-radius: 2px;
  padding: 10px;
  -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);
}
.timeline .timeline-item .timeline-panel:before {
  position: absolute;
  top: 26px;
  right: -16px;
  display: inline-block;
  border-top: 16px solid transparent;
  border-left: 16px solid #c0c0c0;
  border-right: 0 solid #c0c0c0;
  border-bottom: 16px solid transparent;
  content: " ";
}
.timeline .timeline-item .timeline-panel .timeline-title {
  margin-top: 0;
  color: inherit;
}
.timeline .timeline-item .timeline-panel .timeline-body > p,
.timeline .timeline-item .timeline-panel .timeline-body > ul {
  margin-bottom: 0;
}
.timeline .timeline-item .timeline-panel .timeline-body > p + p {
  margin-top: 5px;
}
.timeline .timeline-item:last-child:nth-child(even) {
  float: right;
}
.timeline .timeline-item:nth-child(even) .timeline-panel {
  float: right;
  left: 16px;
}
.timeline .timeline-item:nth-child(even) .timeline-panel:before {
  border-left-width: 0;
  border-right-width: 14px;
  left: -14px;
  right: auto;
}
.timeline-horizontal {
  list-style: none;
  position: relative;
  padding: 10px 0px 10px 0px;
  display: inline-block;
}
.timeline-horizontal:before {
  height: 3px;
  top: auto;
  bottom: 8px;
  left: 56px;
  right: 0;
  width: 100%;
  margin-bottom: 20px;
}
.timeline-horizontal .timeline-item {
  display: table-cell;
  height: 280px;
  width: 20%;
  min-width: 320px;
  float: none !important;
  padding-left: 0px;
  padding-right: 17px;
  margin: 0 auto;
  vertical-align: bottom;
}
.timeline-horizontal .timeline-item .timeline-panel {
  top: auto;
  bottom: 64px;
  display: inline-block;
  float: none !important;
  left: 0 !important;
  right: 0 !important;
  width: 100%;
  margin-bottom: 20px;
}
.timeline-horizontal .timeline-item .timeline-panel:before {
  top: auto;
  bottom: -16px;
  left: 28px !important;
  right: auto;
  border-right: 16px solid transparent !important;
  border-top: 16px solid #c0c0c0 !important;
  border-bottom: 0 solid #c0c0c0 !important;
  border-left: 16px solid transparent !important;
}
.timeline-horizontal .timeline-item:before,
.timeline-horizontal .timeline-item:after {
  display: none;
}
.timeline-horizontal .timeline-item .timeline-badge {
  top: auto;
  bottom: 16px;
  left: 39px;
}
.custom-badge {
  border-radius: 50%;
}
/* ================================================== */
</style>

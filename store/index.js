export const state = () => ({
  regularFilterCTADisabled: false,
  hideRegularFilterResetCTA: true,
  programFilterCTADisabled: false,
  appliedRegularFilter: [],
  isDataLoading: false,
  isAPIFetchComplete: false,
  key: 1
});

export const mutations = {
  reRender(state) {
    state.key = Math.random();
  },
  toggleCTAState(state) {
    state.regularFilterCTADisabled = !state.regularFilterCTADisabled;
  },
  toggleProgramFilterCTAState(state) {
    state.programFilterCTADisabled = !state.regularFilterCTADisabled;
  },
  toggleFilterResetCTAState(state) {
    state.hideRegularFilterResetCTA = !state.hideRegularFilterResetCTA;
  },
  updateRegularFilter(state, payload) {
    state.appliedRegularFilter = payload
  },
  updateLoadingstate(state, payload) {
    state.isDataLoading = payload
  },
  toggleStatsAPIResponseState(state, payload) {
    state.isAPIFetchComplete = payload
  }
};

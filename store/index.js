export const state = () => ({
  regularFilterCTADisabled: false,
  hideRegularFilterResetCTA: true,
  programFilterCTADisabled: false,
  appliedRegularFilter: []
});

export const mutations = {
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
  }
};

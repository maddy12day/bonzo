export const state = () => ({
  regularFilterCTADisabled: false,
  hideRegularFilterResetCTA: true,
  appliedRegularFilter: []
});

export const mutations = {
  toggleCTAState(state) {
    state.regularFilterCTADisabled = !state.regularFilterCTADisabled;
  },
  toggleFilterResetCTAState(state) {
    state.hideRegularFilterResetCTA = !state.hideRegularFilterResetCTA;
  },
  updateRegularFilter(state, payload) {
    state.appliedRegularFilter = payload
  }
};

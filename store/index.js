export const state = () => ({
  regularFilterCTADisabled: false,
});

export const mutations = {
  toggleCTAState(state) {
    state.regularFilterCTADisabled = !state.regularFilterCTADisabled;
  },
};

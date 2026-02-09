export default {
  SET_HORSES(state, horses) {
    state.horses = horses
  },
  SET_SCHEDULE(state, schedule) {
    state.schedule = schedule
    state.roundResults = []
    state.currentRoundIndex = null
  },
  SET_CURRENT_ROUND(state, index) {
    state.currentRoundIndex = index
  },
  APPEND_ROUND_RESULT(state, result) {
    state.roundResults.push(result)
  },
  SET_PHASE(state, phase) {
    state.phase = phase
  },
  RESET(state) {
    state.schedule = []
    state.currentRoundIndex = null
    state.roundResults = []
    state.phase = 'idle'
  },
}

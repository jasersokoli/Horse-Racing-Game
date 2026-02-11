export default {
  SET_HORSES(state, horses) {
    state.horses = horses
  },
  SET_SCHEDULE(state, schedule) {
    state.schedule = schedule
    state.roundResults = []
    state.currentRoundIndex = null
    state.pendingRoundResult = null
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
  SET_PENDING_ROUND_RESULT(state, result) {
    state.pendingRoundResult = result
  },
  RESET(state) {
    state.schedule = []
    state.currentRoundIndex = null
    state.roundResults = []
    state.pendingRoundResult = null
    state.phase = 'idle'
  },
}

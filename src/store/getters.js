import { ROUND_LENGTHS_M } from '../config'

export default {
  horses: (state) => state.horses,
  schedule: (state) => state.schedule,
  currentRoundIndex: (state) => state.currentRoundIndex,
  roundResults: (state) => state.roundResults,
  pendingRoundResult: (state) => state.pendingRoundResult,
  phase: (state) => state.phase,
  currentRound: (state) => {
    if (state.currentRoundIndex == null || state.currentRoundIndex >= state.schedule.length) return null
    return state.schedule[state.currentRoundIndex]
  },
  isScheduleGenerated: (state) => state.schedule.length === ROUND_LENGTHS_M.length,
  allRoundsComplete: (state) =>
    state.schedule.length === ROUND_LENGTHS_M.length && state.roundResults.length === ROUND_LENGTHS_M.length,
}

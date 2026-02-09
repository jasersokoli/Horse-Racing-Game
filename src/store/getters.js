export default {
  horses: (state) => state.horses,
  schedule: (state) => state.schedule,
  currentRoundIndex: (state) => state.currentRoundIndex,
  roundResults: (state) => state.roundResults,
  phase: (state) => state.phase,
  currentRound: (state) => {
    if (state.currentRoundIndex == null || state.currentRoundIndex >= state.schedule.length) return null
    return state.schedule[state.currentRoundIndex]
  },
  isScheduleGenerated: (state) => state.schedule.length === 6,
  allRoundsComplete: (state) =>
    state.schedule.length === 6 && state.roundResults.length === 6,
}

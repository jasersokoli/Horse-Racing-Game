import { TOTAL_HORSES, HORSES_PER_ROUND, ROUND_LENGTHS_M, RACE_ANIMATION_DURATION_MS } from '../config'

const MUTATIONS = {
  SET_HORSES: 'SET_HORSES',
  SET_SCHEDULE: 'SET_SCHEDULE',
  SET_CURRENT_ROUND: 'SET_CURRENT_ROUND',
  APPEND_ROUND_RESULT: 'APPEND_ROUND_RESULT',
  SET_PENDING_ROUND_RESULT: 'SET_PENDING_ROUND_RESULT',
  SET_PHASE: 'SET_PHASE',
  RESET: 'RESET',
}

const COLORS = [
  '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4',
  '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff',
  '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1',
  '#000075', '#808080',
]

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default {
  generateHorses({ commit }) {
    const horses = Array.from({ length: TOTAL_HORSES }, (_, i) => ({
      id: i + 1,
      color: COLORS[i % COLORS.length],
      condition: randomInt(1, 100),
    }))
    commit(MUTATIONS.SET_HORSES, horses)
    commit(MUTATIONS.RESET)
  },

  generateSchedule({ state, commit }) {
    if (state.horses.length === 0) return
    const schedule = ROUND_LENGTHS_M.map((length, index) => {
      const ids = shuffle(state.horses.map((h) => h.id)).slice(0, HORSES_PER_ROUND)
      return { roundNumber: index + 1, length, horseIds: ids }
    })
    commit(MUTATIONS.SET_SCHEDULE, schedule)
    commit(MUTATIONS.SET_PHASE, 'scheduled')
  },

  async runRound({ state, commit }, payload) {
    const roundIndex = typeof payload === 'number' ? payload : payload.roundIndex
    const durationMs = typeof payload === 'object' && payload.durationMs != null ? payload.durationMs : RACE_ANIMATION_DURATION_MS
    const round = state.schedule[roundIndex]
    if (!round) return

    const horsesInRound = round.horseIds.map((id) =>
      state.horses.find((h) => h.id === id)
    ).filter(Boolean)
    const finishOrder = horsesInRound
      .map((h) => ({
        horseId: h.id,
        color: h.color,
        condition: h.condition,
        score: h.condition * (0.7 + Math.random() * 0.6),
      }))
      .sort((a, b) => b.score - a.score)
      .map((r, i) => ({ ...r, position: i + 1 }))

    const result = {
      roundNumber: round.roundNumber,
      length: round.length,
      finishOrder,
    }
    commit(MUTATIONS.SET_PENDING_ROUND_RESULT, result)
    commit(MUTATIONS.SET_CURRENT_ROUND, roundIndex)
    commit(MUTATIONS.SET_PHASE, 'racing')

    await new Promise((r) => setTimeout(r, durationMs))

    commit(MUTATIONS.APPEND_ROUND_RESULT, result)
    commit(MUTATIONS.SET_PENDING_ROUND_RESULT, null)

    if (roundIndex >= state.schedule.length - 1) {
      commit(MUTATIONS.SET_PHASE, 'idle')
      commit(MUTATIONS.SET_CURRENT_ROUND, null)
    } else {
      commit(MUTATIONS.SET_CURRENT_ROUND, null)
      commit(MUTATIONS.SET_PHASE, 'scheduled')
    }
  },

  async startRaces({ state, dispatch }, options = {}) {
    if (state.schedule.length === 0) return
    const durationMs = options.durationMs != null ? options.durationMs : undefined
    for (let i = 0; i < state.schedule.length; i++) {
      const payload = durationMs != null ? { roundIndex: i, durationMs } : i
      await dispatch('runRound', payload)
    }
  },
}

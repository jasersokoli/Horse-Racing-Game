import { createStore } from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'

function createTestStore() {
  return createStore({
    state: JSON.parse(JSON.stringify(state)),
    getters,
    mutations,
    actions: {},
  })
}

describe('store mutations', () => {
  let store

  beforeEach(() => {
    store = createTestStore()
  })

  it('SET_HORSES sets horses', () => {
    const horses = [{ id: 1, color: '#f00', condition: 80 }]
    store.commit('SET_HORSES', horses)
    expect(store.state.horses).toEqual(horses)
  })

  it('SET_SCHEDULE sets schedule and resets round state', () => {
    store.state.currentRoundIndex = 2
    store.state.roundResults = [{}]
    store.state.pendingRoundResult = {}
    const schedule = [
      { roundNumber: 1, length: 1200, horseIds: [1, 2] },
    ]
    store.commit('SET_SCHEDULE', schedule)
    expect(store.state.schedule).toEqual(schedule)
    expect(store.state.currentRoundIndex).toBeNull()
    expect(store.state.roundResults).toEqual([])
    expect(store.state.pendingRoundResult).toBeNull()
  })

  it('SET_CURRENT_ROUND sets currentRoundIndex', () => {
    store.commit('SET_CURRENT_ROUND', 1)
    expect(store.state.currentRoundIndex).toBe(1)
  })

  it('APPEND_ROUND_RESULT adds to roundResults', () => {
    const result = { roundNumber: 1, length: 1200, finishOrder: [] }
    store.commit('APPEND_ROUND_RESULT', result)
    expect(store.state.roundResults).toHaveLength(1)
    expect(store.state.roundResults[0]).toEqual(result)
  })

  it('SET_PHASE updates phase', () => {
    store.commit('SET_PHASE', 'racing')
    expect(store.state.phase).toBe('racing')
  })

  it('SET_PENDING_ROUND_RESULT sets pendingRoundResult', () => {
    const result = { roundNumber: 1, finishOrder: [] }
    store.commit('SET_PENDING_ROUND_RESULT', result)
    expect(store.state.pendingRoundResult).toEqual(result)
  })

  it('RESET clears schedule and round state', () => {
    store.state.schedule = [{ roundNumber: 1 }]
    store.state.currentRoundIndex = 0
    store.state.roundResults = [{}]
    store.state.pendingRoundResult = {}
    store.state.phase = 'scheduled'
    store.commit('RESET')
    expect(store.state.schedule).toEqual([])
    expect(store.state.currentRoundIndex).toBeNull()
    expect(store.state.roundResults).toEqual([])
    expect(store.state.pendingRoundResult).toBeNull()
    expect(store.state.phase).toBe('idle')
  })
})

import { createStore } from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'

function createTestStore() {
  return createStore({
    state: { ...state },
    getters,
    mutations,
    actions: {},
  })
}

describe('store state and getters', () => {
  let store

  beforeEach(() => {
    store = createTestStore()
  })

  it('has initial phase idle', () => {
    expect(store.state.phase).toBe('idle')
  })

  it('has empty horses and schedule initially', () => {
    expect(store.state.horses).toEqual([])
    expect(store.state.schedule).toEqual([])
  })

  it('currentRound returns null when no round set', () => {
    expect(store.getters.currentRound).toBeNull()
  })

  it('isScheduleGenerated is false when schedule length is not 6', () => {
    expect(store.getters.isScheduleGenerated).toBe(false)
  })
})

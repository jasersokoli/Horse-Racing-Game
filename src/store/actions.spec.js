import { createStore } from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

function createTestStore() {
  return createStore({
    state: JSON.parse(JSON.stringify(state)),
    getters,
    mutations,
    actions,
  })
}

describe('store actions', () => {
  let store

  beforeEach(() => {
    store = createTestStore()
  })

  it('generateHorses creates 20 horses with color and condition', async () => {
    await store.dispatch('generateHorses')
    expect(store.state.horses).toHaveLength(20)
    store.state.horses.forEach((h, i) => {
      expect(h.id).toBe(i + 1)
      expect(h.color).toBeDefined()
      expect(typeof h.condition).toBe('number')
      expect(h.condition).toBeGreaterThanOrEqual(1)
      expect(h.condition).toBeLessThanOrEqual(100)
    })
  })

  it('generateSchedule does nothing when no horses', async () => {
    await store.dispatch('generateSchedule')
    expect(store.state.schedule).toHaveLength(0)
  })

  it('generateSchedule creates 6 rounds when horses exist', async () => {
    await store.dispatch('generateHorses')
    await store.dispatch('generateSchedule')
    expect(store.state.schedule).toHaveLength(6)
    const lengths = [1200, 1400, 1600, 1800, 2000, 2200]
    store.state.schedule.forEach((round, i) => {
      expect(round.roundNumber).toBe(i + 1)
      expect(round.length).toBe(lengths[i])
      expect(round.horseIds).toHaveLength(10)
    })
    expect(store.state.phase).toBe('scheduled')
  })

  it('startRaces runs all rounds and appends results', async () => {
    await store.dispatch('generateHorses')
    await store.dispatch('generateSchedule')
    await store.dispatch('startRaces', { durationMs: 0 })
    expect(store.state.roundResults).toHaveLength(6)
    expect(store.state.phase).toBe('idle')
  })
})

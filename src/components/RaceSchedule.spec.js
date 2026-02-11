import { mount } from '@vue/test-utils'
import RaceSchedule from './RaceSchedule.vue'

describe('RaceSchedule', () => {
  it('renders empty state when no schedule', () => {
    const wrapper = mount(RaceSchedule, { props: { schedule: [] } })
    expect(wrapper.text()).toContain('Generate')
    expect(wrapper.text()).toContain('6-round schedule')
    expect(wrapper.findAll('.round')).toHaveLength(0)
  })

  it('renders rounds with length and horse count', () => {
    const schedule = [
      { roundNumber: 1, length: 1200, horseIds: [1, 2, 3] },
      { roundNumber: 2, length: 1400, horseIds: [4, 5] },
    ]
    const wrapper = mount(RaceSchedule, {
      props: { schedule, currentRoundIndex: null },
    })
    expect(wrapper.findAll('.round')).toHaveLength(2)
    expect(wrapper.text()).toContain('Round 1')
    expect(wrapper.text()).toContain('1200 m')
    expect(wrapper.text()).toContain('3 horses')
    expect(wrapper.text()).toContain('Round 2')
    expect(wrapper.text()).toContain('1400 m')
    expect(wrapper.text()).toContain('2 horses')
  })

  it('applies active class to current round', () => {
    const schedule = [
      { roundNumber: 1, length: 1200, horseIds: [1] },
      { roundNumber: 2, length: 1400, horseIds: [2] },
    ]
    const wrapper = mount(RaceSchedule, {
      props: { schedule, currentRoundIndex: 1 },
    })
    const rounds = wrapper.findAll('.round')
    expect(rounds[0].classes()).not.toContain('active')
    expect(rounds[1].classes()).toContain('active')
  })
})

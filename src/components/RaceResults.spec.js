import { mount } from '@vue/test-utils'
import RaceResults from './RaceResults.vue'

describe('RaceResults', () => {
  it('renders empty state when no results', () => {
    const wrapper = mount(RaceResults, { props: { roundResults: [] } })
    expect(wrapper.text()).toContain('Results will appear')
  })

  it('renders round results with finish order', () => {
    const roundResults = [
      {
        roundNumber: 1,
        length: 1200,
        finishOrder: [
          { horseId: 3, color: '#00f', position: 1 },
          { horseId: 1, color: '#f00', position: 2 },
        ],
      },
    ]
    const wrapper = mount(RaceResults, {
      props: { roundResults, horses: [] },
    })
    expect(wrapper.text()).toContain('Round 1')
    expect(wrapper.text()).toContain('1200 m')
    expect(wrapper.text()).toContain('Horse 3')
    expect(wrapper.text()).toContain('Horse 1')
  })
})

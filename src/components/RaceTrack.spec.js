import { mount } from '@vue/test-utils'
import RaceTrack from './RaceTrack.vue'

describe('RaceTrack', () => {
  const round = {
    roundNumber: 1,
    length: 1200,
    horseIds: [1, 2, 3],
  }
  const horses = [
    { id: 1, color: '#f00', condition: 80 },
    { id: 2, color: '#0f0', condition: 50 },
    { id: 3, color: '#00f', condition: 90 },
  ]

  it('renders round info and lanes', () => {
    const wrapper = mount(RaceTrack, {
      props: { round, horses, phase: 'idle' },
    })
    expect(wrapper.text()).toContain('Round 1')
    expect(wrapper.text()).toContain('1200 m')
    expect(wrapper.findAll('.lane')).toHaveLength(3)
    expect(wrapper.text()).toContain('Horse 1')
    expect(wrapper.text()).toContain('Horse 2')
    expect(wrapper.text()).toContain('Horse 3')
  })

  it('applies racing class when phase is racing', () => {
    const wrapper = mount(RaceTrack, {
      props: { round, horses, phase: 'racing' },
    })
    const runners = wrapper.findAll('.runner')
    runners.forEach((r) => expect(r.classes()).toContain('racing'))
  })

  it('orders lanes by finishOrder when provided', () => {
    const finishOrder = [
      { horseId: 3, color: '#00f', position: 1 },
      { horseId: 1, color: '#f00', position: 2 },
      { horseId: 2, color: '#0f0', position: 3 },
    ]
    const wrapper = mount(RaceTrack, {
      props: { round, horses, finishOrder, phase: 'idle' },
    })
    const runners = wrapper.findAll('.runner')
    expect(runners).toHaveLength(3)
    expect(runners[0].text()).toContain('Horse 3')
    expect(runners[1].text()).toContain('Horse 1')
    expect(runners[2].text()).toContain('Horse 2')
  })

  it('uses round.horseIds order when finishOrder is null', () => {
    const wrapper = mount(RaceTrack, {
      props: { round, horses, finishOrder: null, phase: 'idle' },
    })
    const runners = wrapper.findAll('.runner')
    expect(runners[0].text()).toContain('Horse 1')
    expect(runners[1].text()).toContain('Horse 2')
    expect(runners[2].text()).toContain('Horse 3')
  })
})

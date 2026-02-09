import { mount } from '@vue/test-utils'
import HorseList from './HorseList.vue'

describe('HorseList', () => {
  it('renders empty state when no horses', () => {
    const wrapper = mount(HorseList, { props: { horses: [] } })
    expect(wrapper.text()).toContain('Generate Horses')
  })

  it('renders horse items with color and condition', () => {
    const horses = [
      { id: 1, color: '#ff0000', condition: 85 },
      { id: 2, color: '#00ff00', condition: 50 },
    ]
    const wrapper = mount(HorseList, { props: { horses } })
    expect(wrapper.findAll('.horse-item')).toHaveLength(2)
    expect(wrapper.text()).toContain('Horse 1')
    expect(wrapper.text()).toContain('Condition: 85')
    expect(wrapper.text()).toContain('Horse 2')
    expect(wrapper.text()).toContain('Condition: 50')
  })
})

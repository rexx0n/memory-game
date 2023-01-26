import { shallowMount } from '@vue/test-utils'
import MemoryGame from '@/components/MemoryGame.vue'

describe('HelloWorld.vue', () => {
  test('renders props.msg when passed', () => {
    const wrapper = shallowMount(MemoryGame)
    expect(wrapper.text()).toMatch('Игра на память')
  })
})

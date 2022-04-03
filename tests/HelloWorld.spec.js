import { mount } from '@vue/test-utils'
import Hello from '../src/renderer/src/components/HelloWorld.vue'
import { it, expect, describe } from 'vitest'

describe('Component test', () => {
  it('mount component', async () => {
    expect(Hello).toBeTruthy()

    const wrapper = mount(Hello, {
      props: {
        msg: 'This is a test message'
      }
    })

    expect(wrapper.text()).toContain('This is a test message')
    expect(wrapper.html()).toMatchSnapshot()
  }, 0)
})

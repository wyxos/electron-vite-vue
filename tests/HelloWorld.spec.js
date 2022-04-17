/**
 * @vitest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import Hello from '../src/renderer/src/components/HelloWorld.vue'
import { it, expect, describe } from 'vitest'

describe('Component test', () => {
  it('mount component', async () => {
    expect(Hello).toBeTruthy()

    const msg = 'This is a test message'

    const wrapper = mount(Hello, {
      props: {
        msg
      }
    })

    expect(wrapper.text()).toContain(msg)
    expect(wrapper.html()).toMatchSnapshot()
  }, 0)
})

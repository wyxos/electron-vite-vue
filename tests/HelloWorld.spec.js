import { mount } from '@vue/test-utils'
import Hello from '../src/renderer/src/components/HelloWorld.vue'

test('mount component', async () => {
  expect(Hello).toBeTruthy()

  const wrapper = mount(Hello, {
    props: {
      msg: 'This is a test message'
    }
  })

  expect(wrapper.text()).toContain('This is a test message')
  expect(wrapper.html()).toMatchSnapshot()
})

import { describe, it, expect } from 'vitest'
import AppVue from '@/App.vue'
import { mount } from '@vue/test-utils'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(AppVue)
    expect(wrapper.text()).toContain('Result')
  })
})

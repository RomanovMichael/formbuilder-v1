import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import FormBuilder from '../FormBuilder.vue'

describe('FormBuilder', () => {
  const mockConfig = {
    parent: {
      name: 'Parent Section',
      items: [
        {
          name: 'name',
          type: 'input',
          label: 'Name'
        },
        {
          name: 'age',
          type: 'radio',
          label: 'Age',
          additional: {
            options: [
              { value: '20', text: '20-30', selected: true },
              { value: '30', text: '30-40' }
            ]
          }
        }
      ]
    }
  }

  it('render test', () => {
    const wrapper = mount(FormBuilder)
    expect(wrapper.isVisible()).toBe(true)
  })

  it('renders correctly with dynamic config', () => {
    const wrapper = mount(FormBuilder, {
      props: {
        formConfig: mockConfig
      }
    })

    expect(wrapper.html()).toContain('Parent Section')

    expect(wrapper.html()).toContain('Name')
    expect(wrapper.html()).toContain('Age')
  })
})

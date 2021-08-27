import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import index from '~/pages'

describe('index', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  test('is a Vue instance', () => {
    const wrapper = mount(index, { localVue, vuetify })
    expect(wrapper.vm).toBeTruthy()
  })
})

import { shallow, mount } from '@vue/test-utils'
import Checklist from '@/components/checklist'

const options = [
  'value1',
  'value2',
  'value3'
]

describe('checklist', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(Checklist, {
      propsData: {
        options: options
      }
    })

    expect(wrapper.name()).toBe('wv-checklist')
    expect(wrapper.contains('.weui-cells_checkbox')).toBeTruthy()

    // create with 'title'
    wrapper = shallow(Checklist, {
      propsData: {
        title: 'test title',
        options: options
      }
    })

    expect(wrapper.contains('.weui-cells__title')).toBeTruthy()
    expect(wrapper.find('.weui-cells__title').text()).toBe('test title')
  })

  it('options', () => {
    wrapper = mount(Checklist, {
      propsData: {
        value: ['value2'],
        options: options
      }
    })

    expect(wrapper.findAll('.weui-check__label').length).toBe(3)

    expect(wrapper.findAll('.weui-cell__bd p').at(0).text()).toBe('value1')
    expect(wrapper.findAll('.weui-cell__bd p').at(1).text()).toBe('value2')
    expect(wrapper.findAll('.weui-cell__bd p').at(2).text()).toBe('value3')

    expect(wrapper.findAll('input').at(0).attributes().value).toBe('value1')
    expect(wrapper.findAll('input').at(1).attributes().value).toBe('value2')
    expect(wrapper.findAll('input').at(2).attributes().value).toBe('value3')
  })

  it('max selection', () => {
    wrapper = mount(Checklist, {
      attachToDocument: true,
      propsData: {
        max: 2,
        options: options,
        value: options
      }
    })

    expect(wrapper.vm.currentValue.length).toBe(2)
    expect(wrapper.vm.currentValue).toEqual(['value1', 'value2'])

    // create a fresh wrapper
    wrapper = shallow(Checklist, {
      propsData: {
        max: 1,
        options: options,
        value: options
      }
    })

    expect(wrapper.vm.currentValue.length).toBe(1)
    expect(wrapper.vm.currentValue).toEqual(['value1'])
  })

  it('watch currentValue', () => {
    wrapper = shallow(Checklist, {
      propsData: {
        max: 2,
        options: options
      }
    })

    wrapper.setData({
      currentValue: ['value1']
    })

    expect(wrapper.emitted().input).toBeTruthy()

    wrapper.setData({
      currentValue: options
    })

    expect(wrapper.vm.currentValue).toEqual(['value1', 'value2'])
  })

  it('watch value', () => {
    wrapper = shallow(Checklist, {
      propsData: {
        options: options
      }
    })

    wrapper.setProps({
      value: ['new-value']
    })

    expect(wrapper.emitted().change).toEqual([[['new-value']]])
  })
})

<template>
  <common-entry title="单元格">
    <m-cell
      label="单元格"
      value="value"
      link-color="#f00"
    />
    <p>slot</p>
    <pre>
      $slots.label
      $slot.default === value
    </pre>
    <p>events</p>
    <pre>
      on-click-info
      on-click
    </pre>
    <p>props</p>
    <pre>
      props: {
        height: {
          type: Number,
          default: 45
        },
        border: {
          type: Boolean,
          default: true
        },
        isLink: {
          type: Boolean,
          default: true
        },
        linkColor: {
          type: String,
          default: ''
        },
        hasInfo: Boolean,
        loading: Boolean,
        label: String,
        labelDesc: String,
        value: String
      }
    </pre>
  </common-entry>
</template>

<script>
import CommonEntry from './commonEntry'
import MCell from '../../src/components/cell'

export default {
  name: 'cell',

  components: {
    CommonEntry, MCell
  }
}
</script>

<style scoped>

</style>

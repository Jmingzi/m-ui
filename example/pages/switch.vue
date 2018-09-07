<template>
  <common-entry title="开关">
    <m-cell
      label="结合cell的开关"
      :is-link="false"
    >
      <m-switch
        :value="false"
      />
    </m-cell>
    <p>model</p>
    <pre>
      v-model=""
    </pre>
    <p>props</p>
    <pre>
    props: {
      value: Boolean,
      loading: Boolean,
      mainColor: {
        type: String,
        default: 'red'
      }
    },
    </pre>
  </common-entry>
</template>

<script>
import CommonEntry from './commonEntry'
import MCell from '../../src/components/cell'
import MSwitch from '../../src/components/switch'

export default {
  name: 'cell',

  components: {
    CommonEntry, MCell, MSwitch
  }
}
</script>

<style scoped>

</style>

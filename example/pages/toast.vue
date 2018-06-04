<template>
  <common-entry title="单元格">
    <div class="px-font-14">
      <a href="javascript:" @click="toast">toast</a>
      <p>options</p>
      <pre>
        {
          message: '',
          duration: 3000,
          className: ''
        }
      </pre>
    </div>
  </common-entry>
</template>

<script>
import CommonEntry from './commonEntry'
import MToast from '../../src/components/toast'

export default {
  name: 'cell',

  components: {
    CommonEntry
  },

  methods: {
    toast() {
      MToast('111')
    }
  }
}
</script>

<style scoped>

</style>

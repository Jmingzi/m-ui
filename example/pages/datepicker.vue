<template>
  <div class="datepicker height-100">
    <date-picker
      :limit-days="10"
      :main-color="`#753e81`"
      :sub-color="`#ebe2ed`"
      :is-single="false"
      :default-time-stamp="[new Date('2018-06-15 14:00').getTime(), new Date('2018-06-16 14:00').getTime()]"
      :time-label="['label1', 'label23']"
      @date-select="handleDateSelect"
      @select-finish="handleDateChoose"
    />

    <common-entry>
      <div class="px-margin-t30">
        <pre>
          import { DatePicker } from 'xm-mui'
        </pre>
      </div>

      <p>events</p>
      <pre>
      @date-select
      @select-finish
      </pre>
      <p>props</p>
      <pre class="px-font-12">
       props: {
          limitDays: {
            type: Number,
            default: 90
          },
          mainColor: {
            type: String,
            default: '#753e81'
          },
          subColor: {
            type: String,
            default: '#ebe2ed'
          },
          isSingle: {
            type: Boolean,
            default: false
          },
          defaultTimeStamp: {
            type: [Number, String, Array],
            default: Date.now()
          },
          timeLabel: {
            type: Array,
            default() {
              return ['入店', '离店']
            }
          }
       }
      </pre>
    </common-entry>
  </div>
</template>

<script>
import DatePicker from '../../src/components/date-picker/index'
import CommonEntry from './commonEntry'

export default {
  name: 'datepicker',

  components: {
    CommonEntry,
    DatePicker
  },

  methods: {
    handleDateSelect(timeStamp) {
      console.log('--------------')
      console.log(timeStamp)
    },

    handleDateChoose({ ...args }) {
      console.log('--------------')
      console.log(args)
    }
  }
}
</script>

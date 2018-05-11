<template>
  <div class="datepicker height-100">
    <date-picker
      :limit-days="90"
      :main-color="`#f00`"
      :sub-color="`#00f`"
      :one-way="false"
      :time-stamp="new Date('2018-05-14 14:00').getTime()"
      :text-arr="['label1', 'label2']"
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
         oneWay: {
           type: Boolean,
           default: false
         },
         timeStamp: {
           type: Number | String,
           default: Date.now()
         },
         textArr: {
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
import DatePicker from '../../src/components/datePicker/index'
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

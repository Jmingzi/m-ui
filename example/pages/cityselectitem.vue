<template>
  <common-entry title="城市选择类目">
    <div class="position-f px-top-45 bottom-0 left-0 right-0">
      <m-city-select
        :current-level-list="city"
        :max-level="maxLevel"
        @on-city-change="getCity"
        @on-select="finalSelect"
      />
    </div>
  </common-entry>
</template>

<script>
import CommonEntry from './commonEntry'
import MCitySelect from '../../src/components/city-select-item'
import LocalCity from '../assets/cityTwoLevel'

export default {
  name: 'city-select',

  components: {
    CommonEntry,
    MCitySelect
  },

  data() {
    return {
      city: null,
      maxLevel: 3,
      selected: []
    }
  },

  methods: {
    finalSelect(res) {
      this.selected = res
      this.$box.alert(res.map(x => x.name).join(''))
    },

    getCity(item, itemIndex, currLevel) {
      const pid = item ? item.code : 0
      if (pid === 0) {
        this.city = LocalCity
      } else if (currLevel === 1) {
        this.city = LocalCity[itemIndex].child
      } else if (currLevel === 2) {
        this.city = [
          {
            'code': 281210,
            'name': '汉周区'
          },
          {
            'code': 281211,
            'name': '大罗区'
          },
          {
            'code': 281212,
            'name': '取得'
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.px-top-45 {
  top: 45px;
}
</style>

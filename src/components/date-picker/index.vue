<!--
  name: 选择日期
-->
<template>
  <div class="date-picker position-r height-100">
    <div class="date-picker__fixed-header position-f top-0 width-100 z-index-10 bg-fff m-bd-b">
      <div class="date-picker__month-title text-center color-262 px-font-16">
        <span>
          {{ dateArrange[showDateIndex].year }}年
          {{ dateArrange[showDateIndex].month | preFillZero }}月
        </span>
      </div>

      <div class="date-picker__week overflow-h px-font-14">
        <div
          class="date-picker__row-1 fl"
          v-for="(week, idx) in weeksLabel"
          :key="idx"
          :style="{color: (idx === 0 || idx === 6) && mainColor}"
        >
          {{ week }}
        </div>
      </div>
    </div>
    <div
      class="date-picker__wrapper position-a bottom-0 overflow-a width-100"
      @scroll="onScroll"
    >
      <div
        class="date-picker__month-box overflow-h bg-fff px-font-14"
        v-for="(date, index) in dateArrange"
        :key="index"
      >
        <div
          class="date-picker__header m-bd-b"
          v-if="index !== 0"
          :class="{ hide : (showDateIndex >= index) }"
        >
          <div class="date-picker__month-title text-center color-262 px-font-16">
            <span>{{ date.year }}年{{ date.month | preFillZero }}月</span>
          </div>

          <div class="date-picker__week overflow-h">
            <div
              class="date-picker__row-1 fl"
              v-for="(week, idx) in weeksLabel"
              :key="idx"
              :style="{color: (idx === 0 || idx === 6) && mainColor}"
            >
              {{ week }}
            </div>
          </div>
        </div>

        <div class="date-picker__body overflow-h">
          <div
            class="date-picker__day-cell fl position-r"
            v-for="(day, index) in generateDay(date.year, date.month)"
            :key="day"
            :class="{
              disabled: !isValidDate(date.year, date.month, day),
              selected: fromOrTo(date.year, date.month, day),
              firstCol: index % 7 === 0,
              lastCol: index % 7 === 6
            }"
            :style="showSubColor(date.year, date.month, day)"
          >
            <div
              class="date-picker__day-cell-bg height-100 position-r"
              :style="showMainColor(date.year, date.month, day)"
              @click="doSelect(date.year, date.month, day, $event)"
            >
              <span class="date-picker__day-word">
                {{ day || '' }}
              </span>

              <span
                class="in-out-txt position-a px-font-12 width-100 left-0 px-line-20"
                v-if="fromOrTo(date.year, date.month, day, 'fromDate')"
                :style="{ color: mainColor }"
              >
                {{ timeLabel[0] }}
              </span>
              <span
                class="in-out-txt position-a px-font-12 color-main width-100 left-0 px-line-20"
                v-if="fromOrTo(date.year, date.month, day, 'toDate')"
                :style="{ color: mainColor }"
              >
                {{ isSingle ? '' : timeLabel[1] }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const weeks = ['日', '一', '二', '三', '四', '五', '六']

export default {
  name: 'date-picker',

  filters: {
    preFillZero(val) {
      return val >= 10 ? val : `0${val}`
    }
  },

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
      type: Number | String,
      default: Date.now()
    },
    timeLabel: {
      type: Array,
      default() {
        return ['入店', '离店']
      }
    }
  },

  data() {
    return {
      // 当前日期
      currentDate: null,
      // 允许的最迟日期
      endDate: null,
      showDateIndex: 0,
      weeksLabel: weeks,
      monthRange: [],
      // 起始时间
      fromDate: null,
      // 结束时间
      toDate: null,
      // 下次点击是否重新开始
      resetClick: true,
      lastScrollPosition: 0,
      toBottom: true,
      boxs: null
    }
  },

  computed: {
    // 年+月份  存入数组 ->遍历
    dateArrange() {
      let arr = []
      if (this.endDate.year > this.currentDate.year) {
        arr = arr.concat(
          this.generateMonthArray(this.currentDate.month, 12, this.currentDate.year)
        )
        for (let year = this.currentDate.year + 1; year <= this.endDate.year; year += 1) {
          arr = arr.concat(this.generateMonthArray(
            1,
            this.endDate.year === year ? this.endDate.month : 12,
            year
          ))
        }
      }

      if (this.endDate.year === this.currentDate.year) {
        arr = arr.concat(this.generateMonthArray(this.currentDate.month,
          this.endDate.month, this.currentDate.year))
      }
      return arr
    }
  },

  mounted() {
    this.boxs = document.querySelectorAll('.date-picker__month-box')
  },

  created() {
    this.setDate()
  },

  methods: {
    generateMonthArray(from, to, year) {
      let arr = []
      for (let i = from; i <= to; i += 1) {
        arr.push({
          year,
          month: i
        })
      }
      return arr
    },

    // 根据search传递的defaultTimeStamp 生成起始时间 、 结束时间
    setDate() {
      console.log(this.isSingle)
      if (this.isSingle) {
        const { year, month, date } = this.formatTime(this.defaultTimeStamp)
        const endDate = this.formatTime(this.defaultTimeStamp + ((this.limitDays - 1) * 24 * 3600 * 1000))
        this.currentDate = { year, month, date }
        this.fromDate = { year, month, date }
        this.endDate = {
          year: endDate.year,
          month: endDate.month,
          date: endDate.date
        }
        this.toDate = { year, month, date }
      } else {
        console.log(1)
        const { year, month, date } = this.formatTime(this.defaultTimeStamp[0])
        const endDate = this.formatTime(this.defaultTimeStamp[0] + ((this.limitDays - 1) * 24 * 3600 * 1000))
        const toDate = this.formatTime(this.defaultTimeStamp[1])
        this.currentDate = { year, month, date }
        this.fromDate = { year, month, date }
        this.endDate = {
          year: endDate.year,
          month: endDate.month,
          date: endDate.date
        }
        this.toDate = {
          year: toDate.year,
          month: toDate.month,
          date: toDate.date
        }
      }
    },

    getDateObj(defaultTimeStamp) {
      const date = this.formatTime(defaultTimeStamp)
      return {
        year: date.year,
        month: date.month + 1,
        date: date.date
      }
    },

    getTimeStamp(dateObj) {
      return new Date(this.getTimeStampByDateObj(dateObj)).getTime()
    },

    formatTime(time) {
      const timeData = time ? new Date(time) : new Date()
      const year = timeData.getFullYear()
      const month = timeData.getMonth() + 1
      const date = timeData.getDate()
      const hour = timeData.getHours()
      const minute = timeData.getMinutes()

      return { year, month, date, hour, minute }
    },

    // 根据 { year, month, date } 格式返回时间戳
    getTimeStampByDateObj(obj) {
      return new Date(`${obj.year}/${obj.month}/${obj.date}`)
    },

    // 判断是否为闰年
    isLeapYear(year) {
      return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
    },

    // 返回某年某月的日期信息、第一天周几的信息
    getMonthInfo(year, month) {
      let day
      // 判断该月有31天 还是30天
      const common = [[1, 3, 5, 7, 8, 10, 12], [4, 6, 9, 11]]

      if (month === 2) {
        day = this.isLeapYear(year) ? 28 : 29
      } else if (common[0].indexOf(month) !== -1) {
        day = 31
      } else if (common[1].indexOf(month) !== -1) {
        day = 30
      }

      return {
        day,
        firstIs: new Date(`${year}/${month}/01`).getDay()
      }
    },

    // 生成月份所有日子的数组
    // 当第一天不为周日时 push null， 占位
    generateDay(year, month) {
      const monthInfo = this.getMonthInfo(year, month)
      const daysOfMonth = []
      for (let i = 0; i < monthInfo.firstIs; i += 1) {
        daysOfMonth.push(null)
      }
      for (let i = 0; i < monthInfo.day; i += 1) {
        daysOfMonth.push(i + 1)
      }
      return daysOfMonth
    },

    // 校验日期是否在范围内
    isValidDate(year, month, date) {
      const cd = this.currentDate
      const ed = this.endDate
      if (
        (year < cd.year) ||
        ((year === cd.year) && (month === cd.month) && (date < cd.date)) ||
        ((year === ed.year) && (month === ed.month) && (date > ed.date)) ||
        ((year > ed.year) || ((year === ed.year) && (month > ed.month)))
      ) {
        return false
      }
      return true
    },

    // 判断日期是否为出发或结束
    fromOrTo(year, month, date, type) {
      let fromFlag = false
      let toFlag = false
      fromFlag = (year === this.fromDate.year) &&
        (Number(month) === Number(this.fromDate.month)) &&
        (Number(date) === Number(this.fromDate.date))

      toFlag = (year === this.toDate.year) &&
        (Number(month) === Number(this.toDate.month)) &&
        (Number(date) === Number(this.toDate.date))

      if (type === 'fromDate') {
        return fromFlag
      }
      if (type === 'toDate') {
        return toFlag
      }
      return fromFlag || toFlag
    },

    // 是否在选择范围内
    isInArrange(year, month, date) {
      const passStamp = this.getTimeStamp({year, month, date})
      const fromStamp = this.getTimeStamp(this.fromDate)
      const toStamp = this.getTimeStamp(this.toDate)
      return (passStamp > fromStamp) && (passStamp < toStamp)
    },

    showSubColor(year, month, date) {
      const fromStamp = this.getTimeStamp(this.fromDate)
      const toStamp = this.getTimeStamp(this.toDate)

      if (
        (fromStamp === toStamp) ||
        (this.toDate.year === 1 && this.toDate.date === 1)
      ) {
        return {}
      }

      if (
        (this.fromOrTo(year, month, date, 'fromDate')) ||
        (this.isInArrange(year, month, date))
      ) {
        return { backgroundColor: this.subColor }
      }
      return {}
    },

    showMainColor(year, month, date) {
      if (date && this.fromOrTo(year, month, date)) {
        return { backgroundColor: this.mainColor }
      }
      return {}
    },

    // 点击选中
    doSelect(year, month, date, e) {
      this.$emit('date-select', this.getTimeStamp({ year, month, date }))
      if (
        e.target.classList.contains('disabled') ||
        e.target.parentElement.classList.contains('disabled') ||
        e.target.parentElement.parentElement.classList.contains('disabled')
      ) {
        return
      }
      const thisStamp = this.getTimeStamp({ year, month, date })
      const fromStamp = this.getTimeStamp(this.fromDate)
      // 是否为单选 或者 当前选中的时间比之前选中的要小
      if (this.isSingle || (thisStamp < fromStamp)) {
        this.fromDate = { year, month, date }
      }
      // 当为单选 重置todate
      // finish
      if (this.isSingle) {
        this.resetToDate()
        this.doFinish()
        return
      }
      // 当为双端时间  第一次点击都默认为设置起始时间 并且重置todate
      if (this.resetClick) {
        this.fromDate = { year, month, date }
        this.resetToDate()
        this.resetClick = false
        return
      }

      if (thisStamp <= fromStamp) {
        return
      }
      this.toDate = { year, month, date }
      this.doFinish()
    },

    doFinish() {
      if (this.isSingle) {
        this.$emit('select-finish', {
          startTime: this.getTimeStamp(this.fromDate)
        })
      } else {
        this.$emit('select-finish', {
          startTime: this.getTimeStamp(this.fromDate),
          endTime: this.getTimeStamp(this.toDate)
        })
      }
      this.resetClick = true
    },

    onScroll(e) {
      const scrollTop = e.target.scrollTop
      let offsetH = 0
      for (let i = 0; i < this.dateArrange.length - 1; i += 1) {
        offsetH += this.boxs[i].offsetHeight
        if (offsetH >= scrollTop) {
          this.showDateIndex = i
          this.toBottom = scrollTop > this.lastScrollPosition
          this.lastScrollPosition = scrollTop
          break
        }
      }
    },

    resetToDate() {
      this.toDate = { year: 1, month: 1, date: 1 }
    }
  }
}
</script>

<style lang='scss' scoped>
html,
div {
  box-sizing: border-box;
}

@function px2vw($px) {
  @return $px / 3.75 * 1vw
}

.position-f {
  position: fixed;
}

.position-r {
  position: relative
}

.position-a {
  position: absolute;
}

.top-0 {
  top: 0;
}

.bottom-0 {
  bottom: 0;
}

.left-0 {
  left: 0;
}

.width-100 {
  width: 100%;
}

.height-100 {
  height: 100%;
}

.bg-fff {
  background: #fff;
}

.m-bd-b {
  &:before {
    border: 1px solid #cecece;
    border-width: 0 0 1px 0;
    border-radius: 0;
    z-index: 1;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    transform: scale(0.5, 0.5);
    pointer-events: none;
    transform-origin: 0 0;
  }
}

.text-center {
  text-align: center;
}

.color-262 {
  color: #262A30;
}

.z-index-10 {
  z-index: 10;
}

.date-picker__wrapper {
  top: 70px;
}

.date-picker__row-1 {
  &:last-child {
    width: px2vw(40);
    padding-right: 0;
  }
}

.px-font-12 {
  font-size: 12px;
}

.px-font-14 {
  font-size: 14px;
}

.px-font-16 {
  font-size: 16px;
}

.px-line-20 {
  line-height: 20px;
}

.overflow-h {
  overflow: hidden;
}

.overflow-a {
  overflow: auto;
}

.fl {
  float: left;
}

.date-picker__row-1,
.date-picker__day-cell{
  width: px2vw(50);
  height: 40px;
  line-height: 40px;
  padding-right: 10px;
  text-align: center;
}

.date-picker__fixed-header {
  padding: 10px 4.5% 0;
}

.date-picker__month-box {
  .date-picker__header {
    overflow: hidden;
    &.hide {
      animation: fadeOutUp .3s ease-out forwards;
    }
  }

  .date-picker__header,
  .date-picker__body{
    padding: 10px 4.5% 0;

    .selected:last-child {
      background: #fff !important;
    }

    .date-picker__day-cell {

      margin-bottom: 20px;

      &.lastCol {
        width: px2vw(40);
        padding-right: 0;
      }

      &.disabled {
        color: #959BA3;
      }

      &.selected {
        color: #fff !important;

        .date-picker__day-cell-bg {
          border-radius: 4px;
        }
      }

      &.selected,
      &.arranged {
        position: relative;
      }

      .in-out-txt {
        top: 40px;
      }

      .date-picker__day-word {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}

@keyframes fadeOutUp {
  from {
    height: 72px;
  }

  to {
    height: 0;
  }
}

.fadeOutUp {
  animation-name: fadeOutUp;
}
</style>

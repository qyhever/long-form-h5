<template>
  <van-popup
    v-model="visible"
    class="popup"
    position="bottom"
    round
  >
    <van-datetime-picker
      class="picker"
      :value="value"
      :type="type"
      v-bind="$attrs"
      @confirm="onDateConfirm"
      @cancel="hide"
    />
  </van-popup>
</template>

<script>
import { isString, isObject } from '@/utils/type'
export default {
  props: {
    value: {
      required: true,
      validator (value) {
        return isString(value) || isObject || value === null
      }
    },
    type: {
      type: String,
      default: 'date',
      validator (value) {
        return ['datetime', 'date', 'time', 'year-month'].indexOf(value) >= 0
      }
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    show () {
      this.visible = true
    },
    hide () {
      this.visible = false
    },
    onDateConfirm (val) {
      this.visible = false
      let value = val
      if (!this.type) { // 默认 datetime
        value = this.$formatDate(value, 'YYYY-MM-DD HH:mm')
      }
      if (this.type === 'date') {
        value = this.$formatDate(value)
      }
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="less" scoped>
.popup {
  &.van-popup--bottom.van-popup--round {
    border-radius: 10px 10px 0 0;
  }
}
.picker {
  ::v-deep .van-picker__toolbar {
    height: 48px;
    background-color: #f5f7f9;
    &:before, &:after {
      display: none;
    }
    .van-picker__cancel, .van-picker__confirm {
      padding: 0 rem(62);
    }
    .van-picker__cancel {
      color: @color-text-secondary;
    }
    .van-picker__confirm {
      color: @primary-color;
    }
  }
}
</style>

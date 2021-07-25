<template>
  <div class="date-field">
    <div class="date-field__trigger" @click="onShowPicker">
      <ComSvgIcon name="date" />
      <span class="date-field__text">{{ value }}</span>
    </div>
    <datepicker
      ref="picker"
      :value="value"
      v-bind="$attrs"
      @input="onPickerChange"
    />
  </div>
</template>

<script>
import Datepicker from '../datepicker'
import { isString, isObject } from '@/utils/type'
export default {
  components: {
    Datepicker
  },
  props: {
    value: {
      required: true,
      validator (value) {
        return isString(value) || isObject || value === null
      }
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    onPickerChange (val) {
      this.$emit('input', val)
    },
    onShowPicker () {
      this.$refs.picker.show()
    }
  }
}
</script>

<style lang="less" scoped>
.date-field {
  width: 100%;
}
.date-field__trigger {
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  height: 38px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  color: @color-text-secondary;
}
.date-field__text {
  margin-left: 8px;
  color: @color-text-primary;
}
</style>

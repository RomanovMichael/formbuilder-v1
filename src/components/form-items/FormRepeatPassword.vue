<template>
  <FormPassword v-model="internalValue" />
</template>

<script>
import FormPassword from '@/components/form-items/FormPassword.vue'

export default {
  name: 'FormRepeatPassword',
  components: {
    FormPassword
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    parent: {
      type: String,
      required: true
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  },

  emits: ['update:modelValue'],
  data() {
    return {
      internalValue: ''
    }
  },
  watch: {
    internalValue(value) {
      const isMatch = value === this.parent
      this.$emit('update:modelValue', isMatch)
    }
  }
}
</script>

<style lang="scss" scoped />

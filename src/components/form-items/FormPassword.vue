<template>
  <FormInput
    :label="label"
    type="password"
    :model-value="modelValue"
    @update:modelValue="updateValue"
    @keydown="disableSpaces"
  />
</template>

<script>
import FormInput from '@/components/form-items/FormInput.vue'

export default {
  name: 'FormPassword',
  components: {
    FormInput
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  methods: {
    updateValue(value) {
      const trimmedValue = value.replace(/\s+/g, '')
      this.$emit('update:modelValue', trimmedValue)
    },
    disableSpaces(e) {
      if (e.key === ' ') {
        e.preventDefault()
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>

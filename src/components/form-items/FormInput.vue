<template>
  <div class="form-input">
    <p class="form-input__label">{{ label }}</p>
    <input
      class="form-input__field"
      v-bind="$attrs"
      :type="type"
      :value="modelValue"
      required
      @input="updateValue"
    />
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  methods: {
    updateValue(e) {
      const value = e.target.value

      this.$emit('update:modelValue', value)
    }
  }
}
</script>

<style scoped>
.form-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 100%;
}

.form-input__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
  margin: 0;
  text-align: left;
  letter-spacing: 0.03125rem;
}

.form-input__field {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 400;
  color: #333;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.1);
}

.form-input__field:focus {
  border-color: #007aff;
  background-color: #ffffff;
  box-shadow: 0 0 0.5rem rgba(0, 122, 255, 0.4);
}

.form-input__field--error {
  border-color: #ff3b30;
  background-color: #fff1f0;
  box-shadow: 0 0 0.5rem rgba(255, 59, 48, 0.4);
}
</style>

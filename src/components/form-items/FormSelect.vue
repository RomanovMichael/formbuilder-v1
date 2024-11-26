<template>
  <div class="form-select">
    <p class="form-select__label">{{ label }}</p>
    <select
      class="form-select__dropdown"
      :value="modelValue"
      @change="updateValue"
    >
      <option
        v-for="option in options"
        :key="option.value"
        class="form-select__option"
        :selected="option.value === modelValue"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'FormSelect',
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true,
      validator(value) {
        if (!Array.isArray(value)) {
          console.error("Параметр 'options' должен быть массивом.")

          return false
        }

        return true
      }
    }
  },
  emits: ['update:modelValue'],
  mounted() {
    if (this.modelValue === null) {
      const selectedOption = this.options.find(option => option.selected)

      if (selectedOption) {
        this.$emit('update:modelValue', selectedOption.value)
      }
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.form-select {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 100%;
}

.form-select__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
  margin: 0;
  text-align: left;
  letter-spacing: 0.03125rem;
}

.form-select__dropdown {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: #333;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  appearance: none;
  outline: none;
  transition: all 0.3s ease;
  cursor: pointer;
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6"%3E%3Cpath fill="%23333" d="M5 6L0 0h10z"/%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 0.65rem 0.65rem;
}

.form-select__dropdown:focus {
  border-color: #007aff;
  background-color: #ffffff;
  box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.2);
}

.form-select__option {
  font-size: 1rem;
  color: #333;
}
</style>

<template>
  <fieldset class="form-radio">
    <legend class="form-radio__label">{{ label }}</legend>
    <div
      v-for="(option, index) in options"
      :key="option.value"
      class="form-radio__option"
    >
      <input
        :id="`${uniqueName}-${index}`"
        class="form-radio__input"
        required
        type="radio"
        :name="uniqueName"
        :value="option.value"
        :checked="option.value === modelValue"
        @change="updateValue(option.value)"
      />
      <label
        class="form-radio__text"
        :for="`${uniqueName}-${index}`"
      >
        {{ option.text }}
      </label>
    </div>
  </fieldset>
</template>

<script>
export default {
  name: 'FormRadio',
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: null
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
  data() {
    return {
      uniqueName: ''
    }
  },
  mounted() {
    this.uniqueName = this.generateUniqueName()

    if (this.modelValue === null) {
      const selectedOption = this.options.find(option => option.selected)

      if (selectedOption) {
        this.$emit('update:modelValue', selectedOption.value)
      }
    }
  },
  methods: {
    updateValue(value) {
      this.$emit('update:modelValue', value)
    },
    generateUniqueName() {
      return `radio-${crypto.randomUUID()}`
    }
  }
}
</script>

<style scoped>
.form-radio {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 100%;
  border: none;
  padding: 0;
  margin: 0;
}

.form-radio__label {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
}

.form-radio__option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-radio__option:hover .form-radio__text {
  color: #007aff;
}

.form-radio__text {
  font-size: 0.875rem;
  color: #333;
  cursor: pointer;
  user-select: none;
  transition: color 0.3s ease;
}

.form-radio__input {
  appearance: none;
  width: 1rem;
  height: 1rem;
  border: 1px solid #ccc;
  border-radius: 50%;
  background-color: #fff;
  transition:
    box-shadow 0.3s ease,
    background-color 0.3s ease;
  box-shadow: 0 0 0 2px transparent;
  cursor: pointer;
}

.form-radio__input:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.4);
}

.form-radio__input:checked {
  background-color: #007aff;
  border-color: #007aff;
  box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.4);
}

.form-radio__text {
  font-size: 0.875rem;
  color: #333;
  cursor: pointer;
  user-select: none;
}
</style>

<template>
  <button
    class="form-button"
    :class="`form-button--${type}`"
    :type="type"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'FormButton',
  props: {
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'default'
    }
  },
  emits: ['click']
}
</script>
<style scoped>
.form-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 0.5rem;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.form-button--submit {
  color: #fff;
  background-color: #007aff;
  border: none;
}

.form-button--submit:hover {
  background-color: #005bb5;
}

.form-button--reset {
  color: #333;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
}

.form-button--reset:hover {
  background-color: #e6e6e6;
  border-color: #999;
}

.form-button--default {
  color: #333;
  background-color: #fff;
  border: 1px solid #ddd;
}

.form-button--default:hover {
  background-color: #f5f5f5;
}
</style>

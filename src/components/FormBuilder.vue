<template>
  <div class="form-builder">
    <form
      class="form-builder__form"
      @submit.prevent="onSubmit"
      @reset.prevent="resetForm"
    >
      <div
        v-for="(formSection, sectionKey) in formConfig"
        :key="formSection.name"
        class="form-builder__section"
      >
        <h2 class="form-builder__section-title">{{ formSection.name }}</h2>
        <div class="form-builder__section-content">
          <div
            v-for="formEl in formSection.items"
            :key="formEl.name"
            class="form-builder__field"
          >
            <form-password
              v-if="formEl.type === 'password' && formEl.name === 'pass'"
              v-model="formData[sectionKey][formEl.name]"
              :label="formEl.label"
            />
            <form-repeat-password
              v-else-if="
                formEl.type === 'password' && formEl.name === 'repeat-pass'
              "
              v-model="formData[sectionKey][formEl.name]"
              :parent="formData[sectionKey]['pass']"
              :label="formEl.label"
            />
            <form-radio
              v-else-if="formEl.type === 'radio'"
              v-model="formData[sectionKey][formEl.name]"
              :label="formEl.label"
              :options="formEl.additional.options"
            />
            <form-select
              v-else-if="formEl.type === 'select'"
              v-model="formData[sectionKey][formEl.name]"
              :label="formEl.label"
              :options="formEl.additional.options"
            />
            <form-input
              v-else
              v-model="formData[sectionKey][formEl.name]"
              :label="formEl.label"
            />
          </div>
        </div>
      </div>
      <div class="form-builder__actions">
        <form-button
          label="Отправить"
          type="submit"
        />
        <form-button
          label="Стереть"
          type="reset"
        />
      </div>
    </form>

    <pre class="form-builder__debug">{{ formData }}</pre>
  </div>
</template>

<script>
import { validateFormConfig } from '@/validators'
import FormButton from '@/components/form-items/FormButton.vue'
import FormInput from '@/components/form-items/FormInput.vue'
import FormSelect from '@/components/form-items/FormSelect.vue'
import FormRadio from '@/components/form-items/FormRadio.vue'
import FormPassword from '@/components/form-items/FormPassword.vue'
import FormRepeatPassword from '@/components/form-items/FormRepeatPassword.vue'

export default {
  name: 'FormBuilder',
  components: {
    FormPassword,
    FormRepeatPassword,
    FormRadio,
    FormSelect,
    FormInput,
    FormButton
  },
  props: {
    formConfig: {
      type: Object,
      required: true,
      validator: validateFormConfig
    }
  },
  data() {
    return {
      formData: {}
    }
  },
  created() {
    if (this.formConfig) this.initFormData()
  },
  methods: {
    initFormData() {
      this.formData = {}

      Object.keys(this.formConfig).forEach(sectionKey => {
        const section = this.formConfig[sectionKey]
        this.formData[sectionKey] = {}

        section.items.forEach(item => {
          const defaultValue = item.additional?.options?.find(
            opt => opt.selected
          )?.value

          this.formData[sectionKey][item.name] = defaultValue ?? ''
        })
      })
    },
    validateFormData(formData) {
      const errors = []

      for (const sectionKey in formData) {
        const sectionData = formData[sectionKey]

        for (const fieldKey in sectionData) {
          const fieldValue = sectionData[fieldKey]

          if (fieldValue === '') {
            errors.push(
              `Поле "${fieldKey}" в секции "${sectionKey}" не заполнено.`
            )
          }
        }

        if (!sectionData['repeat-pass']) {
          errors.push(
            `Пароль и подтверждение не совпадают в секции "${sectionKey}".`
          )
        }
      }

      return errors
    },
    getCleanedData(data) {
      const cleanedData = {}

      for (const section in data) {
        cleanedData[section] = {}

        for (const field in data[section]) {
          if (field == 'repeat-pass') continue

          cleanedData[section][field] =
            field === 'age'
              ? Number(data[section][field])
              : data[section][field]
        }
      }

      return cleanedData
    },
    onSubmit() {
      const errors = this.validateFormData(this.formData)

      if (errors.length) {
        alert('Ошибки в форме:\n' + errors.join('\n'))

        return
      }

      const cleanedData = this.getCleanedData(this.formData)

      this.sendData(cleanedData)
      this.resetForm()
    },
    async sendData(data) {
      try {
        const response = await fetch('/api', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })

        if (!response.ok) {
          throw new Error(`Ошибка сервера: ${response.statusText}`)
        }

        const result = await response.json()
        console.log('Ответ сервера:', result)
      } catch (error) {
        console.error('Ошибка отправки:', error)
      } finally {
        console.log('Отправленные данные:', data)
      }
    },
    resetForm() {
      this.initFormData()
    }
  }
}
</script>

<style scoped>
.form-builder {
  display: flex;
  gap: 1.5rem;
  margin: 0 auto;
  padding: 1rem;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  background-color: #fff;
}

.form-builder__form {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1rem;
}

.form-builder__section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-builder__section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.form-builder__section-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-builder__field {
  display: flex;
  flex-direction: column;
}

.form-builder__actions {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
}

.form-builder__submit {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  background-color: #007aff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-builder__submit:hover {
  background-color: #005bb5;
}

.form-builder__reset {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.form-builder__reset:hover {
  background-color: #e6e6e6;
  border-color: #999;
}

.form-builder__debug {
  flex: 1;
  padding: 1rem;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-family: monospace;
  font-size: 0.875rem;
  color: #333;
}
</style>

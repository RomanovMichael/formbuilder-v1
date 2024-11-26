<template>
  <main>
    <div
      v-if="isLoading"
      class="loading-spinner"
    >
      Загрузка...
    </div>
    <FormBuilder
      v-else-if="formConfig"
      :form-config="formConfig"
    />
    <div
      v-else
      class="error-message"
    >
      Не удалось загрузить конфиг
    </div>
  </main>
</template>

<script>
import FormBuilder from '../components/FormBuilder.vue'

export default {
  name: 'HomeView',
  components: { FormBuilder },
  data() {
    return {
      formConfig: {},
      isLoading: false
    }
  },
  async created() {
    await this.loadFormConfig()
  },
  methods: {
    async loadFormConfig() {
      try {
        this.isLoading = true
        const response = await new Promise(resolve => {
          setTimeout(async () => {
            const fetchResponse = await fetch('/form-config.json')
            resolve(fetchResponse)
          }, 2000)
        })

        if (!response.ok) {
          throw new Error(`Ошибка загрузки конфига: ${response.statusText}`)
        }

        this.formConfig = await response.json()
      } catch (error) {
        console.error('Ошибка загрузки конфига:', error)
        this.formServices = null
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
<style scoped>
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: #007aff;
}

.error-message {
  text-align: center;
  font-size: 1.25rem;
  color: #ff3b30;
  margin: 2rem 0;
}
</style>

export const validateFormConfig = value => {
  if (typeof value !== 'object' || value === null) {
    console.error('Конфиг должен быть объектом')

    return false
  }

  let isValid = true

  Object.keys(value).forEach(sectionKey => {
    const section = value[sectionKey]

    if (
      !Object.prototype.hasOwnProperty.call(section, 'name') ||
      !Object.prototype.hasOwnProperty.call(section, 'items')
    ) {
      console.error(`Секция ${sectionKey} должна содержать 'name' и 'items'.`)
      isValid = false

      return
    }

    if (typeof section.name !== 'string') {
      console.error(`Ключ 'name' в секции ${sectionKey} должен быть строкой.`)
      isValid = false

      return
    }

    if (!Array.isArray(section.items)) {
      console.error(`Ключ 'items' в секции ${sectionKey} должен быть массивом.`)
      isValid = false

      return
    }

    const isValidItems = section.items.every(item => {
      const hasRequiredKeys =
        Object.prototype.hasOwnProperty.call(item, 'name') &&
        Object.prototype.hasOwnProperty.call(item, 'type')

      if (!hasRequiredKeys) {
        console.error(
          `Элемент в секции ${sectionKey} должен содержать 'name' и 'type'.`
        )

        return false
      }

      if (typeof item.name !== 'string' || typeof item.type !== 'string') {
        console.error(
          `Поля 'name' и 'type' элемента в секции ${sectionKey} должны быть строками.`
        )

        return false
      }

      return true
    })

    if (!isValidItems) {
      isValid = false
    }
  })

  return isValid
}

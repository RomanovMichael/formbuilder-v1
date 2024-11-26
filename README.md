# Тестовое задание Front-End(вариант 1)

Задача: доработать компонент FormBuilder.vue для создания/генерирования форм из
конфига;

<img width="1439" alt="Снимок экрана 2024-11-26 в 16 00 04" src="https://github.com/user-attachments/assets/3e3e7aee-7564-4fa2-a34e-e73013acb317">


## Краткое описание

- Конфиг получаю асинхронно на странице и передаю пропсой в компонент билдера
- Формирую модель в data на основе полученного конфига (по хуку created)
- Привязываюсь к модели посредством динамического двухстороннего связывания
- Валидирую конфиг (/src/validators)
- Для корректной работы нескольких групп радио-кнопок на странице внутри
  компонента генерирую uuid
- Компонент FormRepeatPassword смотрит за пропсой parent и емитит логическое
  значение
- Валидация: пробегаюсь про структуре данных, собираю массив ошибок
- Отправка запроса - если есть ошибки, выбрасываю alert. Если нет, привожу
  данные к нужному виду (тип age и repeat-pass) и отправляю фетчем
- Тест: сформировал моковый конфиг, проверяю, что разметка включает в себя
  элементы из конфига (заголовки разделов и полей формы)

## Задание

Конфиг прикреплен, лежит в корне form-config.json. Имеет поля:

- `name` - обязательное поле, подставляется в name атрибут. Просто строка;
- `type` - обязательное поле, компонент для элемента формы. Один из 'input' |
  'select' | 'radio' | 'password' | 'repeat-password';
- `label` - лейбл над элементом формы. Опциональный (можно не указывать);
- `additional` - вспомогательные свойства в зависимости от компонента/типа.
  Опциональный;

- Форма имеет одну кнопку submit и clear;
- Разделы форм имеют заголовок;
- Задача будет проверяться на похожем конфиге, но с такими же условиями;
- Все элементы формы обязательны для заполнения;
- По клику на submit форма должна проверять/валидировать, что все поля
  заполнены, и пароли совпадают;
- Если валидация прошла успешно, то отправлять запрос (фейковый, пусть с
  ошибкой) с телом вида:

```
{
    parent: {
        name: string
        gender: string
        age: number
        pass: string
    }
    child: {
        name: string
        gender: string
        age: number
        pass: string
    }
}
```

- Нельзя изменять конфиг файл;
- Описание намеренно местами неполное. Но достаточное. Подумайте самостоятельно,
  как бы сделали, исходя из конфига;
- В проекте можно менять что угодно по своему усмотрению, билд сделан, чтобы
  сократить время на рутинную сборку.

### компонент input

- Обычный `<input type="text">`
- Имеет props `label` отображается над элементом.
- Имеет props `type` - тип инпута. Для переиспользования компонента.

### компонент select

- Обычный `<select>`;
- Имеет props `options` массив опций
  - `value` - значение
  - `text` - текст
  - `selected` - выбранная опция по умолчанию;
- Имеет props `label` отображается над элементом.

### компонент radio

- Обычный `<input type="radio">`
- Имеет props `options` массив опций
  - `value` - значение
  - `text` - текст
  - `selected` - выбранный radio по умолчанию
- Имеет props `label` отображается над всеми radio.

### компонент password

- Обычный `<input type="password">`;
- Имеет props `label` отображается над элементом;

### компонент repeat-password

- Обычный `<input type="password">`
- Имеет props `label` отображается над элементом.
- Имеет props `parent`. Это связь с input по которому должно проверяться что
  пароли совпадают между собой.

## Что будем смотреть

- Понятность кода и решений;
- Если получится, напишите хотя бы один нетривиальный тест;
- В задаче нет верстки, но мы ее учтем если стилизуете компоненты. (наименования
  желательно по БЭМ);
- Компоненты на options api, т.к. наш проект все еще на vue 2 и в процессе
  переезда на Vue 3. Считайте это своеобразной проверкой знаний синтаксиса Vue
  2;
- Внимательность (в том числе понимание задачи) и соблюдение всех требований;
- Будем рассчитывать, что мы с вами на одной волне. Описание не самое четкое. Но
  достаточное :)

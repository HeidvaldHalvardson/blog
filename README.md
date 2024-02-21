# Блог-платформа (React)

https://blog-lake-pi-87.vercel.app

### Проект использует технологии:
* React
* Typescript
* Redux
* Redux Toolkit
* RTK query

#### API: https://bump.sh/gerome-grignon-lp2/doc/realworld (Корневой URL для API: https://blog.kata.academy/api/)
#### Макет: https://www.figma.com/file/XXBjJXew3xpfbOZUnO9QVB/Blog?node-id=9582%3A0

## Cтраница со списком статей:
Пагинация реализована с использованием Ant Design - React UI framework. 
Пагинация статей на стороне сервера - при смене страницы отправляем новый запрос. 

## Страница одной статьи. 
Полный текст статьи - это Markdown разметка (реализоваана с использованием markdown-to-jsx).
Используйте react-router для навигации по страницам.

## Навигация по сайту:

**/** и **/articles** - список всех статей. 
При клике на заголовок - переход на страницу статьи.

**/articles/{slug}** - Просмотр статьи с полным текстом.

**/articles/{slug}/edit** - страница редактирования статьи.

**/new-article** - страница создания статьи. При переходе по этой ссылке без аутентификации - перебрасывает на страницу логина.

**/sign-in** - страница входа.

**/sign-up** - страница регистрации.

**/profile** - страница редактирования информации пользователя. Переход на эту страницу происходит по клике на имени-аватарке в шапке.

### Валидация:
Для клиентской валидации форм использована библиотека React Hook Form.

#### Регистрация (все поля обязательны):

* email должен быть корректным почтовым адресом
* username должен быть от 3 до 20 символов (включительно)
* password должен быть от 6 до 40 символов (включительно)
* password и repeat password должны совпадать
* галочка согласия с обработкой персональных данных должна быть отмечена

#### Логин:

* email должен быть не пустой, должен быть корректным почтовым адресом
* password должен быть не пустой

#### Редактирование профиля:

* username не должен быть пустым
* email должен быть корректным почтовым адресом, не должен быть пустым
* new password должен быть от 6 до 40 символом
* avatar image должен быть корректным url
* Серверные ошибки должны нормально подсвечивать соответствующие поля.


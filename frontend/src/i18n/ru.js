export const ru = {
  translation: {
    common: {
      errors: {
        identityLength: "От 3 до 20 символов",
        required: "Обязательное поле",
        uniqueName: "Должно быть уникальным",
      },
      actions: {
        cancel: "Отменить",
        send: "Отправить",
      },
    },
    login: {
      title: "Войти",
      labels: {
        username: "Ваш ник",
        password: "Пароль",
        action: "Войти",
      },
      signup: {
        link: "Регистрация",
        hint: "Нет аккаунта?",
      },
      errors: {
        unauthorized: "Неверные имя пользователя или пароль",
      },
    },
    signup: {
      title: "Регистрация",
      labels: {
        username: "Имя пользователя",
        password: "Пароль",
        confirmPassword: "Подтвердите пароль",
        action: "Зарегистрироваться",
      },
      errors: {
        conflict: "Такой пользователь уже существует",
        passwordLength: "Не менее 6 символов",
        passwordMatch: "Пароли должны совпадать",
      },
    },
    logout: "Выйти",
    chat: {
      messageCount:
        "{n, plural, =0 {0 сообщений} =1 {1 сообщение} few {# сообщения} other {# сообщений}}",
      labels: {
        messageBody: "Введите сообщение...",
        action: "Отправить",
      },
    },
    channels: {
      title: "Каналы",
      add: {
        title: "Добавить канал",
        successMessage: "Канал создан",
      },
      remove: {
        action: "Удалить",
        title: "Удалить канал",
        hint: "Уверены?",
        successMessage: "Канал удалён",
      },
      rename: {
        action: "Переименовать",
        title: "Переименовать канал",
        successMessage: "Канал переименован",
      },
    },
  },
};

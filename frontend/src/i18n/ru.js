export const ru = {
  translation: {
    common: {
      errors: {
        generic: 'Что-то пошло не так',
        identityLength: 'От 3 до 20 символов',
        required: 'Обязательное поле',
        uniqueName: 'Должно быть уникальным',
        networkOffline: 'Ошибка соединения',
        networkOnline: 'Соединение восстановлено',
        tokenExpiration: 'Сессия устарела, войдите заново',
      },
      actions: {
        cancel: 'Отменить',
        send: 'Отправить',
      },
    },
    login: {
      title: 'Войти',
      labels: {
        username: 'Ваш ник',
        password: 'Пароль',
        action: 'Войти',
      },
      signup: {
        link: 'Регистрация',
        hint: 'Нет аккаунта?',
      },
      errors: {
        unauthorized: 'Неверные имя пользователя или пароль',
      },
    },
    signup: {
      title: 'Регистрация',
      labels: {
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        action: 'Зарегистрироваться',
      },
      errors: {
        conflict: 'Такой пользователь уже существует',
        passwordLength: 'Не менее 6 символов',
        passwordMatch: 'Пароли должны совпадать',
      },
    },
    logout: 'Выйти',
    chat: {
      messageCount:
        '{n, plural, =0 {0 сообщений} =1 {1 сообщение} few {# сообщения} other {# сообщений}}',
      labels: {
        messageBody: 'Введите сообщение...',
        action: 'Отправить',
        aria: 'Новое сообщение',
      },
    },
    channels: {
      title: 'Каналы',
      dropdownAria: 'Управление каналом',
      add: {
        title: 'Добавить канал',
        successMessage: 'Канал создан',
        aria: 'Имя канала',
      },
      remove: {
        action: 'Удалить',
        title: 'Удалить канал',
        hint: 'Уверены?',
        successMessage: 'Канал удалён',
      },
      rename: {
        action: 'Переименовать',
        title: 'Переименовать канал',
        successMessage: 'Канал переименован',
      },
    },
    notFound: {
      title: 'Страница не найдена',
      hint: 'Но вы можете перейти',
      link: 'на главную страницу',
    },
  },
}

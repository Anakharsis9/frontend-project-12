export const en = {
  translation: {
    common: {
      errors: {
        identityLength: 'From 3 to 20 characters',
        required: 'Required field',
        uniqueName: 'Must be unique',
        networkOffline: 'Connection error',
        networkOnline: 'Connection restored',
      },
      actions: {
        cancel: 'Cancel',
        send: 'Send',
      },
    },
    login: {
      title: 'Log In',
      labels: {
        username: 'Your nickname',
        password: 'Password',
        action: 'Log In',
      },
      signup: {
        link: 'Sign Up',
        hint: 'Don’t have an account?',
      },
      errors: {
        unauthorized: 'Invalid username or password',
      },
    },
    signup: {
      title: 'Sign Up',
      labels: {
        username: 'Username',
        password: 'Password',
        confirmPassword: 'Confirm password',
        action: 'Register',
      },
      errors: {
        conflict: 'User already exists',
        passwordLength: 'At least 6 characters',
        passwordMatch: 'Passwords must match',
      },
    },
    logout: 'Log Out',
    chat: {
      messageCount:
        '{n, plural, =0 {0 messages} =1 {1 message} few {# messages} other {# messages}}',
      labels: {
        messageBody: 'Type a message...',
        action: 'Send',
        aria: 'New message',
      },
    },
    channels: {
      title: 'Channels',
      dropdownAria: 'Channel settings',
      add: {
        title: 'Add channel',
        successMessage: 'Channel created',
        aria: 'Channel name',
      },
      remove: {
        action: 'Remove',
        title: 'Remove channel',
        hint: 'Are you sure?',
        successMessage: 'Channel removed',
      },
      rename: {
        action: 'Rename',
        title: 'Rename channel',
        successMessage: 'Channel renamed',
      },
    },
    notFound: {
      title: 'Page not found',
      hint: 'But you can go',
      link: 'to the main page',
    },
  },
}

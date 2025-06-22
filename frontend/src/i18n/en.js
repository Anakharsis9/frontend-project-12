export const en = {
  translation: {
    common: {
      errors: {
        identityLength: "From 3 to 20 characters",
        required: "Required field",
        uniqueName: "Must be unique",
      },
      actions: {
        cancel: "Cancel",
        send: "Send",
      },
    },
    login: {
      title: "Log In",
      labels: {
        username: "Your nickname",
        password: "Password",
        action: "Log In",
      },
      signup: {
        link: "Sign Up",
        hint: "Don’t have an account?",
      },
      errors: {
        unauthorized: "Invalid username or password",
      },
    },
    signup: {
      title: "Sign Up",
      labels: {
        username: "Username",
        password: "Password",
        confirmPassword: "Confirm password",
        action: "Register",
      },
      errors: {
        conflict: "User already exists",
        passwordLength: "At least 6 characters",
        passwordMatch: "Passwords must match",
      },
    },
    logout: "Log Out",
    chat: {
      messageCount:
        "{n, plural, =0 {0 messages} =1 {1 message} few {# messages} other {# messages}}",
      labels: {
        messageBody: "Type a message...",
        action: "Send",
      },
    },
    channels: {
      title: "Channels",
      add: {
        title: "Add channel",
        successMessage: "Channel created",
      },
      remove: {
        action: "Remove",
        title: "Remove channel",
        hint: "Are you sure?",
        successMessage: "Channel removed",
      },
      rename: {
        action: "Rename",
        title: "Rename channel",
        successMessage: "Channel renamed",
      },
    },
  },
};

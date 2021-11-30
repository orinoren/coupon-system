## `Login page`

### useState

1. `loginAttempt` : determine if the user try to login.

### useRef

1. `emailInputRef` : refernce email input element.
2. `passwordInputRed` :refernce password input element.
3. `emailErrorRef` :refernce email error element.
4. `passwordErrorRef` :refernce email error element.
5. `usernamePasswordErrorRef` :refernce email and password server error element.

### useSelector

1. `userDetails` : holds details about the current user logged in

### useEffect

1. On every enter to to login page

- dispatch `(resetSearchModeAction())` to clear search result for next login fresh start.
- dispatch `({ type: "LOGOUT" })` to logout the user for safety login attempt.

2. On every change in the `userDetails` that can be change by login/logout operation.

- Check `loginAttempt` .
  1. if true
  - Check if the `userDetails.logged` is true and entering a switch case block with the `userDetails.role` to route the user to the relevant page for him.
  - if `userDetails.logged` is false
    `passwordErrorRef` dispalyed for none to let the
    `usernamePasswordErrorRef` to take is place in the ui and dispaly the error messege from the server.
  2. if `loginAttempt` is false
  - `usernamePasswordErrorRef` dispalyed for none to hide the element.

### Methods

1.  `handleLoginBtnClicked` :

- Checks if login details are valid with `loginDetailsValidation` from the utils folder.
- if login details are valid create an json object of login details and dispatch `(loginAction())` with the login details object to send details to server.
- set `LoginAttempt` to true to make the component render.

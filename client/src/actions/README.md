# `ACTIONS`

This folder contains all the actions that are used to trigger changes
to the ui and for sending http requests to the server.

### `Login action`

1. Making a post http request with login details that contain the email ad password of the user.
2. If the response type is 200 (OK) the login made successfuly and.

- Set authenticatedAxios Token to the jwt that recevied from the server.
- Trigger the redux store with the user details to make a login user mode.

3. If response status is not 200 the triggering the redux store with a login faild to show the user a messege to try again.

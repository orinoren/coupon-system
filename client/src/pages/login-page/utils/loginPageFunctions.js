export const loginDetailsValidation = (
  emailInputRef,
  emailErrorRef,
  passwordInputRef,
  passwordErrorRef
) => {
  if (emailInputRef.current.value === "") {
    emailErrorRef.current.style.visibility = "visible";
    emailInputRef.current.style.border = "3px solid red";
    emailErrorRef.current.textContent = "please enter an email";
    return false;
  }
  if (!emailInputRef.current.value.includes("@")) {
    emailErrorRef.current.style.visibility = "visible";
    emailInputRef.current.style.border = "3px solid red";
    emailErrorRef.current.textContent = "@ is missing";
    return false;
  }
  if (passwordInputRef.current.value === "") {
    passwordErrorRef.current.style.visibility = "visible";
    passwordInputRef.current.style.border = "3px solid red";
    passwordErrorRef.current.textContent = "please enter password";
    return false;
  }
  return true;
};

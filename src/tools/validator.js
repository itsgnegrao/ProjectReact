const regex_email = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function validateEmail(value) {
  return regex_email.exec(value);
}

export { validateEmail };
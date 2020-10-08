const CPF = require("cpf");
const regex_email = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const regex_data = /\d\d\d\d-[0-1][0-9]-[0-1][0-9]/;
const _MS_PER_DAY = 1000 * 3600 * 24;

function validateEmail(value) {
  return regex_email.exec(value);
}

function validateCpf(value) {
  return CPF.isValid(value);
}

// O componente Date excolhido retorna sempre um dia a menos por isso a validação com difernça de 1 dia
function validateDate(value) {
  let now = Date.now();
  let date = new Date(value);
  const diffDays = Math.floor((now - date) / _MS_PER_DAY);

  if (regex_data.exec(value).length > 0 && diffDays > 1) {
    return true;
  }

  return false;
}

export { validateEmail, validateCpf, validateDate };

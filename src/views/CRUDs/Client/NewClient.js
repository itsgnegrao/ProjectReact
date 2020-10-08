import React, { useState } from "react";
import "../../../styles/CRUDs/NewClient.css";
import { Form, FormGroup, Input, Button, Label } from "reactstrap";
import { postWithLogin } from "../../../controllers/request";
import {
  validateEmail,
  validateCpf,
  validateDate
} from "../../../tools/validator";

function NewClient(props) {
  const [state, setState] = useState({
    nome: "Testerson Da Silva Teste",
    sexo: "M",
    email: "itsgnegrao@teste.com.br",
    data_nasc: "1996-10-15",
    naturalidade: "Campo Mourão - Paraná",
    nacionalidade: "Brasil",
    cpf: "08474392918"
  });
  const [user, setUser] = useState(props.user);
  const [validates, setValidates] = useState({
    email: null,
    cpf: "invalid",
    data: "invalid"
  });

  const nestedObjectSet = (obj, path, value) => {
    let schema = obj; // a moving reference to internal objects within obj
    const pList = path.split(".");
    const len = pList.length;
    for (let i = 0; i < len - 1; i++) {
      let elem = pList[i];
      if (!schema[elem]) schema[elem] = {};
      schema = schema[elem];
    }
    schema[pList[len - 1]] = value;
  };

  const handleChangeFields = e => {
    let newState = Object.assign({}, state);
    nestedObjectSet(newState, e.target.name, e.target.value);
    setState(newState);

    if (e.target.name === "email") {
      setValidates({
        ...validates,
        email:
          e.target.value !== ""
            ? !validateEmail(e.target.value)
              ? "invalid"
              : "valid"
            : null
      });
    } else if (e.target.name === "cpf") {
      setValidates({
        ...validates,
        cpf:
          e.target.value !== ""
            ? !validateCpf(e.target.value)
              ? "invalid"
              : "valid"
            : null
      });
    }
    // O componente Date excolhido retorna sempre um dia a menos por isso a validação com difernça de 1 dia
    else if (e.target.name === "data_nasc") {
      setValidates({
        ...validates,
        data_nasc:
          e.target.value !== ""
            ? !validateDate(e.target.value)
              ? "invalid"
              : "valid"
            : null
      });
    }
  };

  const handleCadastrar = async () => {
    let resp = await postWithLogin(
      process.env.REACT_APP_API_URL_APIV1 + "/client",
      state,
      user
    );

    alert(
      resp.success
        ? "Cliente Cadastrado com Sucesso!!"
        : "Erro ao Cadastrar Cliente!\n\n" +
            (resp.content !== null ? resp.content.join("\n") : "")
    );
    if (resp.success) {
      props.return();
    }
  };

  return (
    <div className="NewClient">
      <div className="NewClient-body">
        <div>
          <Label className="NewClient-title">Cadastrar Cliente</Label>

          <Form>
            <FormGroup>
              <Input
                className="NewClient-input"
                type="text"
                name="nome"
                data-value="nome"
                value={state.nome}
                onChange={handleChangeFields}
                placeholder="Nome"
              />

              <span className="NewClient-span1" />

              <Input
                className="NewClient-input"
                type="text"
                name="sexo"
                data-value="sexo"
                value={state.sexo}
                onChange={handleChangeFields}
                placeholder="Sexo"
              />

              <span className="NewClient-span1" />

              {validates.email ? (
                validates.email === "valid" ? (
                  <Input
                    valid
                    className="NewClient-input"
                    data-value="email"
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleChangeFields}
                    id="exampleEmail"
                    placeholder="Email"
                  />
                ) : (
                  <Input
                    invalid
                    className="NewClient-input"
                    data-value="email"
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleChangeFields}
                    id="exampleEmail"
                    placeholder="Email"
                  />
                )
              ) : (
                <Input
                  className="NewClient-input"
                  data-value="email"
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={handleChangeFields}
                  id="exampleEmail"
                  placeholder="Email"
                />
              )}

              <span className="NewClient-span1" />

              {validates.data === "valid" ? (
                <Input
                  valid
                  className="NewClient-input"
                  type="date"
                  name="data_nasc"
                  data-value="data_nasc"
                  value={state.data_nasc}
                  onChange={handleChangeFields}
                  placeholder="Data de Nascimento"
                />
              ) : (
                <Input
                  invalid
                  className="NewClient-input"
                  type="date"
                  name="data_nasc"
                  data-value="data_nasc"
                  value={state.data_nasc}
                  onChange={handleChangeFields}
                  placeholder="Data de Nascimento"
                />
              )}

              <span className="NewClient-span1" />

              <Input
                className="NewClient-input"
                type="text"
                name="naturalidade"
                data-value="naturalidade"
                value={state.naturalidade}
                onChange={handleChangeFields}
                placeholder="Naturalidade"
              />

              <span className="NewClient-span1" />

              <Input
                className="NewClient-input"
                type="text"
                name="nacionalidade"
                data-value="nacionalidade"
                value={state.nacionalidade}
                onChange={handleChangeFields}
                placeholder="Nacionalidade"
              />

              <span className="NewClient-span1" />

              {validates.cpf === "valid" ? (
                <Input
                  valid
                  className="NewClient-input"
                  type="text"
                  name="cpf"
                  data-value="cpf"
                  value={state.cpf}
                  onChange={handleChangeFields}
                  placeholder="CPF"
                />
              ) : (
                <Input
                  invalid
                  className="NewClient-input"
                  type="text"
                  name="cpf"
                  data-value="cpf"
                  value={state.cpf}
                  onChange={handleChangeFields}
                  placeholder="CPF"
                />
              )}
            </FormGroup>
          </Form>

          <div>
            <Button
              className="Login-button"
              color="primary"
              id="ButtonLogin"
              onClick={handleCadastrar}
            >
              Cadastrar
            </Button>

            <span style={{ paddingLeft: "10px" }} />

            <Button
              className="Login-button"
              color="danger"
              id="ButtonLogin"
              onClick={() => props.return()}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewClient;

import React, { useState } from "react";
import "../../../styles/CRUDs/NewClient.css";
import { Form, FormGroup, Input, Button, Label } from "reactstrap";

function NewClient(props) {
  const [state, setState] = useState({
    nome: "Testerson Da Silva Teste",
    sexo: "M",
    email: "itsgnegrao@teste.com.br",
    data_nasc: "15/10/1996",
    naturalidade: "Campo Mourão - Paraná",
    nacionalidade: "Brasil",
    cpf: "084.743.929-18"
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
  };

  const handleCadastrar = () => {
    console.log("chama aqui a func de cadastrar");
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

              <Input
                className="NewClient-input"
                type="text"
                name="email"
                data-value="email"
                value={state.email}
                onChange={handleChangeFields}
                placeholder="Email"
              />

              <span className="NewClient-span1" />

              <Input
                className="NewClient-input"
                type="text"
                name="data_nasc"
                data-value="data_nasc"
                value={state.data_nasc}
                onChange={handleChangeFields}
                placeholder="Data de Nascimento"
              />

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
                data-value="naturalidade"
                value={state.nacionalidade}
                onChange={handleChangeFields}
                placeholder="Nacioanlidade"
              />

              <span className="NewClient-span1" />

              <Input
                className="NewClient-input"
                type="text"
                name="cpf"
                data-value="cpf"
                value={state.cpf}
                onChange={handleChangeFields}
                placeholder="CPF"
              />
            </FormGroup>
          </Form>

          <div>
            <Button
              className="Login-button"
              color="danger"
              id="ButtonLogin"
              onClick={() => props.return()}
            >
              Cancelar
            </Button>

            <span style={{ paddingLeft: "10px" }} />

            <Button
              className="Login-button"
              color="primary"
              id="ButtonLogin"
              onClick={handleCadastrar}
            >
              Cadastrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewClient;

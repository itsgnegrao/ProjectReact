import React, { useState } from "react";
import "../../../styles/CRUDs/NewClient.css";
import {
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader
} from "reactstrap";

function EditClient(props) {
  const [state, setState] = useState({
    client: props.client,
    visibleModal: false,
    msgModalSuccess: ""
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
    let newClient = Object.assign({}, state.client);
    nestedObjectSet(newClient, e.target.name, e.target.value);
    setState({ ...state, client: newClient });
  };

  // Modals+Handles
  const modal = () => {
    return (
      <div>
        <Modal isOpen={state.visibleModal} toggle={handleModalClose}>
          <ModalHeader>Edição</ModalHeader>
          <ModalBody>{state.msgModalSuccess}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleModalClose}>
              OK
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  const handleModalClose = () => {
    setState({
      ...state,
      visibleModal: !state.visibleModal
    });
  };

  const handleDelete = () => {
    console.log("chama aqui a func de edição");

    setState({
      ...state,
      msgModalSuccess: "Editado com Sucesso!",
      visibleModal: !state.visibleModal
    });
  };

  return (
    <div className="NewClient">
      {modal()}

      <div className="NewClient-body">
        <div>
          <Label className="NewClient-title">Editar Cliente</Label>

          <Form>
            <FormGroup>
              <Input
                className="NewClient-input"
                type="text"
                name="nome"
                data-value="nome"
                value={state.client.nome}
                onChange={handleChangeFields}
                placeholder="Nome"
              />

              <span className="NewClient-span1" />

              <Input
                className="NewClient-input"
                type="text"
                name="sexo"
                data-value="sexo"
                value={state.client.sexo}
                onChange={handleChangeFields}
                placeholder="Sexo"
              />

              <span className="NewClient-span1" />

              <Input
                className="NewClient-input"
                type="text"
                name="email"
                data-value="email"
                value={state.client.email}
                onChange={handleChangeFields}
                placeholder="Email"
              />

              <span className="NewClient-span1" />

              <Input
                className="NewClient-input"
                type="text"
                name="data_nasc"
                data-value="data_nasc"
                value={state.client.data_nasc}
                onChange={handleChangeFields}
                placeholder="Data de Nascimento"
              />

              <span className="NewClient-span1" />

              <Input
                className="NewClient-input"
                type="text"
                name="naturalidade"
                data-value="naturalidade"
                value={state.client.naturalidade}
                onChange={handleChangeFields}
                placeholder="Naturalidade"
              />

              <span className="NewClient-span1" />

              <Input
                className="NewClient-input"
                type="text"
                name="nacionalidade"
                data-value="naturalidade"
                value={state.client.nacionalidade}
                onChange={handleChangeFields}
                placeholder="Nacioanlidade"
              />

              <span className="NewClient-span1" />

              <Input
                className="NewClient-input"
                type="text"
                name="cpf"
                data-value="cpf"
                value={state.client.cpf}
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
              onClick={handleDelete}
            >
              Concluir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditClient;

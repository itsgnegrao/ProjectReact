import React, { useState } from "react";
import "../../../styles/CRUDs/NewClient.css";
import {
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  Alert,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";

function SearchClient(props) {
  const [state, setState] = useState({
    visibleModal: false,
    visibleModalDelete: false,
    visibleModalSuccess: false,
    msgModalSuccess: "",
    element: null,
    vaLue: "Testerson Da Silva Teste",
    filter: "name",
    list: [
      {
        nome: "Testerson Da Silva Teste",
        sexo: "M",
        email: "itsgnegrao@teste.com.br",
        data_nasc: "15/10/1996",
        naturalidade: "Campo Mourão - Paraná",
        nacionalidade: "Brasil",
        cpf: "084.743.929-18"
      },
      {
        nome: "Testerson Da Silva Teste2",
        sexo: "M",
        email: "itsgnegrao@teste.com.br",
        data_nasc: "15/10/1996",
        naturalidade: "Campo Mourão - Paraná",
        nacionalidade: "Brasil",
        cpf: "084.743.929-13"
      }
    ]
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

  const handleClickAlert = e => {
    setState({
      ...state,
      visibleModal: !state.visibleModal,
      element: e
    });
  };

  const populate = list => {
    let elements = [];
    list.forEach(element => {
      elements.push(
        <Alert
          color="primary"
          style={{ fontSize: "14px" }}
          value={element}
          onClick={() => handleClickAlert(element)}
        >
          Nome: {element.nome} , Sexo: {element.sexo} , Email: {element.email} ,
          Naturalidade: {element.naturalidade} , Nacionalidade:{" "}
          {element.nacionalidade} , CPF: {element.cpf}
        </Alert>
      );
    });
    return elements;
  };

  const handleBuscar = () => {
    console.log("chama aqui a func de buscar e popular");
  };

  // Modals+Handles
  const modal = () => {
    return (
      <div>
        <Modal isOpen={state.visibleModal} toggle={handleModalClose}>
          <ModalHeader>Oque deseja fazer?</ModalHeader>
          <ModalBody>
            <div>
              <Button
                color="primary"
                onClick={() => props.return("edit", state.element)}
              >
                Editar
              </Button>

              <span style={{ paddingLeft: "10px" }} />

              <Button
                color="danger"
                onClick={() => {
                  handleModalDeleteClose(state.element);
                }}
              >
                Deletar
              </Button>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleModalClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  const handleModalClose = () => {
    setState({ ...state, visibleModal: !state.visibleModal });
  };

  // Modals+Handles
  const modalDelete = () => {
    return (
      <div>
        <Modal
          isOpen={state.visibleModalDelete}
          toggle={handleModalDeleteClose}
        >
          <ModalHeader>Deletar</ModalHeader>
          <ModalBody>Deseja Realmente Deletar O Cliente?</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleModalDelete}>
              Deletar
            </Button>

            <span style={{ paddingLeft: "10px" }} />

            <Button color="danger" onClick={handleModalDeleteClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  const handleModalDeleteClose = () => {
    setState({
      ...state,
      visibleModal: !state.visibleModal,
      visibleModalDelete: !state.visibleModalDelete
    });
  };

  const handleModalDelete = () => {
    console.log("chama aqui a func de deletar");

    setState({
      ...state,
      msgModalSuccess: "Cliente Deletado Com Sucesso!",
      visibleModalDelete: !state.visibleModalDelete,
      visibleModalSuccess: !state.visibleModalSuccess
    });
  };

  // Modals+Handles
  const modalSuccess = () => {
    return (
      <div>
        <Modal isOpen={state.visibleModalSuccess} toggle={handleModalSuccess}>
          <ModalHeader>Deletar</ModalHeader>
          <ModalBody>{state.msgModalSuccess}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleModalSuccess}>
              OK
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  const handleModalSuccess = () => {
    setState({
      ...state,
      visibleModalSuccess: !state.visibleModalSuccess
    });
  };

  return (
    <div className="NewClient">
      {modal()}
      {modalDelete()}
      {modalSuccess()}

      <div className="NewClient-body">
        <div>
          <Label className="NewClient-title">Buscar Cliente</Label>

          <Form>
            <FormGroup>
              <div>
                <Input
                  className="NewClient-input"
                  type="text"
                  name="nome"
                  data-value="nome"
                  value={state.nome}
                  onChange={handleChangeFields}
                  placeholder="Nome"
                />

                <Button
                  className="Login-button"
                  color="primary"
                  id="ButtonLogin"
                  onClick={handleBuscar}
                >
                  Buscar
                </Button>
              </div>
            </FormGroup>
          </Form>

          <div>{populate(state.list)}</div>

          <Button
            className="Login-button"
            color="primary"
            id="ButtonLogin"
            onClick={() => props.return("", null)}
          >
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchClient;

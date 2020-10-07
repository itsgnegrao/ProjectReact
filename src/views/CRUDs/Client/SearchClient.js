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
import { postWithLogin, deleteWithLogin } from "../../../controllers/request";

function SearchClient(props) {
  const [state, setState] = useState({
    visibleModal: false,
    visibleModalDelete: false,
    visibleModalSuccess: false,
    msgModalSuccess: "",
    element: null,
    vaLue: "Testerson Da Silva Teste",
    filter: "name"

    // list: [
    //   {
    //     nome: "Testerson Da Silva Teste",
    //     sexo: "M",
    //     email: "itsgnegrao@teste.com.br",
    //     data_nasc: "15/10/1996",
    //     naturalidade: "Campo Mourão - Paraná",
    //     nacionalidade: "Brasil",
    //     cpf: "084.743.929-18"
    //   },
    //   {
    //     nome: "Testerson Da Silva Teste2",
    //     sexo: "M",
    //     email: "itsgnegrao@teste.com.br",
    //     data_nasc: "15/10/1996",
    //     naturalidade: "Campo Mourão - Paraná",
    //     nacionalidade: "Brasil",
    //     cpf: "084.743.929-13"
    //   }
    // ]
  });
  const [user, setUser] = useState(props.user);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({
    campo: "",
    valor: ""
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
    if (list.length > 0) {
      list.forEach(element => {
        elements.push(
          <Alert
            color="primary"
            style={{ fontSize: "14px" }}
            value={element}
            onClick={() => handleClickAlert(element)}
          >
            Nome: {element.nome} , Sexo: {element.sexo} , Email: {element.email}{" "}
            , Naturalidade: {element.naturalidade} , Nacionalidade:{" "}
            {element.nacionalidade} , CPF: {element.cpf}
          </Alert>
        );
      });
    }
    return elements;
  };

  const handleBuscar = () => {
    getList();
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

  const handleModalDelete = async () => {
    let resp = await deleteWithLogin(
      process.env.REACT_APP_API_URL_APIV1 + "/client/1",
      user
    );

    setState({
      ...state,
      msgModalSuccess:
        resp.success === true
          ? "Cliente Deletado Com Sucesso!"
          : "Falha ao Deletar Cliente!",
      visibleModalDelete: !state.visibleModalDelete,
      visibleModalSuccess: !state.visibleModalSuccess
    });

    handleBuscar();
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

  const getList = async () => {
    let resp = await postWithLogin(
      process.env.REACT_APP_API_URL_APIV1 + "/client/get",
      filter,
      user
    );
    setList(resp.content);
  };

  if (list.length === 0) {
    getList();
  }

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

          <div>{populate(list)}</div>

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

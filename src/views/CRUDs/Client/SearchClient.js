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
  ModalHeader,
  Row
} from "reactstrap";
import { postWithLogin, deleteWithLogin } from "../../../controllers/request";

function SearchClient(props) {
  const [state, setState] = useState({
    visibleModal: false,
    visibleModalDelete: false,
    visibleModalSuccess: false,
    msgModalSuccess: "",
    element: null
  });
  const [user, setUser] = useState(props.user);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({
    campo: "",
    valor: ""
  });

  const handleChangeFields = e => {
    setFilter({ ...filter, valor: e.target.value });
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
            <b>CPF:</b> {element.cpf} <b>Nome</b>: {element.nome} <b>Sexo</b>:{" "}
            {element.sexo} <b>Email</b>: {element.email} <b>Naturalidade</b>:{" "}
            {element.naturalidade} <b>Nacionalidade</b>: {element.nacionalidade}{" "}
            <b>Data_Nasc</b>:{" "}
            {Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit"
            }).format(new Date(element.data_nasc))}
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
      process.env.REACT_APP_API_URL_APIV1 + "/client/" + state.element.id,
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

  const handleFilter = e => {
    setFilter({ ...filter, campo: e.target.value });
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
              <Row
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  style={{ width: "160px", marginRight: "10px" }}
                  onClick={handleFilter}
                >
                  <option selected value></option>
                  <option>CPF</option>
                  <option>NOME</option>
                  <option>EMAIL</option>
                  <option>SEXO</option>
                  <option>NATURALIDADE</option>
                  <option>NACIONALIDADE</option>
                </Input>

                <Input
                  className="NewClient-input"
                  type="search"
                  name="valor"
                  data-value="valor"
                  value={filter.valor}
                  onChange={handleChangeFields}
                  placeholder="Valor"
                  style={{ width: "300px", marginRight: "10px" }}
                />

                <Button color="primary" id="ButtonLogin" onClick={handleBuscar}>
                  Buscar
                </Button>
              </Row>
            </FormGroup>
          </Form>
        </div>
      </div>
      <div
        style={{
          width: "80%",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {populate(list)}
      </div>

      <Button
        className="Login-button"
        color="primary"
        id="ButtonLogin"
        onClick={() => props.return("", null)}
      >
        Voltar
      </Button>
    </div>
  );
}

export default SearchClient;

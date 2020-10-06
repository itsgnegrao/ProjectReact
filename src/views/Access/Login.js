import React, { useState } from "react";
import "../../styles/Access/Login.css";
import { doLogin } from "../../controllers/auth";
import { validateEmail } from "../../tools/validator";
import {
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  Spinner,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";

function Login(props) {
  const [state, setState] = useState({
    email: "itsgnegrao@teste.com.br",
    password: "123mudar@",
    loading: false,
    msgModal: "",
    visibleModalLogin: false,
    showPassword: false
  });

  // Modals+Handles Login
  const modalFailedLogin = () => {
    return (
      <div>
        <Modal isOpen={state.visibleModalLogin} toggle={handleModalLoginClose}>
          <ModalHeader>Falha no Login</ModalHeader>
          <ModalBody>{state.msgModal}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleModalLoginClose}>
              OK
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  const handleModalLoginOpen = msg => {
    setState({
      ...state,
      visibleModalLogin: !state.visibleModalLogin,
      msgModal: msg
    });
  };
  const handleModalLoginClose = () => {
    setState({ ...state, visibleModalLogin: !state.visibleModalLogin });
  };

  // Handles gerais
  const handleClickLogin = async () => {
    if (state.email !== "" && state.password !== "") {
      if (!validateEmail(state.email)) {
        handleModalLoginOpen([
          "Email ",
          <b>{state.email}</b>,
          " não é um e-mail válido!",
          <br />,
          " Digite um E-mail válido para prosseguir!"
        ]);
      } else {
        setState({ ...state, loading: true });

        let resp = await doLogin(state.email, state.password);
        // console.log(resp);

        setState({ ...state, loading: false });

        if (resp.message === "erro") {
          handleModalLoginOpen(
            "Erro no efetuamento do Login, tente novamente em instantes!"
          );
        } else if (resp["message"]) {
          handleModalLoginOpen([
            "Erro no efetuamento do Login:  ",
            <b>{resp["message"]}</b>
          ]);
        } else {
          let userNew = props.user;
          userNew.token = resp["token"];
          userNew.auth = resp["auth"];
          userNew.expires = resp["expires"];
          userNew.email = state.email;
          props.onLogin(userNew);
        }
      }
    } else {
      handleModalLoginOpen("Preencha os campos necessários e tente novamente!");
    }
  };

  const handleShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleEnterPressed = e => {
    if (e.key === "Enter") {
      var bt = document.getElementById("ButtonLogin");
      bt.click();
    }
  };

  const handleChangePassword = e => {
    setState({ ...state, password: e.target.value });
  };

  const handleChangeEmail = e => {
    setState({ ...state, email: e.target.value });
  };

  return (
    <div className="Login">
      {modalFailedLogin()}

      <div className="Login-body">
        <div>
          <Label className="Login-title">Login</Label>

          <Form>
            <FormGroup>
              <Input
                className="Login-input"
                type="email"
                name="email"
                value={state.email}
                onChange={handleChangeEmail}
                id="exampleEmail"
                placeholder="Email"
              />

              <span className="Login-span1" />

              <InputGroup className="Login-input">
                <Input
                  type={state.showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="off"
                  value={state.password}
                  onChange={handleChangePassword}
                  id="examplePassword"
                  placeholder="Senha"
                  onKeyPress={handleEnterPressed}
                />

                <InputGroupAddon addonType="append">
                  <Button
                    className="Login-btPassword"
                    color="secondary"
                    onClick={handleShowPassword}
                  >
                    {state.showPassword ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </Form>

          <div>
            {state.loading ? (
              <Spinner className="Login-spinner" color="primary" />
            ) : (
              <Button
                className="Login-button"
                color="primary"
                id="ButtonLogin"
                onClick={handleClickLogin}
              >
                Entrar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

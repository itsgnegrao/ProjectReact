import React from "react";
import "../../styles/CRUDs/NewClient.css";
import { Button } from "reactstrap";

function Client(props) {
  return (
    <div className="NewClient">
      <div className="NewClient-body">
        <div>
          <Button
            className="Login-button"
            color="primary"
            onClick={() => props.setOpt("new")}
          >
            Cadastrar
          </Button>

          <span className="NewClient-span1" />

          <Button
            className="Login-button"
            color="primary"
            onClick={() => props.setOpt("search")}
          >
            Buscar
          </Button>

          <span className="NewClient-span1" />
        </div>
      </div>
    </div>
  );
}

export default Client;

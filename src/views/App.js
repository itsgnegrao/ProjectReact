import React from "react";
import Cookies from "universal-cookie";
import "../styles/App.css";
import Login from "./Access/Login";
import NewClient from "./CRUDs/Client/NewClient";
import SearchClient from "./CRUDs/Client/SearchClient";
import EditClient from "./CRUDs/Client/EditClient";
import Client from "./CRUDs/Client";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "itsgnegrao@teste.com.br",
        auth: false,
        expires: 0,
        token: ""
      },
      opt: "",
      element: null
    };

    this.cookies = new Cookies();
    if (this.cookies.get("user")) {
      this.state.user = this.cookies.get("user");
    }
  }

  onLogin = userNew => {
    this.setState({ user: userNew });
    this.cookies.set("user", userNew, {
      path: "/",
      maxAge: userNew.expires
    });
  };

  onLogout = () => {
    this.setState({
      user: { email: "", auth: false, expires: 0, token: null }
    });
    this.cookies.remove("user");
  };

  onReturn = () => {
    this.setState({ opt: "" });
  };

  onReturnSearch = (opt, element) => {
    this.setState({ opt: opt, element: element });
  };

  setOpt = newOpt => {
    this.setState({ opt: newOpt });
  };

  Opt = () => {
    if (this.state.opt === "new") {
      return <NewClient return={this.onReturn} user={this.state.user} />;
    } else if (this.state.opt === "search") {
      return (
        <SearchClient return={this.onReturnSearch} user={this.state.user} />
      );
    } else if (this.state.opt === "edit") {
      return (
        <EditClient
          return={this.onReturn}
          client={this.state.element}
          user={this.state.user}
        />
      );
    } else {
      return <Client setOpt={this.setOpt} />;
    }
  };

  render() {
    return (
      <div className="App" style={{ backgroundColor: "#F2F7F4" }}>
        {!this.state.user.auth ? (
          <Login
            user={this.state.user}
            onLogin={this.onLogin}
            onLogout={this.onLogout}
          />
        ) : (
          <div style={{ paddingTop: 0, marginTop: 0 }}>{this.Opt()}</div>
        )}
      </div>
    );
  }
}

export default App;

import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import Jogadores from './components/Jogadores';
import Partida from './components/Partida';
import Proximos from './components/Proximos';

let config = {
    qtde_jogadores_time: 1
}

window.sessionStorage.setItem("jogadores", JSON.stringify([]));
window.sessionStorage.setItem("time1", JSON.stringify([]));
window.sessionStorage.setItem("time2", JSON.stringify([]));
window.sessionStorage.setItem("proximos", JSON.stringify([]));
window.sessionStorage.setItem("config", JSON.stringify(config));

function App() {
    return (
        <Router>
            <div className="container-fluid mt-5">
                <div className="row text-center">
                    <div className="col-sm-3">
                        <Link to="/jogadores" className="btn btn-secondary">Jogadores</Link>
                    </div>

                    <div className="col-sm-3">
                        <Link to="/partida" className="btn btn-secondary">Partida</Link>
                    </div>

                    <div className="col-sm-3">
                        <Link to="/proximos" className="btn btn-secondary">Próximos</Link>
                    </div>

                    <div className="col-sm-3">
                        <button type="button" className="btn btn-secondary">Config</button>
                    </div>
                </div>

                <Switch>
                    <Route path="/jogadores">
                        <Jogadores />
                    </Route>

                    <Route path="/partida">
                        <Partida />
                    </Route>

                    <Route path="/proximos">
                        <Proximos />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;

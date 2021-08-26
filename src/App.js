import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './css/Main.module.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import Jogadores from './components/Jogadores';
import Partida from './components/Partida';
import Proximos from './components/Proximos';
import Configuracoes from './components/Configuracoes';

let config = {
    qtde_jogadores_time: 5
}

window.sessionStorage.setItem("jogadores", JSON.stringify([]));
window.sessionStorage.setItem("time1", JSON.stringify([]));
window.sessionStorage.setItem("time2", JSON.stringify([]));
window.sessionStorage.setItem("proximos", JSON.stringify([]));
window.sessionStorage.setItem("config", JSON.stringify(config));

function App() {
    return (
        <Router basename="/jogadores">
            <div id="header" className={ styles.Header }>
                <div className="container-fluid">
                    <div className="row text-center">
                        <div className="col-sm-3">
                            <Link to="/jogadores" className="btn btn-primary">Jogadores</Link>
                        </div>

                        <div className="col-sm-3">
                            <Link to="/partida" className="btn btn-primary">Partida</Link>
                        </div>

                        <div className="col-sm-3">
                            <Link to="/proximos" className="btn btn-primary">Próximos</Link>
                        </div>

                        <div className="col-sm-3">
                            <Link to="/configuracoes" className="btn btn-primary">Configurações</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt-5 mb-3">
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

                    <Route path="/configuracoes">
                        <Configuracoes />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;

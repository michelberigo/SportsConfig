import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import Jogadores from './components/Jogadores';

localStorage.setItem("jogadores", JSON.stringify([]));
localStorage.setItem("time1", []);
localStorage.setItem("time2", []);

function App() {
  return (
    <Router>
      <div>
      <nav>
          <ul>
            <li>
              <Link to="/jogadores">Jogadores</Link>
            </li>
            </ul>
            </nav>
        <Switch>
          <Route path="/jogadores">
            <Jogadores />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

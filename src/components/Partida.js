import React from 'react';
import Jogador from './Jogador';

class Partida extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jogadores: JSON.parse(window.sessionStorage.getItem('jogadores')),
            //jogadores: ['TESTE 1', 'TESTE 2', 'TESTE 3'],
            time_1: JSON.parse(window.sessionStorage.getItem('time1')),
            time_2:  JSON.parse(window.sessionStorage.getItem('time2')),
            proximos: JSON.parse(window.sessionStorage.getItem('proximos')),
            config: JSON.parse(window.sessionStorage.getItem('config'))
        };

        this.escolherTimes = this.escolherTimes.bind(this);
    }

    escolherTimes(event) {
        event.preventDefault();

        window.sessionStorage.setItem('proximos', JSON.stringify(this.state.jogadores));
        let proximos = JSON.parse(window.sessionStorage.getItem('proximos'));

        let time1 = proximos.splice(0, this.state.config.qtde_jogadores_time);
        let time2 = proximos.splice(0, this.state.config.qtde_jogadores_time);

        this.setState({ proximos: proximos, time_1: time1, time_2: time2 }, function () {
            window.sessionStorage.setItem('time1', JSON.stringify(this.state.time_1));
            window.sessionStorage.setItem('time2', JSON.stringify(this.state.time_2));
            window.sessionStorage.setItem('proximos', JSON.stringify(proximos));
        });

        console.log(window.sessionStorage);
    }

    listarJogadores(jogadores) {
        let listaJogadores = jogadores.map(function (jogador, key) {
            return <Jogador key={key} value={jogador} index={key} removerJogador={ false } />
        });

        return (<ul className="list-group">{ listaJogadores }</ul>);
    }

    render() {
        return (
            <div className="container text-center">
                <h1>Partida</h1>

                { this.state.time_1.length === 0 &&  this.state.jogadores.length > 0 &&
                    <button type="button" className="btn btn-success" onClick={ this.escolherTimes }>Começar</button>
                }

                <div className="row">
                    <div className="col-sm-6 form-group">
                        <h1>Time 1</h1>

                        { this.listarJogadores(this.state.time_1) }
                    </div>

                    <div className="col-sm-6 form-group">
                        <h1>Time 2</h1>

                        { this.listarJogadores(this.state.time_2) }
                    </div>
                </div>
            </div>
        )
    }
}

export default Partida;
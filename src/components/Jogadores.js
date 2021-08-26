import React from 'react';
import Jogador from './Jogador';
import styles from '../css/Jogadores.module.css';

class Jogadores extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jogadores: JSON.parse(window.sessionStorage.getItem('jogadores')),
            jogador_novo: '',
            time_1: JSON.parse(window.sessionStorage.getItem('time1')),
            time_2: JSON.parse(window.sessionStorage.getItem('time2')),
            proximos: JSON.parse(window.sessionStorage.getItem('proximos')),
            config: JSON.parse(window.sessionStorage.getItem('config')),
        };

        this.handleChange = this.handleChange.bind(this);
        this.listarJogadores = this.listarJogadores.bind(this);
        this.adicionarJogador = this.adicionarJogador.bind(this);
        this.sortearJogadores = this.sortearJogadores.bind(this);
        this.removerJogador = this.removerJogador.bind(this);
    }

    handleChange(event) {
        this.setState({ jogador_novo: event.target.value.toUpperCase() });
    }

    adicionarJogador(event) {
        event.preventDefault();

        this.state.jogadores.push(this.state.jogador_novo);

        if (this.state.time_1.length > 0 || this.state.time_2.length > 0 || this.state.proximos.length > 0) {
            this.state.proximos.push(this.state.jogador_novo);
        }

        this.setState({ jogadores: this.state.jogadores, jogador_novo: '', proximos: this.state.proximos, time_1: this.state.time_1, time_2: this.state.time_2 }, function () {
            window.sessionStorage.setItem('jogadores', JSON.stringify(this.state.jogadores));
            window.sessionStorage.setItem('time1', JSON.stringify(this.state.time_1));
            window.sessionStorage.setItem('time2', JSON.stringify(this.state.time_2));
            window.sessionStorage.setItem('proximos', JSON.stringify(this.state.proximos));
        });
    }

    listarJogadores() {
        let _this = this;

        let listaJogadores = this.state.jogadores.map(function (jogador, key) {
            return <Jogador key={key} value={jogador} index={key} removerJogador={ _this.removerJogador } />
        });

        return (<ul className="list-group">{ listaJogadores }</ul>);
    }

    sortearJogadores(event) {
        event.preventDefault();

        let jogadores = this.state.jogadores.sort(function() { return 0.5 - Math.random() });

        this.setState({ jogadores: jogadores }, function () {
            window.sessionStorage.setItem('jogadores', JSON.stringify(this.state.jogadores));
        });
    }

    removerJogador(index, value) {
        let jogadores = this.state.jogadores.filter((_, i) => i !== index);
        let time1 = this.state.time_1;
        let time2 = this.state.time_2;
        let proximos = this.state.proximos;

        let listaJogadores = time1.concat(time2).concat(proximos);
        let indexListaJogadoresRemover = listaJogadores.indexOf(value);

        listaJogadores = listaJogadores.filter((_, i) => i !== indexListaJogadoresRemover);

        time1 = listaJogadores.splice(0, this.state.config.qtde_jogadores_time);
        time2 = listaJogadores.splice(0, this.state.config.qtde_jogadores_time);
        proximos = listaJogadores;

        this.setState({ jogadores: jogadores, proximos: proximos, time_1: time1, time_2: time2 }, function () {
            window.sessionStorage.setItem('jogadores', JSON.stringify(this.state.jogadores));
            window.sessionStorage.setItem('time1', JSON.stringify(this.state.time_1));
            window.sessionStorage.setItem('time2', JSON.stringify(this.state.time_2));
            window.sessionStorage.setItem('proximos', JSON.stringify(proximos));
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className={ styles.AdicionarJogador + " text-center" }>
                    <h1>Adicionar Jogador</h1>

                    <hr className={ styles.Divider } />

                    <div className="row">
                        <div className="col-sm-3 form-group">
                            <input type="text" className="form-control" placeholder="Nome do Jogador" onChange={ this.handleChange } value={this.state.jogador_novo} />
                        </div>

                        <div className="col-sm-1 form-group">
                            <button type="submit" className="btn btn-success" onClick={ this.adicionarJogador }>Adicionar</button>
                        </div>
                    </div>
                </div>
                
                <hr />

                <div>
                    <div className="row text-center">
                        <div className="col-sm-12 form-group">
                            <h1>Lista</h1>

                            <button type="submit" className="btn btn-success" onClick={ this.sortearJogadores }>Sortear</button>
                        </div>
                    </div>

                    <hr className={ styles.Divider } />

                    <div className="row mt-3">
                        <div className="col-sm-4 offset-sm-4">
                            { this.listarJogadores() }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Jogadores;
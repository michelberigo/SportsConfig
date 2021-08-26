import React from 'react';
import Jogador from './Jogador';
import { Modal } from 'react-bootstrap';
import styles from '../css/Partida.module.css';

class Partida extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jogadores: JSON.parse(window.sessionStorage.getItem('jogadores')),
            time_1: JSON.parse(window.sessionStorage.getItem('time1')),
            time_2: JSON.parse(window.sessionStorage.getItem('time2')),
            proximos: JSON.parse(window.sessionStorage.getItem('proximos')),
            config: JSON.parse(window.sessionStorage.getItem('config')),
            show_modal: false,
        };

        this.escolherTimes = this.escolherTimes.bind(this);
        this.handleOpenFimPartidaModal = this.handleOpenFimPartidaModal.bind(this);
        this.handleCloseFimPartidaModal = this.handleCloseFimPartidaModal.bind(this);
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
    }

    listarJogadores(jogadores) {
        let listaJogadores = jogadores.map(function (jogador, key) {
            return <Jogador key={key} value={jogador} index={key} removerJogador={ false } />
        });

        return (<ul className="list-group">{ listaJogadores }</ul>);
    }

    handleOpenFimPartidaModal () {
        this.setState({ show_modal: true });
    }

    handleCloseFimPartidaModal () {
        this.setState({ show_modal: false });
    }
      
    finalizarPartida (time) {
        let proximos = this.state.proximos;
        let time1 = this.state.time_1;
        let time2 = this.state.time_2;

        switch (time) {
            case 1:
                this.state.time_1.forEach(function (jogador) {
                    proximos.push(jogador);
                });

                time1 = proximos.splice(0, this.state.config.qtde_jogadores_time);

                break;
            case 2:
                this.state.time_2.forEach(function (jogador) {
                    proximos.push(jogador);
                });

                time2 = proximos.splice(0, this.state.config.qtde_jogadores_time);

                break;
            default:
                break;
        }

        this.setState({ proximos: proximos, time_1: time1, time_2: time2 }, function () {
            window.sessionStorage.setItem('time1', JSON.stringify(this.state.time_1));
            window.sessionStorage.setItem('time2', JSON.stringify(this.state.time_2));
            window.sessionStorage.setItem('proximos', JSON.stringify(proximos));
        });

        this.handleCloseFimPartidaModal();
    }

    render() {
        return (
            <div className="container text-center">
                <div className={ styles.Partida }>
                    <h1>Partida</h1>

                    <hr className={ styles.Divider } />

                    { this.state.time_1.length === 0 &&  this.state.jogadores.length > 0 &&
                        <button type="button" className="btn btn-success" onClick={ this.escolherTimes }>Começar</button>
                    }

                    <div className="row">
                        <div className="col form-group">
                            <h1>Time 1</h1>

                            { this.listarJogadores(this.state.time_1) }
                        </div>

                        <div className="col form-group">
                            <h1>Time 2</h1>

                            { this.listarJogadores(this.state.time_2) }
                        </div>
                    </div>

                    <div className="mt-3">
                        { (this.state.time_1.length > 0 || this.state.time_2.length > 0) &&
                            <button type="button" className="btn btn-danger" onClick={ this.handleOpenFimPartidaModal }>Finalizar Partida</button>
                        }
                    </div>
                </div>
                

                <Modal centered show={ this.state.show_modal } onHide={ this.handleCloseFimPartidaModal }>
                    <Modal.Header closeButton>
                        <Modal.Title>Quem sai?</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="row text-center">
                            <div className="col form-group">
                                <button type="button" className="btn btn-primary" onClick={ () => this.finalizarPartida(1) }>Time 1</button>
                            </div>

                            <div className="col form-group">
                                <button type="button" className="btn btn-primary" onClick={ () => this.finalizarPartida(2) }>Time 2</button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default Partida;
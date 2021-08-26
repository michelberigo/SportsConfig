import React from 'react';
import Jogador from './Jogador';

class Jogadores extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jogadores: JSON.parse(window.sessionStorage.getItem('jogadores')),
            jogador_novo: ''
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
        this.setState({ jogadores: this.state.jogadores });

        window.sessionStorage.setItem('jogadores', JSON.stringify(this.state.jogadores));

        this.setState({ jogador_novo: '' });
        
        alert('Jogador adicionado!');
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

        this.setState({ jogadores: this.state.jogadores.sort(function() { return 0.5 - Math.random() }) });

        window.sessionStorage.setItem('jogadores', JSON.stringify(this.state.jogadores));
    }

    removerJogador(index) {
        let jogadores = this.state.jogadores.filter((_, i) => i !== index);
        this.setState({ jogadores: jogadores });

        window.sessionStorage.setItem('jogadores', JSON.stringify(this.state.jogadores));
    }

    render() {
        return (
            <div className="container-fluid text-center">
                <hr />

                <h3>Adicionar Jogador</h3>

                <div className="row">
                    <div className="col-sm-3 form-group">
                        <input type="text" className="form-control" placeholder="Nome do Jogador" onChange={ this.handleChange } value={this.state.jogador_novo} />
                    </div>

                    <div className="col-sm-1 form-group">
                        <button type="submit" className="btn btn-success" onClick={ this.adicionarJogador }>Adicionar</button>
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col-sm-12 form-group">
                        <h1>Lista</h1>

                        <button type="submit" className="btn btn-success" onClick={ this.sortearJogadores }>Sortear</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        { this.listarJogadores() }
                    </div>
                </div>
            </div>
        )
    }
}

export default Jogadores;
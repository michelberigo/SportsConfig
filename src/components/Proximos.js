import React from 'react';
import Jogador from './Jogador';

class Proximos extends React.Component {
    constructor(props) {
        super(props);

        console.log(window.sessionStorage);

        this.state = {
            proximos: JSON.parse(window.sessionStorage.getItem('proximos')),
        };

        console.log(this.state);

        this.listarJogadores = this.listarJogadores.bind(this);
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
                <h1>Próximos</h1>

                <div className="row">
                    <div className="col-sm-12">
                        { this.listarJogadores(this.state.proximos) }
                    </div>
                </div>
            </div>
        )
    }
}

export default Proximos;
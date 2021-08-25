import React from 'react';

class Jogador extends React.Component {
    render() {
        return(
            <li className="list-group-item">
                { this.props.value }

                <span><button type="button" className="btn btn-danger" onClick={ () => this.props.removerJogador(this.props.index) }>Remover</button></span>
            </li>
        )
    }
}

export default Jogador;
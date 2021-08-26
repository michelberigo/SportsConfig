import React from 'react';

class Jogador extends React.Component {
    render() {
        return(
            <li className="list-group-item d-flex justify-content-between align-items-center">
                { this.props.value }

                { this.props.removerJogador &&
                    <span><button type="button" className="btn btn-danger" onClick={ () => this.props.removerJogador(this.props.index, this.props.value) }>Remover</button></span>
                }
            </li>
        )
    }
}

export default Jogador;
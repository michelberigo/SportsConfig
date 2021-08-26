import React from 'react';

class Configuracoes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            config: JSON.parse(window.sessionStorage.getItem('config')),
            time_1: JSON.parse(window.sessionStorage.getItem('time1')),
            time_2: JSON.parse(window.sessionStorage.getItem('time2')),
            proximos: JSON.parse(window.sessionStorage.getItem('proximos')),
        };

        this.handleChange = this.handleChange.bind(this);
        this.salvarConfiguracoes = this.salvarConfiguracoes.bind(this);
    }

    handleChange(event) {
        this.setState({
            config: {
                qtde_jogadores_time: event.target.value
            }
        });
    }

    salvarConfiguracoes(event) {
        event.preventDefault();

        this.setState({ config: { qtde_jogadores_time: this.state.config.qtde_jogadores_time } }, function () {
            window.sessionStorage.setItem('config', JSON.stringify(this.state.config));
            window.sessionStorage.setItem('time1', JSON.stringify([]));
            window.sessionStorage.setItem('time2', JSON.stringify([]));
            window.sessionStorage.setItem('proximos', JSON.stringify([]));
        });
    }

    render() {
        return (
            <div className="container-fluid text-center">
                <hr />

                <h1>Configurações</h1>

                <form>
                    <div className="row">
                        <div className="col-sm-3 form-group">
                            <label>Quantidade Jogadores por Time</label>
                            <input type="text" className="form-control" placeholder="Quantidade Jogadores por Time" onChange={ this.handleChange } value={this.state.config.qtde_jogadores_time} />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div>
                            <button type="button" className="btn btn-success" onClick={ this.salvarConfiguracoes }>Salvar</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Configuracoes;
import React from "react";
import './index.css';

class InversoresComponent extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            inversor: 'Inversor',
            tempMaxima: 70,
            tempMinima: 0,
            inversores: [],
        };
        this.handleChangeInversor = this.handleChangeInversor.bind(this);
        this.handleChangeTempMaxima = this.handleChangeTempMaxima.bind(this);
        this.handleChangeTempMinima = this.handleChangeTempMinima.bind(this);

    }

    handleChangeTempMaxima(event){
        this.setState({tempMaxima: event.target.value});
    }

    handleChangeTempMinima(event){
        this.setState({tempMinima: event.target.value});
    }

    handleChangeInversor(event){
        this.setState({inversor: event.target.value});
    }


    componentDidMount(){
        fetch('./DadosInversores.json',{
            headers: {
                Accept: "application/json"
            }
        }).then(res => res.json())
        .then(res => this.setState({inversores: res.DadosInversores}))
    }

    render(){

        var ModeloInversor = this.state.inversor;

        var FiltroModeloInversor = this.state.inversores.map(valor => valor.MODELO);
        var FiltrarModeloUnico = FiltroModeloInversor.filter((este, i) => FiltroModeloInversor.indexOf(este) === i);
        const exibirModeloInversor = FiltrarModeloUnico.map((Modelo) =>
            <option value={Modelo}>{Modelo}</option>
        );

        var buscadorInversorEscolhido = function (Buscador){
            if(Buscador.MODELO === ModeloInversor){
                return Buscador;
            }
        }

        var CriarFiltroValorsInversores = this.state.inversores.filter(buscadorInversorEscolhido);   
        
        var PotenciaSelecionadaInversor = CriarFiltroValorsInversores.map(v => v.Potencia);
        var TensaoEntradaMaximaInversor = CriarFiltroValorsInversores.map(v => v.TensaoEntradaMaxima);
        var TensaoStringMinimaInvesor = CriarFiltroValorsInversores.map(v => v.TensaoStringMinima);
        var TensaoStringMaximaInversor = CriarFiltroValorsInversores.map(v => v.TensaoStringMaxima);
        var TesaoMinimaFuncionamentoInversor = CriarFiltroValorsInversores.map(v => v.TesaoMinimaFuncionamento);
        var NumeroMPPTsInversor = CriarFiltroValorsInversores.map(v => v.NumeroMPPTs);

        localStorage.setItem('PotenciaSelecionadaInversor', PotenciaSelecionadaInversor);
        localStorage.setItem('TensaoEntradaMaximaInversor', TensaoEntradaMaximaInversor);
        localStorage.setItem('TensaoStringMinimaInvesor', TensaoStringMinimaInvesor);
        localStorage.setItem('TensaoStringMaximaInversor', TensaoStringMaximaInversor);
        localStorage.setItem('TesaoMinimaFuncionamentoInversor', TesaoMinimaFuncionamentoInversor);
        localStorage.setItem('NumeroMPPTsInversor', NumeroMPPTsInversor);
        localStorage.setItem('TemperaturaMaxima', this.state.tempMaxima);
        localStorage.setItem('TemperaturaMinima', this.state.tempMinima);

          
        return(
            <div>
                <h2> Seleção do Inversor</h2>
                <div>
                    <table>
                        <tr>
                            <td>
                                Inversor da Instalação
                            </td>
                            <td>
                                Temperatura Maxima
                            </td>
                            <td>
                                Temperatura Minima
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <select value={this.state.inversor} onChange={this.handleChangeInversor}>
                                        <option value='Inversor'>Inversor</option>
                                        {exibirModeloInversor}
                                </select>
                            </td>
                            <td>
                                <input value={this.state.tempMaxima} onChange={this.handleChangeTempMaxima}></input>
                            </td>
                            <td>
                                <input value={this.state.tempMinima} onChange={this.handleChangeTempMinima}></input>
                            </td>
                        </tr>
                    </table>

                    <h2>Retorno de Valores Inversores: </h2>
                    <table border="2">
                        <tr>
                            <td>Potencia do Inversor em kW</td>
                            <td>Tensão Maxima do Inversor</td>
                            <td>Tensão Minima do Inversor</td>
                            <td>Tensão Maxima de Funcionamento Padrão</td>
                            <td>Tensão Minima Para Funcionamento</td>
                            <td>Número de MPPTs</td>
                        </tr>
                        <tr>
                            <td>{CriarFiltroValorsInversores.map(v => v.Potencia)}</td>
                            <td>{CriarFiltroValorsInversores.map(v => v.TensaoEntradaMaxima)}</td>
                            <td>{CriarFiltroValorsInversores.map(v => v.TensaoStringMinima)}</td>
                            <td>{CriarFiltroValorsInversores.map(v => v.TensaoStringMaxima)}</td>
                            <td>{CriarFiltroValorsInversores.map(v => v.TesaoMinimaFuncionamento)}</td>
                            <td>{CriarFiltroValorsInversores.map(v => v.NumeroMPPTs)}</td>
                        </tr>
                    </table>

                </div>
            </div>
                
        );
    }
}
export default InversoresComponent;

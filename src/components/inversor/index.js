import React from "react";
import './index.css';

class InversoresComponent extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            inversor: 'Inversor',
            inversores: [],
        };
        this.handleChangeInversor = this.handleChangeInversor.bind(this);
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
          
        return(
            <div>
                <h2> Teste de Aplicação Inversores.</h2>
                <div>
                    <table>
                        <tr>
                            <td>
                                <select value={this.state.inversor} onChange={this.handleChangeInversor}>
                                    <option value='Inversor'>Inversor</option>
                                    {exibirModeloInversor}
                            </select>
                            </td>
                            <td>
                                <p>{console.log(this.state.inversor)}</p>
                                <p>{console.log(CriarFiltroValorsInversores)}</p>
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

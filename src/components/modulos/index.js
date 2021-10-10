import React from "react";
import './index.css';

class ModulosComponent extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            fabricante: 'Fabricante',
            modelo: 'Modelo',
            potencia: 'Potencia',
            modulos: [],
            moduloSelcionado: [],
        };
        this.handleChangeFabricante = this.handleChangeFabricante.bind(this);
        this.handleChangeModelo = this.handleChangeModelo.bind(this);
        this.handleChangePotencia = this.handleChangePotencia.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChangePotencia(event){
        this.setState({potencia: event.target.value});
    }

    handleChangeFabricante(event){
        this.setState({fabricante: event.target.value});
    }

    handleChangeModelo(event){
        this.setState({modelo: event.target.value});
    }

    handleSubmit(event) {
        event.prevent()
        this.setState({moduloSelcionado: event.target.value});
    }


    componentDidMount(){
        fetch('./DadosModulos.json',{
            headers: {
                Accept: "application/json"
            }
        }).then(res => res.json())
        .then(res => this.setState({modulos: res.DadosModulos}))
    }

    render(){
        //var valorModulos = this.state.modulos;
        var valorFabricante = this.state.fabricante;
        var valorModelo = this.state.modelo;
        var ValorPotencia = this.state.potencia;

        const TodosFabricantes = this.state.modulos.map(v => v.Fabricante);
        const Fabricantes = TodosFabricantes.filter((este, i) => TodosFabricantes.indexOf(este) === i);
        const exibirFabricantes = Fabricantes.map((fabricante) =>
            <option value={fabricante}>{fabricante}</option>
        );

        function BuscarFabricantesModulos(Valor){
            if (Valor.Fabricante === valorFabricante){
                return Valor;
            }
        }
        function BuscarFabricantesModeloModulos(Valor){
            if (Valor.Fabricante === valorFabricante && Valor.Modelo === valorModelo){
                return Valor;
            }
        }

        var ApareceCampoPotencia = '';
        var ApareceCampoModelo = '';
        if(this.state.fabricante !== 'Fabricante' && this.state.fabricante !== undefined){
            var FiltroModulos = this.state.modulos.filter(BuscarFabricantesModulos);
            var FiltroModuloModelo = FiltroModulos.map(v => v.Modelo);
            const exibirModelo = FiltroModuloModelo.filter((este, i) => FiltroModuloModelo.indexOf(este) === i);
            const exibirModeloFabricante = exibirModelo.map((modeloModulos) => 
                <option value={modeloModulos}>{modeloModulos}</option>
            );
            ApareceCampoModelo = exibirModeloFabricante;
            
            var criarFiltroModulos = this.state.modulos.filter(BuscarFabricantesModeloModulos);
            var FiltroPotencia = criarFiltroModulos.map(v => v.Potencia);
            const ExibePotenciaModulos = FiltroPotencia.filter((este, i) => FiltroPotencia.indexOf(este) === i);
            const ExibePotenciaFabricante = ExibePotenciaModulos.map((PotenciaModulos) => 
                <option value={PotenciaModulos}>{PotenciaModulos}</option>
            );

            ApareceCampoPotencia = ExibePotenciaFabricante;

        } else{
            ApareceCampoModelo = '';
            ApareceCampoPotencia = '';
        }

        var buscarDados = function (ModelosModulos){
            if(ModelosModulos.Fabricante === valorFabricante && ModelosModulos.Modelo === valorModelo && ModelosModulos.Potencia === ValorPotencia){
                return ModelosModulos;
            }
        }
        
        var criarFiltoValores = this.state.modulos.filter(buscarDados);                
        return(
            <div>
                <div>
                    <table>
                        <tr>
                            <td>
                        <select value={this.state.fabricante} onChange={this.handleChangeFabricante}>
                            <option value='Fabricante'>Fabricante</option>
                            {exibirFabricantes}
                        </select>
                        </td>
                        <td>
                        <select value={this.state.modelo} onChange={this.handleChangeModelo}>
                                <option value='Modelo'>Modelo</option>
                                {ApareceCampoModelo}
                        </select>
                        </td>
                        <td>
                        <select value={this.state.potencia} onChange={this.handleChangePotencia}>
                                <option value='Potencia'>Potencia</option>
                                {ApareceCampoPotencia}
                        </select>
                        </td>
                        
                    </tr>
                </table>
                </div>
                <div>
                    <h2>Retorno de Valores: </h2>
                    <table border="2">
                        <tr>
                            <td>Vmpp</td>
                            <td>βvmpp</td>
                            <td>Voc</td>
                            <td>βvoc</td>
                        </tr>
                        <tr>
                            <td>{criarFiltoValores.map(v => v.Vmpp)}</td>
                            <td>{criarFiltoValores.map(v => v.βvmpp)}</td>
                            <td>{criarFiltoValores.map(v => v.Voc)}</td>
                            <td>{criarFiltoValores.map(v => v.βvoc)}</td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}
export default ModulosComponent;

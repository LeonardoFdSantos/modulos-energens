import React from "react";
import './index.css';

class CalculosComponent extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            dados: {
                PotenciaSelecionadaModulo: null,
                VmppModulosSelcionado: null,
                βvmppModulosSelcionado: null,
                VocModulosSelcionado: null,
                βvocModulosSelcionado: null,
                PotenciaSelecionadaInversor: null,
                TensaoEntradaMaximaInversor: null,
                TensaoStringMinimaInvesor: null,
                TensaoStringMaximaInversor: null,
                TesaoMinimaFuncionamentoInversor: null,
                NumeroMPPTsInversor: null,
                TemperaturaMaxima: null,
                TemperaturaMinima: null,
            },
        };
    }

    componentWillMount(){
            var VmppModulosSelcionado = localStorage.getItem('VmppModulosSelcionado');
            var βvmppModulosSelcionado = localStorage.getItem('βvmppModulosSelcionado');
            var VocModulosSelcionado = localStorage.getItem('VocModulosSelcionado');
            var βvocModulosSelcionado = localStorage.getItem('βvocModulosSelcionado');
            var PotenciaSelecionadaInversor = localStorage.getItem('PotenciaSelecionadaInversor');
            var TensaoEntradaMaximaInversor = localStorage.getItem('TensaoEntradaMaximaInversor');
            var TensaoStringMinimaInvesor = localStorage.getItem('TensaoStringMinimaInvesor');
            var TensaoStringMaximaInversor = localStorage.getItem('TensaoStringMaximaInversor');
            var TesaoMinimaFuncionamentoInversor = localStorage.getItem('TesaoMinimaFuncionamentoInversor');
            var NumeroMPPTsInversor = localStorage.getItem('NumeroMPPTsInversor');
            var TemperaturaMaxima = localStorage.getItem('TemperaturaMaxima');
            var TemperaturaMinima = localStorage.getItem('TemperaturaMinima');
            var PotenciaSelecionadaModulo = localStorage.getItem('PotenciaModuloSelecionado');

            this.setState({ dados: {
                PotenciaSelecionadaModulo: PotenciaSelecionadaModulo,
                VmppModulosSelcionado: VmppModulosSelcionado,
                βvmppModulosSelcionado: βvmppModulosSelcionado,
                VocModulosSelcionado: VocModulosSelcionado,
                βvocModulosSelcionado: βvocModulosSelcionado,
                PotenciaSelecionadaInversor: PotenciaSelecionadaInversor,
                TensaoEntradaMaximaInversor: TensaoEntradaMaximaInversor,
                TensaoStringMinimaInvesor: TensaoStringMinimaInvesor,
                TensaoStringMaximaInversor: TensaoStringMaximaInversor,
                TesaoMinimaFuncionamentoInversor: TesaoMinimaFuncionamentoInversor,
                NumeroMPPTsInversor: NumeroMPPTsInversor,
                TemperaturaMaxima: TemperaturaMaxima,
                TemperaturaMinima: TemperaturaMinima
            }});
    }

    render(){
        var { VmppModulosSelcionado, βvmppModulosSelcionado, VocModulosSelcionado, βvocModulosSelcionado, PotenciaSelecionadaInversor, TensaoEntradaMaximaInversor,
            TensaoStringMinimaInvesor, TensaoStringMaximaInversor, TemperaturaMaxima, TemperaturaMinima, NumeroMPPTsInversor, PotenciaSelecionadaModulo
        } = this.state.dados;
        var QuantidadeMaximaModulos = (TensaoStringMaximaInversor/(VocModulosSelcionado * (1-βvocModulosSelcionado * (25-TemperaturaMinima))));
        var QuantidadeMinimaModulos = (TensaoStringMinimaInvesor/(VmppModulosSelcionado*(1-βvmppModulosSelcionado*(25-TemperaturaMaxima))));
        
        var QuantidadeMaximaInteirosModulos = Math.trunc(QuantidadeMaximaModulos);
        var QuantidadeMinimaInteirosModulos = Math.trunc(QuantidadeMinimaModulos);
        
        var QuantidadeMaximaModulosTensaoMinima = (QuantidadeMaximaInteirosModulos*(VmppModulosSelcionado *(1-βvmppModulosSelcionado*(25-TemperaturaMaxima)))).toFixed(4);
        var QuantidadeMaximaModulosTensaoMaxima = (QuantidadeMaximaInteirosModulos*(VocModulosSelcionado *(1-βvocModulosSelcionado*(25-TemperaturaMinima)))).toFixed(4);
        var QuantidadeMinimaModulosTensaoMinima = (QuantidadeMinimaInteirosModulos*(VmppModulosSelcionado *(1-βvmppModulosSelcionado*(25-TemperaturaMaxima)))).toFixed(4);
        var QuantidadeMinimaModulosTensaoMaxima = (QuantidadeMinimaInteirosModulos*(VocModulosSelcionado *(1-βvocModulosSelcionado*(25-TemperaturaMinima)))).toFixed(4);

        var QuantidadeMaximaPermitida = (TensaoEntradaMaximaInversor/(VocModulosSelcionado * (1-βvocModulosSelcionado * (25-TemperaturaMinima))));
        var QuantidadeInteiraMaximaPermitida = Math.trunc(QuantidadeMaximaPermitida);
        var QuantidadeMaximaPermitidaTensaoMinima = (QuantidadeInteiraMaximaPermitida*(VmppModulosSelcionado *(1-βvmppModulosSelcionado*(25-TemperaturaMaxima)))).toFixed(4);
        var QuantidadeMaximaPermitidaTensaoMaxima = (QuantidadeInteiraMaximaPermitida*(VocModulosSelcionado *(1-βvocModulosSelcionado*(25-TemperaturaMinima)))).toFixed(4);

        var QuantidadeModulosMaximoMPPTs = QuantidadeMaximaInteirosModulos*NumeroMPPTsInversor;
        var QuantidadeAcoselhavelMaximoMPPTS = (QuantidadeModulosMaximoMPPTs*PotenciaSelecionadaModulo/1000).toFixed(4);

        var QuantidadeModulosPelaPotencia = ((PotenciaSelecionadaInversor*(1.5)*1000)/(PotenciaSelecionadaModulo));
        var PotenciaMaximaInstalada = ((QuantidadeModulosPelaPotencia*PotenciaSelecionadaModulo)/1000).toFixed(4);

        
        return(
            <div>
                <h2> Seleção de Calculo</h2>
                <div>
                    <table border='4'>
                        <tr >
                            <td className='xl65' ></td>
                            <td className='xl65' >Quantidade de Modulos</td>
                            <td className='xl65' >Quantidade de Modulos Inteiros</td>
                            <td className='xl65' >Tensão Volts</td>
                            <td className='xl65' ></td>
                        </tr>
                        <tr >
                            <td className='xl66' rowspan="2">Quantidade Maxima Módulos</td>
                            <td className='xl67' >{QuantidadeMaximaModulos}</td>
                            <td className='xl65' >{QuantidadeMaximaInteirosModulos}</td>
                            <td className='xl65' >{QuantidadeMaximaModulosTensaoMinima}</td>
                            <td className='xl65' >Tensão Minima MPPT</td>
                        </tr>
                        <tr >
                            <td className='xl67' >{QuantidadeMaximaModulos}</td>
                            <td className='xl65' >{QuantidadeMaximaInteirosModulos}</td>
                            <td className='xl65' >{QuantidadeMaximaModulosTensaoMaxima}</td>
                            <td className='xl65' >Tensão Maxima MPPT</td>
                        </tr>
                        <tr>
                            <td className='xl66' rowspan="2">Quantidade Minima Módulos</td>
                            <td className='xl67' >{QuantidadeMinimaModulos}</td>
                            <td className='xl65' >{QuantidadeMinimaInteirosModulos}</td>
                            <td className='xl65' >{QuantidadeMinimaModulosTensaoMinima}</td>
                            <td className='xl65' >Tensão Minima MPPT</td>
                        </tr>
                        <tr>
                            <td className='xl67' >{QuantidadeMinimaModulos}</td>
                            <td className='xl65' >{QuantidadeMinimaInteirosModulos}</td>
                            <td className='xl65' >{QuantidadeMinimaModulosTensaoMaxima}</td>
                            <td className='xl65' >Tensão Maxima MPPT</td>
                        </tr>
                        <tr>
                            <td className='xl66' rowspan='2'>Quantidade Maxima Módulos pela Tensao Maxima</td>
                            <td className='xl67' rowSpan='2'>{QuantidadeMaximaPermitida}</td>
                            <td className='xl65' rowSpan='2'>{QuantidadeInteiraMaximaPermitida}</td>
                            <td className='xl65' >{QuantidadeMaximaPermitidaTensaoMinima}</td>
                            <td className='xl65' >Tensão Minima MPPT</td>
                        </tr>
                        <tr>
                            <td className='xl65' >{QuantidadeMaximaPermitidaTensaoMaxima}</td>
                            <td className='xl65' >Tensão Maxima MPPT</td>
                        </tr>
                    </table>
                </div>
                <div><h1></h1></div>
                <div>
                    <table border='2'>
                        <tr>
                            <td></td>
                            <td>Quantidade de Modulos Inteiros</td>
                            <td>Potência</td>
                        </tr>
                        <tr>
                            <td>Quantidade de módulos Inversor MPPT</td>
                            <td>{QuantidadeModulosMaximoMPPTs}</td>
                            <td>{QuantidadeAcoselhavelMaximoMPPTS}</td>
                        </tr>
                        <tr>
                            <td>Quantidade de módulos Inversor Carga</td>
                            <td>{QuantidadeModulosPelaPotencia}</td>
                            <td>{PotenciaMaximaInstalada}</td>
                        </tr>
                    </table>
                </div>
            </div>
                
        );
    }
}
export default CalculosComponent;


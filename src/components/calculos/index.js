import React from "react";
import './index.css';

import { TableContainer } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

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
                TensaoMinimaFuncionamentoInversor: null,
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
            var TensaoMinimaFuncionamentoInversor = localStorage.getItem('TensaoMinimaFuncionamentoInversor');
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
                TensaoMinimaFuncionamentoInversor: TensaoMinimaFuncionamentoInversor,
                NumeroMPPTsInversor: NumeroMPPTsInversor,
                TemperaturaMaxima: TemperaturaMaxima,
                TemperaturaMinima: TemperaturaMinima
            }});
    }

    render(){
        var { VmppModulosSelcionado, βvmppModulosSelcionado, VocModulosSelcionado, βvocModulosSelcionado, PotenciaSelecionadaInversor, TensaoEntradaMaximaInversor,
            TensaoStringMinimaInvesor, TensaoStringMaximaInversor, TemperaturaMaxima, TemperaturaMinima, NumeroMPPTsInversor, PotenciaSelecionadaModulo
        } = this.state.dados;
        var QuantidadeMaximaModulos = (TensaoStringMaximaInversor/(VocModulosSelcionado * (1-βvocModulosSelcionado * (25-TemperaturaMinima)))).toFixed(4);
        var QuantidadeMinimaModulos = (TensaoStringMinimaInvesor/(VmppModulosSelcionado*(1-βvmppModulosSelcionado*(25-TemperaturaMaxima)))).toFixed(4);
        
        var QuantidadeMaximaInteirosModulos = Math.trunc(QuantidadeMaximaModulos);
        var QuantidadeMinimaInteirosModulos = Math.trunc(QuantidadeMinimaModulos);
        
        var QuantidadeMaximaModulosTensaoMinima = (QuantidadeMaximaInteirosModulos*(VmppModulosSelcionado *(1-βvmppModulosSelcionado*(25-TemperaturaMaxima)))).toFixed(4);
        var QuantidadeMaximaModulosTensaoMaxima = (QuantidadeMaximaInteirosModulos*(VocModulosSelcionado *(1-βvocModulosSelcionado*(25-TemperaturaMinima)))).toFixed(4);
        var QuantidadeMinimaModulosTensaoMinima = (QuantidadeMinimaInteirosModulos*(VmppModulosSelcionado *(1-βvmppModulosSelcionado*(25-TemperaturaMaxima)))).toFixed(4);
        var QuantidadeMinimaModulosTensaoMaxima = (QuantidadeMinimaInteirosModulos*(VocModulosSelcionado *(1-βvocModulosSelcionado*(25-TemperaturaMinima)))).toFixed(4);

        var QuantidadeMaximaPermitida = (TensaoEntradaMaximaInversor/(VocModulosSelcionado * (1-βvocModulosSelcionado * (25-TemperaturaMinima)))).toFixed(4);
        var QuantidadeInteiraMaximaPermitida = Math.trunc(QuantidadeMaximaPermitida);
        var QuantidadeMaximaPermitidaTensaoMinima = (QuantidadeInteiraMaximaPermitida*(VmppModulosSelcionado *(1-βvmppModulosSelcionado*(25-TemperaturaMaxima)))).toFixed(4);
        var QuantidadeMaximaPermitidaTensaoMaxima = (QuantidadeInteiraMaximaPermitida*(VocModulosSelcionado *(1-βvocModulosSelcionado*(25-TemperaturaMinima)))).toFixed(4);

        var QuantidadeModulosMaximoMPPTs = (QuantidadeMaximaInteirosModulos*NumeroMPPTsInversor);
        var QuantidadeAcoselhavelMaximoMPPTS = (QuantidadeModulosMaximoMPPTs*PotenciaSelecionadaModulo/1000).toFixed(4);

        var QuantidadeModulosPelaPotencia = ((PotenciaSelecionadaInversor*(1.5)*1000)/(PotenciaSelecionadaModulo));
        var PotenciaMaximaInstalada = ((QuantidadeModulosPelaPotencia*PotenciaSelecionadaModulo)/1000).toFixed(4);

        
        return(
            <div>
                <h2> Seleção de Calculo</h2>
                <div>

                    <TableContainer component={Paper} >
                            <Table sx={{ minWidth: 300 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell></StyledTableCell>
                                        <StyledTableCell align='center'>Quantidade de Modulos</StyledTableCell>
                                        <StyledTableCell align='center'>Quantidade de Modulos Inteiros</StyledTableCell>
                                        <StyledTableCell align='center'>Tensão Volts</StyledTableCell>
                                        <StyledTableCell align='center'></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <StyledTableRow>
                                        <StyledTableCell component="th" scope="row" rowspan='2'>Quantidade Maxima Módulos</StyledTableCell>
                                        <StyledTableCell align='center' component="th" scope="row">{QuantidadeMaximaModulos}</StyledTableCell>
                                        <StyledTableCell align='center' component="th" scope="row">{QuantidadeMaximaInteirosModulos}</StyledTableCell>
                                        <StyledTableCell align='center' component="th" scope="row">{QuantidadeMaximaModulosTensaoMinima}</StyledTableCell>
                                        <StyledTableCell align='center' component="th" scope="row">Tensão Minima MPPT</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell align='center' component="th" scope="row">{QuantidadeMaximaModulos}</StyledTableCell>
                                        <StyledTableCell align='center' component="th" scope="row">{QuantidadeMaximaInteirosModulos}</StyledTableCell>
                                        <StyledTableCell align='center' component="th" scope="row">{QuantidadeMaximaModulosTensaoMaxima}</StyledTableCell>
                                        <StyledTableCell align='center' component="th" scope="row">Tensão Maxima MPPT</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell component="th" scope="row" rowspan='2'>Quantidade Minima Módulos</StyledTableCell>
                                        <StyledTableCell align='center' component="th" scope="row">{QuantidadeMinimaModulos}</StyledTableCell>
                                        <StyledTableCell align='center' component="th" scope="row">{QuantidadeMinimaInteirosModulos}</StyledTableCell>
                                        <StyledTableCell align='center' component="th" scope="row">{QuantidadeMinimaModulosTensaoMinima}</StyledTableCell>
                                        <StyledTableCell align='center' component="th" scope="row">Tensão Minima MPPT</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell align='center' component="th" scope="row">{QuantidadeMinimaModulos}</StyledTableCell>
                                        <StyledTableCell align='center' component="th" scope="row">{QuantidadeMinimaInteirosModulos}</StyledTableCell>
                                        <StyledTableCell align='center' component="th" scope="row">{QuantidadeMinimaModulosTensaoMaxima}</StyledTableCell>
                                        <StyledTableCell align='center' component="th" scope="row">Tensão Maxima MPPT</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell component="th" scope="row" rowspan='2'>Quantidade Maxima Módulos pela Tensao Maxima</StyledTableCell>
                                        <StyledTableCell align='center' component="th" scope="row" rowspan='2'>{QuantidadeMaximaPermitida}</StyledTableCell>
                                        <StyledTableCell align='center' component="th" scope="row" rowspan='2'>{QuantidadeInteiraMaximaPermitida}</StyledTableCell>
                                        <StyledTableCell align='center' component="th" scope="row">{QuantidadeMaximaPermitidaTensaoMinima}</StyledTableCell>
                                        <StyledTableCell align='center' component="th" scope="row">Tensão Minima MPPT</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell align='center' component="th" scope="row">{QuantidadeMaximaPermitidaTensaoMaxima}</StyledTableCell>
                                        <StyledTableCell align='center' component="th" scope="row">Tensão Maxima MPPT</StyledTableCell>
                                    </StyledTableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                </div>
                <div><h3>Dados Inversores para Projeto</h3></div>
                <div>

                <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                        <Table sx={{ minWidth: 26 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell></StyledTableCell>
                                    <StyledTableCell align='center'>Quantidade de Modulos Inteiros</StyledTableCell>
                                    <StyledTableCell align='center'>Potência</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">Quantidade de módulos Inversor MPPT</StyledTableCell>
                                    <StyledTableCell align='center' component="th" scope="row">{QuantidadeModulosMaximoMPPTs}</StyledTableCell>
                                    <StyledTableCell align='center' component="th" scope="row">{QuantidadeAcoselhavelMaximoMPPTS}</StyledTableCell>        
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">Quantidade de módulos Inversor Carga</StyledTableCell>
                                    <StyledTableCell align='center' component="th" scope="row">{QuantidadeModulosPelaPotencia}</StyledTableCell>
                                    <StyledTableCell align='center' component="th" scope="row">{PotenciaMaximaInstalada}</StyledTableCell>        
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
                
        );
    }
}
export default CalculosComponent;


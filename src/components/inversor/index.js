import React from "react";
import axios from 'axios';
import './index.css';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TableContainer } from "@mui/material";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import TextField from '@mui/material/TextField';

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
        axios.get('https://api-energens-backend.herokuapp.com/inversores', { crossDomain: true })
        .then(res => this.setState({inversores: res.data}))    
    }

    render(){
        var ModeloInversor = this.state.inversor;
        var FiltroModeloInversor = this.state.inversores.map(valor => valor.Modelo);
        var FiltrarModeloUnico = FiltroModeloInversor.filter((este, i) => FiltroModeloInversor.indexOf(este) === i);
        
        const exibirModeloInversor = FiltrarModeloUnico.map((Modelo) =>
            <MenuItem value={Modelo}>{Modelo}</MenuItem>
        );

        var buscadorInversorEscolhido = function (Buscador){
            if(Buscador.Modelo === ModeloInversor){
                return Buscador;
            }
        }

        var CriarFiltroValorsInversores = this.state.inversores.filter(buscadorInversorEscolhido);  
        
        var PotenciaSelecionadaInversor = CriarFiltroValorsInversores.map(v => v.Potencia);
        var TensaoEntradaMaximaInversor = CriarFiltroValorsInversores.map(v => v.TensaoEntradaMaxima);
        var TensaoStringMinimaInvesor = CriarFiltroValorsInversores.map(v => v.TensaoStringMinima);
        var TensaoStringMaximaInversor = CriarFiltroValorsInversores.map(v => v.TensaoStringMaxima);
        var TensaoMinimaFuncionamento = CriarFiltroValorsInversores.map(v => v.TensaoMinimaFuncionamento);
        var NumeroMPPTsInversor = CriarFiltroValorsInversores.map(v => v.NumeroMPPTs);

        localStorage.setItem('PotenciaSelecionadaInversor', PotenciaSelecionadaInversor);
        localStorage.setItem('TensaoEntradaMaximaInversor', TensaoEntradaMaximaInversor);
        localStorage.setItem('TensaoStringMinimaInvesor', TensaoStringMinimaInvesor);
        localStorage.setItem('TensaoStringMaximaInversor', TensaoStringMaximaInversor);
        localStorage.setItem('TensaoMinimaFuncionamento', TensaoMinimaFuncionamento);
        localStorage.setItem('NumeroMPPTsInversor', NumeroMPPTsInversor);
        localStorage.setItem('TemperaturaMaxima', this.state.tempMaxima);
        localStorage.setItem('TemperaturaMinima', this.state.tempMinima);



          
        return(
            <div>
                <h2> Seleção do Inversor</h2>
                <div>

                    <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                        <Table sx={{ minWidth: 50 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Inversor da Instalação</StyledTableCell>
                                    <StyledTableCell align='center'>Temperatura Maxima</StyledTableCell>
                                    <StyledTableCell align='center'>Temperatura Minima</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableCell component="th" scope="row">
                                    <FormControl sx={{ m: 1, minWidth: 20}}>
                                        <InputLabel id="demo-simple-select-helper-label">Inversor</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={this.state.inversor}
                                            label="Inversor"
                                            onChange={this.handleChangeInversor}
                                            >
                                        <MenuItem value="">
                                        </MenuItem>
                                            <MenuItem value='Inversor'>Inversor</MenuItem>
                                            {exibirModeloInversor}
                                        </Select>
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    <TextField
                                        id="outlined-number"
                                        value={this.state.tempMaxima}
                                        label="Temperatura Máxima"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.handleChangeTempMaxima}
                                        />
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    <TextField
                                        id="outlined-number"
                                        value={this.state.tempMinima}
                                        label="Temperatura Minima"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.handleChangeTempMinima}
                                        />
                                </StyledTableCell>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <h2>Retorno de Valores Inversores: </h2>

                    <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                        <Table sx={{ minWidth: 26 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Potencia do Inversor em kW</StyledTableCell>
                                    <StyledTableCell align='center'>Tensão Maxima do Inversor</StyledTableCell>
                                    <StyledTableCell align='center'>Tensão Minima do Inversor</StyledTableCell>
                                    <StyledTableCell align='center'>Tensão Maxima de Funcionamento Padrão</StyledTableCell>
                                    <StyledTableCell align='center'>Tensão Minima Para Funcionamento</StyledTableCell>
                                    <StyledTableCell align='center'>Número de MPPTs</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">{CriarFiltroValorsInversores.map(v => v.Potencia)}</StyledTableCell>
                                    <StyledTableCell align='center' component="th" scope="row">{CriarFiltroValorsInversores.map(v => v.TensaoEntradaMaxima)}</StyledTableCell>
                                    <StyledTableCell align='center' component="th" scope="row">{CriarFiltroValorsInversores.map(v => v.TensaoStringMinima)}</StyledTableCell>
                                    <StyledTableCell align='center' component="th" scope="row">{CriarFiltroValorsInversores.map(v => v.TensaoStringMaxima)}</StyledTableCell>
                                    <StyledTableCell align='center' component="th" scope="row">{CriarFiltroValorsInversores.map(v => v.TensaoMinimaFuncionamento)}</StyledTableCell>
                                    <StyledTableCell align='center' component="th" scope="row">{CriarFiltroValorsInversores.map(v => v.NumeroMPPTs)}</StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
                
        );
    }
}
export default InversoresComponent;

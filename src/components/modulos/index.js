import React from "react";
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
            <MenuItem value={fabricante}>{fabricante}</MenuItem>
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
                <MenuItem value={modeloModulos}>{modeloModulos}</MenuItem>
            );
            ApareceCampoModelo = exibirModeloFabricante;
            
            var criarFiltroModulos = this.state.modulos.filter(BuscarFabricantesModeloModulos);
            var FiltroPotencia = criarFiltroModulos.map(v => v.Potencia);
            const ExibePotenciaModulos = FiltroPotencia.filter((este, i) => FiltroPotencia.indexOf(este) === i);
            const ExibePotenciaFabricante = ExibePotenciaModulos.map((PotenciaModulos) => 
                <MenuItem value={PotenciaModulos}>{PotenciaModulos}</MenuItem>
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


        var PotenciaModuloSelecionado = criarFiltoValores.map(v => v.Potencia);
        var VmppModulosSelcionado= criarFiltoValores.map(v => v.Vmpp);
        var βvmppModulosSelcionado = criarFiltoValores.map(v => v.βvmpp);
        var VocModulosSelcionado = criarFiltoValores.map(v => v.Voc);
        var βvocModulosSelcionado = criarFiltoValores.map(v => v.βvoc);

        localStorage.setItem('PotenciaModuloSelecionado', PotenciaModuloSelecionado);
        localStorage.setItem('VmppModulosSelcionado', VmppModulosSelcionado);
        localStorage.setItem('βvmppModulosSelcionado', βvmppModulosSelcionado);
        localStorage.setItem('VocModulosSelcionado', VocModulosSelcionado);
        localStorage.setItem('βvocModulosSelcionado', βvocModulosSelcionado);


        return(
            <div>
                <div>
                

                    <table>
                        <tr>
                            <td>
                            <FormControl sx={{ m: 1, minWidth: 100 }}>
                                <InputLabel id="demo-simple-select-helper-label">Fabricante</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={this.state.fabricante}
                                    label="Fabricante"
                                    onChange={this.handleChangeFabricante}
                                    >
                                <MenuItem value="">
                                </MenuItem>
                                    <MenuItem value='Fabricante'>Fabricante</MenuItem>
                                    {exibirFabricantes}
                                </Select>
                            </FormControl>
                        </td>
                        <td>
                            <FormControl sx={{ m: 1, minWidth: 100 }}>
                                <InputLabel id="demo-simple-select-helper-label">Modelo</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={this.state.modelo}
                                    label="Modelo"
                                    onChange={this.handleChangeModelo}
                                    >
                                <MenuItem value="">
                                </MenuItem>
                                    <MenuItem value='Modelo'>Modelo</MenuItem>
                                    {ApareceCampoModelo}
                                </Select>
                            </FormControl>
                        </td>
                        <td>
                            <FormControl sx={{ m: 1, minWidth: 100 }}>
                                <InputLabel id="demo-simple-select-helper-label">Potencia</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={this.state.potencia}
                                    label="Modelo"
                                    onChange={this.handleChangePotencia}
                                    >
                                <MenuItem value="">
                                </MenuItem>
                                    <MenuItem value='Potencia'>Potencia</MenuItem>
                                    {ApareceCampoPotencia}
                                </Select>
                            </FormControl>
                        </td>
                        
                    </tr>
                </table>
                </div>
                <div>
                    <h2>Retorno de Valores Módulos: </h2>

                    <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                        <Table sx={{ minWidth: 350 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Vmpp</StyledTableCell>
                                    <StyledTableCell align='right'>βvmpp</StyledTableCell>
                                    <StyledTableCell align='right'>Voc</StyledTableCell>
                                    <StyledTableCell align='right'>βvoc</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">{criarFiltoValores.map(v => v.Vmpp)}</StyledTableCell>
                                    <StyledTableCell align='right' component="th" scope="row">{criarFiltoValores.map(v => v.βvmpp)}</StyledTableCell>
                                    <StyledTableCell align='right' component="th" scope="row">{criarFiltoValores.map(v => v.Voc)}</StyledTableCell>
                                    <StyledTableCell align='right' component="th" scope="row">{criarFiltoValores.map(v => v.βvoc)}</StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        );
    }
}
export default ModulosComponent;

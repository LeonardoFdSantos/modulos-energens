import React from "react";
import './index.css';
import ModulosComponent from '../modulos';
import InversoresComponent from '../inversor';
import CalculosComponent from '../calculos';

function ShowCalculos(props){
    if(!props.warn){
        return null;
    }
    return(<CalculosComponent />)
}

class TelaIncial extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            showCalculos: false,
        }
        this.handleClickUpdate = this.handleClickUpdate.bind(this);
    }

    handleClickUpdate(){
        this.setState(state => ({
            showCalculos: !this.state.showCalculos
        }));
    }

    render(){
        return(
            <div>
                <div>
                    <ModulosComponent />
                </div>
                <div>
                    <InversoresComponent />
                </div>
                <div>
                    <ShowCalculos warn={this.state.showCalculos} />
                </div>
                <button className="" onClick={this.handleClickUpdate}>Calcular</button>
            </div>
        );
    }
}
export default TelaIncial;

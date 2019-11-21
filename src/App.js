import React, {Component} from 'react'
import './App.css'

class App extends Component{
    constructor(){
        super();
        this.state={
            employees:[]
        }
    }

    componentDidMount(){
        fetch('http://localhost:3004/employees')
            .then(response=>response.json())
            .then(data=>this.setState({employees:data}));
    }

    render(){
        return(
            <div>
                <h1>Employees </h1>
                {this.state.employees.map(empl=><li className={empl.isActive==true ? "active" : "notactive" } key={empl.id}>{empl.name} {empl.age}</li>)}

            </div>
        )
    }
}

export default App;

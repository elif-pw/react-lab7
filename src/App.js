import React, {Component} from 'react'
import './App.css'

class App extends Component{
    constructor(){
        super();
        this.state={
            employees:[],


            age:0,
            name:'',
            email:'',
            parentname:'',
            parentphone:''

        }
        this.onChangeEvent = this.onChangeEvent.bind(this);
    }

    componentDidMount(){
        fetch('http://localhost:3004/employees')
            .then(response=>response.json())
            .then(data=>this.setState({employees:data}));
    }

    onChangeEvent(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    render(){
        const formUnder18 = (
            <div>
                <br/>
                <label>Parent Name    </label>
                <input
                    type="email"
                    name='parentname'
                    onChange={this.onChangeEvent}
                    required
                />
                <br/><br/>
                <label>Parent Phone No    </label>
                <input
                    type="text"
                    name='parentphone'
                    onChange={this.onChangeEvent}
                    required
                />
            </div>
        );
        const formAbove18=(
            <div>
                <label>Name    </label>
                <input
                    type="text"
                    name='name'
                    onChange={this.onChangeEvent}
                    required
                />

                <label>Email    </label>
                <input
                    type="email"
                    name='email'
                    onChange={this.onChangeEvent}
                    required
                />

            </div>

        );

        return(
            <div>
                <h1>Employees </h1>
                {this.state.employees.map(empl=><li className={empl.isActive==true ? "active" : "notactive" } key={empl.id}>{empl.name} {empl.age}</li>)}


                <form  /*onSubmit={this.handleFormSubmit}*/>
                    <fieldset>
                        <h3>Form </h3>

                        <label>Age     </label>
                        <input
                            type="number"
                            name='age'
                            onChange={this.onChangeEvent}
                            required
                        />
                        <br/>
                        {this.state.age < 18 ? formUnder18 : formAbove18}
                        <br/>
                        <button type="submit">Submit</button>
                        <br/>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default App;

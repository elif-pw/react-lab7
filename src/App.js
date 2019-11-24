import React, {Component} from 'react'
import './App.css'

class App extends Component {
    constructor() {
        super();
        this.state = {
            employees: [],

            id: '',
            age: 0,
            name: '',
            email: '',
            parentname: '',
            parentphone: '',

            phoneErrorMessage: null,
            emailErrorMessage: null,
            validPhone: false,
            validEmail: false

        }
        this.onChangeEvent = this.onChangeEvent.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.checkvalidityEmail=this.checkvalidityEmail.bind(this);
        this.checkvalidityPhone=this.checkvalidityPhone.bind(this);
        this.onEmailPhoneChange=this.onEmailPhoneChange.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:3004/employees')
            .then(response => response.json())
            .then(data => this.setState({employees: data}));
    }

    onChangeEvent(event) {
        this.setState({[event.target.name]: event.target.value});
      }

    onEmailPhoneChange(event){
        this.setState({[event.target.name]: event.target.value});
          }

    generateid() {
         (Date.now().toString(36) + Math.random().toString(36).substr(1, 24)).toLowerCase()
    }

    checkvalidityPhone(phone){
        (phone.match(/^[0-9]{9}$/) ?
            this.setState(()=>({validPhone:true, phoneErrorMessage:null}))
            : this.setState({phoneErrorMessage: 'Phone number should contain exactly 9 digits!',  validPhone:false}));

    }

    checkvalidityEmail(email){
        (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ?
            this.setState(()=>({validEmail:true, emailErrorMessage:null}) )
            : this.setState({emailErrorMessage: 'Email should contain \'@\' and \'.\' !', validEmail:false}));

    }

    handleFormSubmit(e) {
        const data=new FormData(e.target);
        data.get("age")<18? this.checkvalidityPhone(data.get("parentphone")):
            this.checkvalidityEmail(data.get("email"));

        e.preventDefault();
        if ( this.state.validPhone===true  || this.state.validEmail===true)  {
            this.setState({id: this.generateid()})
            fetch("http://localhost:3004/employees", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    "id": this.state.id,
                    "name": this.state.name,
                    "age": this.state.age,
                    "email": this.state.email,
                    "parentname": this.state.parentname,
                    "parentphone": this.state.parentphone
                })
            })
                .then(response => response.json())
                .then(()=>this.setState({validPhone:false, validEmail:false,emailErrorMessage:null, phoneErrorMessage:null}));
        }

    };

    render() {
        const formUnder18 = (
            <div>
                <br/>
                <label>Parent Name </label>
                <input
                    type="text"
                    name='parentname'
                    onChange={this.onChangeEvent}
                    required
                />
                <br/><br/>
                <label>Parent Phone No </label>
                <input
                    //pattern="[0-9]{9}"
                    type="text"
                    name='parentphone'
                    onChange={this.onEmailPhoneChange}
                    required
                />
            </div>
        );
        const formAbove18 = (
            <div>
                <br/>
                <label>Name </label>
                <input
                    type="text"
                    name='name'
                    onChange={this.onChangeEvent}
                    required
                />
                <br/><br/>
                <label>Email </label>
                <input
                    type="text"
                    name='email'
                    onChange={this.onEmailPhoneChange}
                    required
                />


            </div>

        );


        return (
            <div>
                <h1>Employees </h1>
                {this.state.employees.map(empl => <li className={empl.isActive === true ? "active" : "notactive"}
                                                      key={empl.id}>{empl.name} {empl.age}</li>)}


                <form onSubmit={this.handleFormSubmit}>
                    <fieldset>
                        <h3>Form </h3>

                        <label>Age </label>
                        <input
                            type="number"
                            name='age'
                            onChange={this.onChangeEvent}
                            required
                        />
                        <br/>
                        {this.state.age < 18 ? formUnder18 : formAbove18}
                        {(this.state.phoneErrorMessage) && this.state.age < 18 ?
                            <fieldset>
                                {this.state.phoneErrorMessage}
                            </fieldset>
                            : ''}
                        {(this.state.emailErrorMessage) && this.state.age >= 18?
                            <fieldset>
                                {this.state.emailErrorMessage}
                            </fieldset>
                            : ''}
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

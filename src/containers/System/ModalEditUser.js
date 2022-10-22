import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';


class ModalEditUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            address: '',
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        //isEmpty === not null (from lodash)
        if(user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hadcode',
                firstname: user.firstName,
                lastname: user.lastName,
                address: user.address,
            })
        }

    }

    toggle = () =>{
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) =>{
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });   
    }

    checkValidateInput = () =>{
        let isValid = true;
        let arrInput = ['email', 'password', 'firstname', 'lastname', 'address'];
        for(let i=0; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () =>{
        let isValid = this.checkValidateInput();
        if(isValid === true){
            //call api create modal
            this.props.EditUser(this.state);
        }
    
    }


    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() =>{this.toggle()}}
                className={'modal-user-container'}
                size="lg"
                centered               
               >
            <ModalHeader toggle={() =>{this.toggle()}}>Edit user</ModalHeader>
            <ModalBody>
              <div className='modal-user-body'>
              <div className='input-container'>
                        <label>Email</label>
                        <input 
                        type="text" 
                        onChange={(event) => {this.handleOnChangeInput(event, "email")}}
                        value={this.state.email}
                        disabled
                        />
                    </div>
                    <div className='input-container'>
                        <label>Password</label>
                        <input 
                        type="password" 
                        onChange={(event) => {this.handleOnChangeInput(event, "password")}}
                        value={this.state.password}
                        disabled
                        />
                    </div>
                    <div className='input-container'>
                        <label>First Name</label>
                        <input 
                        type="text" 
                        onChange={(event) => {this.handleOnChangeInput(event, "firstname")}}
                        value={this.state.firstname}
                        />
                    </div>
                    <div className='input-container'>
                        <label>Last Name</label>
                        <input 
                        type="texy" 
                        onChange={(event) => {this.handleOnChangeInput(event, "lastname")}}
                        value={this.state.lastname}
                        />
                    </div>
                    <div className='input-container max-width-input'>
                        <label>Address</label>
                        <input 
                        type="text" 
                        onChange={(event) => {this.handleOnChangeInput(event, "address")}}
                        value={this.state.address}
                        />
                    </div>
              </div>
                  
            </ModalBody>
            <ModalFooter>
              <Button 
              color="primary" 
              className='px-3' 
              onClick={() =>{this.handleSaveUser()}}>
                Save changes
              </Button>
              <Button color="secondary" className='px-3' onClick={() =>{this.toggle()}}>
                Close
              </Button>
            </ModalFooter>
           </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);






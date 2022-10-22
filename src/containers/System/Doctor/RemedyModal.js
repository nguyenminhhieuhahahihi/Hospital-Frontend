import React, { Component } from 'react';
import { connect } from "react-redux";
 import { FormattedMessage } from 'react-intl';
import './RemedyModal.scss'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import {LANGUAGES, CommonUtils} from "../../../utils";
//import {postPatientBookAppointment} from '../../../../services/userService';
import {toast} from "react-toastify";
import moment from 'moment';

class RemedyModal  extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            imgBase64: '',
        }
    }

    async componentDidMount(){
       if(this.props.dataModal){
        this.setState({
            email: this.props.dataModal.email
        })
       }
        
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
       if(prevProps.dataModal !== this.props.dataModal){
        this.setState({
            email: this.props.dataModal.email
        })
       }
        
    }

    handleOnchangeEmail = (event) =>{
        this.setState({
            email: event.target.value
        })
    }

    handleOnchangeImage = async (event) =>{
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
           
          
            this.setState({
                imgBase64: base64
            })
        }
    }

    handlesendRemedy = () =>{
        this.props.sendRemedy(this.state)
    }
    

    render() {
    let {isOpenModal, closeRemedyModal, dataModal, sendRemedy} = this.props;
  

    return (

        <>
        
            <Modal
                isOpen={isOpenModal}
                size="md"
                centered
                // toggle={}
                className={'booking-modal-container'}      
                
                
            >
               <div className="modal-header"><h5 className="modal-title">
                Xác nhận hóa đơn khám bệnh
               </h5>
               <button type="button" onClick={closeRemedyModal}
                style={{ color: 'red', border: 'none', cursor: 'pointer',}}
                className="btn-close" aria-label="Close">X</button></div>
                <ModalBody>
               <div className="row">
                    <div className="col-6 form-group">
                        <div>
                            <label>
                                Email bệnh nhân
                            </label>
                            <input  className="form-control" type="email" value={this.state.email}
                            onChange = {(event) => this.handleOnchangeEmail(event)}
                            />
                        </div>
                    </div>
                    <div className="col-6 form-group">
                        
                            <label>
                                 Tải đơn thuốc
                            </label>
                            <input  className="form-control-file" type="file"
                            onChange={(event) => this.handleOnchangeImage(event)}
                            />
                        
                    </div>
               </div>
                </ModalBody>
                <ModalFooter>
                <Button color="success" onClick={() => this.handlesendRemedy()}>
                    Send
                </Button>{' '}
                <Button color="danger" onClick={closeRemedyModal}>
                    Cancel
                </Button>
                </ModalFooter>
               
            </Modal>
                
        
        </>
    
    );

    }
}


const mapStateToProps = state => {
    return {
       language: state.app.language,
       genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // getGenders: () => dispatch(actions.fetchGenderStart()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal );

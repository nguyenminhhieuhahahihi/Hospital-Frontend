import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import * as actions from '../../../store/actions';
import {LANGUAGES} from '../../../utils';
import { withRouter } from 'react-router';
import {getAllSpecialty} from '../../../services/userService';
import './OutStandingDoctor.scss';


class OutStandingDoctor extends Component {
   
    constructor(props){
        super(props)
        this.state = {
            arrDoctors: [],
            dataSpecialty: []
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.topDoctorsRedux !== this.props.topDoctorsRedux){
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }

    async componentDidMount(){
        this.props.loadTopDoctors();
        let res = await getAllSpecialty();
      //  console.log('check res', res)
        if(res && res.errCode === 0){
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
        
    }

    handleViewDetailView = (doctor) =>{
        
        if(this.props.history){
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
       // console.log('view info', doctor)
       
    }
 
    render() {
        let {dataSpecialty} = this.state;
       // console.log('check dataSpecialty: ', dataSpecialty);
       // console.log('check topDoctorsRedux: ', this.props.topDoctorsRedux)
        let arrDoctors = this.state.arrDoctors;
        let {language} = this.props;
        // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors)
        return (
            <div className='section-share section-outStanding-doctor'>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'><FormattedMessage id="homepage.out-standing-doctor"/></span>
                    <button className='btn-section'><FormattedMessage id="homepage.more"/></button>
                </div>
                <div className='section-body'>
                <Slider {...this.props.settings}>
 
                    {arrDoctors && arrDoctors.length > 0
                    && arrDoctors.map((item, index) =>{
                        let imageBase64 = '';
                        if(item.image){
                            imageBase64 = new Buffer(item.image, 'base64').toString('binary'); 
                        }
                        let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `;
                        let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                        return(
                            <div className='section-customize' key={index} onClick= {() => this.handleViewDetailView(item)}>
                            <div className='customize-border'>
                                <div className='outer-bg'>
                                    <div className='bg-image section-outStanding-doctor'
                                     style = {{ backgroundImage: `url(${imageBase64})` }}
                                    />
                                </div>
                                    <div className="position text-center">
                                        <div>{language === LANGUAGES.VI ? nameVi : nameEn }</div>

                                    </div>  
                            </div>  
                        </div>
                        )
                    })
                    }
                       
                        
                       
                    
        </Slider>
                </div>
               
            </div>
        </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));

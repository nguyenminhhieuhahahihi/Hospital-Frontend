import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from '../../utils';
import {changeLapguageApp} from '../../store/actions'
import { withRouter } from 'react-router';

class HomeHeader extends Component {

    changeLanguage = (language)  =>{
        this.props.changeLapguageAppRedux(language)
        
        //fire redux event: actions
    }

    returnToHome = () =>{
        if(this.props.history){
            this.props.history.push(`/home`)
        }
    }
 
    render() {
        
        let language = this.props.language;


        return (

        <React.Fragment>
            <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='left-content'>
                        <i className="fas fa-bars bar"></i>
                        <div className='header-logo' onClick={() => this.returnToHome()}></div>
                    </div>
                    
                    <div className='center-content'>
                        <div className='child-content'>
                            <div><b> <FormattedMessage id="homeheader.speciality"/> </b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.search-doctor"/></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="homeheader.health-facility"/></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.select-room"/></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="homeheader.doctor"/></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.select-a-doctor"/></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="homeheader.health-check"/></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.general health"/></div>
                        </div>
                    </div>

                    <div className='right-content'>
                        <div className='support'>
                            <i className="fas fa-question-circle"></i>
                            <FormattedMessage id="homeheader.support"/>
                            </div>
                        <div className= {language === LANGUAGES.VI ? 'language-vi active' : 'language-vi' } ><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                        <div className= {language === LANGUAGES.EN ? 'language-en active' : 'language-en' }><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                    </div>
                </div>
            </div>

            {this.props.isShowBanner === true &&

            <div className='home-header-banner'>

                <div className='content-up'>
                <div className='title1'><FormattedMessage id="banner.title1"/></div>
                    <div className='title2'> <b><FormattedMessage id="banner.title2"/></b></div>
                    <div className='search'>
                    <i className="fa fa-search"></i>
                        <input type='text' placeholder='Tìm chuyên khoa khám bệnh'/>
                    </div>
                </div>

                <div className='content-down'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='icon-child-1'></div>
                                <div className='text-child'><FormattedMessage id="banner.specialist-exam"/> </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child-2'></div>
                                <div className='text-child'><FormattedMessage id="banner.remote-exam"/></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child-3'></div>
                                <div className='text-child'><FormattedMessage id="banner.general-exam"/></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child-4'></div>
                                <div className='text-child'><FormattedMessage id="banner.medical-test"/></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child-5'></div>
                                <div className='text-child'><FormattedMessage id="banner.mental-health"/></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child-6'></div>
                                <div className='text-child'><FormattedMessage id="banner.dental-exam"/></div>
                            </div>
                        </div>
                </div>
                    
                </div>
            }
        </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLapguageAppRedux: (language) => dispatch(changeLapguageApp(language))
    };
};

export default withRouter (connect(mapStateToProps, mapDispatchToProps)(HomeHeader));

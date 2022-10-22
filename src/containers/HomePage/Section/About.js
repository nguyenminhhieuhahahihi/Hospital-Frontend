import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './About.scss';



class About extends Component {

    
 
    render() {

        
        
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói về BookingCare
                </div> 
                <div className='section-about-content'>

                    <div className='video'>
                        <iframe  width= "90%" height= "350px"
                        src="https://www.youtube.com/embed/FyDQljKtWnI" 
                        title="YouTube video player" frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write;
                        encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen></iframe>
                    </div>

                    <div className='image'>
                        
                    </div>

                </div>
                
                

            </div>
      
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);

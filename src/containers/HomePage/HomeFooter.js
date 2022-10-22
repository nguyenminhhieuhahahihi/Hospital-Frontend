import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';




class HomeFooter extends Component {

    
 
    render() {

        
        
        return (
            <div className='section-share home-footer section-homepage'>
                <p>&copy; 2022 <b>Nguyễn Minh Hiếu</b><br/> More Information, please visit my Github.
                <a href='https://github.com/nguyenminhhieuhahahihi' target="_blank">  &#8594; Click here  &#8592; </a></p>
                <p>Contact me: </p>
                <p>SĐT: <b>0945790054</b></p>
                <p>Email: <b>nguyenminhhieu20010624@gmail.com</b></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);

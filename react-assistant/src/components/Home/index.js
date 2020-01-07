import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { Container } from './styles';

class Home extends Component {
    render() {
        return (
            <div className="home">
                {JSON.stringify(this.props.error)}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.watson.detailError
    }
}

export default connect(mapStateToProps, null)(Home)
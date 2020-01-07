import React, { Component } from 'react';
import { Alert, Badge } from 'reactstrap'
import { connect } from 'react-redux'
// import { Container } from './styles';

class Chat extends Component {

    renderMessages(message, key) {
        const { message: msg, orign: author } = message
        return (
            <div key={key}>
                {author === 'user' && <span>
                    <Badge color="primary">
                        voce disse:
                </Badge>
                    <Alert color="primary">{msg} </Alert>
                </span>}

                {author === 'bot' && <span>
                    <Badge color="warning"> Bot disse:</Badge>
                    <Alert color="warning"> {msg}</Alert>
                </span>}
            </div>
        )
    }

    render() {
        return (
            <div className="chat-conversa">
                {
                    Object.keys(this.props.messages).map(key =>
                        this.renderMessages(this.props.messages[key], key))
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        messages: state.chat.messages
    }
}

export default connect(mapStateToProps, null)(Chat)

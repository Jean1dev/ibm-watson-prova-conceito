import React, { Component } from 'react';
import { Button, InputGroup, Input, InputGroupAddon } from 'reactstrap'
import { connect } from 'react-redux'
import { sendMessage } from '../../store/actions/chat'
import { watsonTalks } from '../../store/actions/watson'
// import { Container } from './styles';

class ChatMessage extends Component {
  constructor(props) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(e) {
    if (e.keyCode === 13) {
      const message = { message: e.target.value, orign: 'user'}
      this.send(message)
      e.target.value = ``
    }
  }

  send(message) {
    this.props.sendText(message)
    this.props.sendToWatson(message, context)
  }

  render() {
    return (
      <div className="chat-message">
        <InputGroup>
          <Input onKeyDown={this.handleInputChange} placeholder='Digite sua mensagem' />
          <InputGroupAddon addonType="append">
            <Button color="success">Enviar</Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendText: msg => dispatch(sendMessage(msg)),
    sendToWatson: (msg, context) => dispatch(watsonTalks(msg, context))
  }
}

export default connect(null, mapDispatchToProps)(ChatMessage)

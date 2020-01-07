import React, { Component } from 'react';
import { Button, InputGroup, Input, InputGroupAddon } from 'reactstrap'
import { connect } from 'react-redux'
import { sendMessage } from '../../store/actions/chat'
import { watsonTalks } from '../../store/actions/watson'
import { watsonInit } from '../../store/actions/session'
// import { Container } from './styles';

class ChatMessage extends Component {
  constructor(props) {
    super(props)
    this.sessionId = null
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount() {
    this.props.watsonInit()
  }

  componentDidUpdate() {
    if (!this.sessionId) {
      this.sessionId = this.props.context
      this.props.sendToWatson('', this.sessionId)
    }
  }

  handleInputChange(e) {
    if (e.keyCode === 13) {
      const message = { message: e.target.value, orign: 'user' }
      this.send(message)
      e.target.value = ``
    }
  }

  send(message) {
    this.props.sendText(message)
    this.props.sendToWatson(message.message, this.sessionId)
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
    sendToWatson: (msg, context) => dispatch(watsonTalks(msg, context)),
    watsonInit: () => dispatch(watsonInit())
  }
}

const mapStateToProps = state => {
  return {
    context: state.session.context
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessage)

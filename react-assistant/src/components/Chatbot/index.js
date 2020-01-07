import React, { Component } from 'react';

import '../Chat/styles.css'
import ChatHeader from '../Chat/ChatHeader';
import Chat from '../Chat';
import ChatMessage from '../Chat/ChatMessage';

// import { Container } from './styles';

class ChatBot extends Component {
    render() {
        return (
            <div className="chatbot">
                <div className="chat-conteudo">
                    <ChatHeader></ChatHeader>
                    <Chat></Chat>
                    <ChatMessage></ChatMessage>
                </div>
            </div>
        )
    }
}

export default ChatBot
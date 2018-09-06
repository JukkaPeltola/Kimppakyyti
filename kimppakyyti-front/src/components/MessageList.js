import React, { Component } from "react";
// import { Button, ListGroup, ListGroupItem } from "reactstrap";
// import { isLoggedIn, getProfile } from "./AuthService";
import Message from "./Message";

class MessageList extends Component {


    render() {
        var self = this;
        var deletemessage = self.props.deletethis;
        var messages = self.props.messages.map(function (message) {
            return <Message singlemessage={message} key={message.id} deletethis={deletemessage} />;
        });
        return (
            <div>
                <div>{messages}</div>
            </div>

        );
    }

}
export default MessageList;
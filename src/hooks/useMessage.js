import { useState } from 'react';

export default function useMessage() {
    const [message, setMessage] = useState([]);
    function pushNotify(newMessage) {
        setMessage(message => [...message, newMessage]);
    }
    function pullNotify() {
        setMessage((message, index) => {
            const newMessage = message.slice(index, message.length - 1);
            return newMessage;
        });
    }
    return [message, pushNotify, pullNotify];
}

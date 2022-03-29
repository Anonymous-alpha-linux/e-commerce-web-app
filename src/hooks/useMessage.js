import { useState } from 'react';

export default function useMessage() {
    const [message, setMessage] = useState([]);
    function pushNotify(newMessage) {
        setMessage(message => [...message, newMessage]);
    }
    function pullNotify() {
        setMessage(message => {
            return message.slice(1, message.length - 1);
        });
    }
    return [message, pushNotify, pullNotify];
}

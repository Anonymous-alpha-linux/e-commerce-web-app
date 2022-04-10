import { useCallback, useState } from 'react';

export default function useMessage() {
    const [message, setMessage] = useState([]);
    const pushNotify = (newMessage) => {
        setMessage(oldMessages => [...oldMessages, newMessage]);
    }

    function pullNotify() {
        setMessage((message) => {
            message.unshift();
            return message;
        });
    }
    return [message, pushNotify, pullNotify];
}

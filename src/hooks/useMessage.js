import { useCallback, useState } from 'react';

export default function useMessage() {
    const [message, setMessage] = useState({
        arrays: []
    });
    const pushNotify = useCallback((newMessage) => {
        setMessage(oldMessages => ({
            arrays: [...oldMessages.arrays, newMessage]
        }));
    }, []);

    function pullNotify(index) {
        setMessage((message) => {
            return { arrays: message.arrays.filter((_, id) => id !== index) };
        });
    }
    return [message.arrays, pushNotify, pullNotify];
}

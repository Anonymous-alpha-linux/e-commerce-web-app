import axios from 'axios';

const fetchAPI = async (url, method = "GET", dispatch, options, query) => {
    console.log(url, method, options);
    try {
        if (!url) {
            throw new Error("Your url should be specific");
        }
        if (query) {
            return axios(url, {
                method: method,
                params: query
            })
                .then(response => response.data)
                .then(data => dispatch(data))
                .catch(err => {
                    if (err) throw new Error(err.message);
                });
        }
        return axios(url, {
            method: method,
            ...options,
        })
            .then(response => response.data)
            .then(data => dispatch(data))
            .catch(err => {
                if (err) throw new Error(err.message);
            });
    }
    catch (err) {
        return {
            error: err.message
        }
    }
}

export default fetchAPI;
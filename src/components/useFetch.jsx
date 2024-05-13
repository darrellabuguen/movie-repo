import { useState, useEffect } from "react"

const useFetch = (url, methodd) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiK = import.meta.env.REACT_APP_API_KEY;

    useEffect(() => {
        const abortCont = new AbortController();
        const options = {
            method: `${methodd}`,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiK}`
            }
        };

        setTimeout(() => {
            fetch(url, options, { signal: abortCont.signal })
                .then(res => {
                    if (!res.ok) {
                        throw Error('Could not fetch the data from the server')
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                    setLoading(false);
                    setError(null);
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('fetching aborted');
                    } else {
                        setLoading(false);
                        setError(err.message);
                    }
                });

            return () => abortCont.abort();
        }, 1000);
    }, [url, methodd]);

    return { data, loading, error }
}

export default useFetch
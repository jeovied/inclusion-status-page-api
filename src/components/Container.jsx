import React, { useState, useEffect } from "react";
import '../style/Container.css';

/* Dependencies imports */
import axios from 'axios';

/* Imports */
import Box from './Box';

const Container = () => {

    /* Endpoints */
    const urls = [
        'https://api.factoryfour.com/accounts/health/status',
        'https://api.factoryfour.com/assets/health/status',
        'https://api.factoryfour.com/customers/health/status',
        'https://api.factoryfour.com/datapoints/health/status',
        'https://api.factoryfour.com/devices/health/status',
        'https://api.factoryfour.com/documents/health/status',
        'https://api.factoryfour.com/forms/health/status',
        'https://api.factoryfour.com/invites/health/status',
        'https://api.factoryfour.com/media/health/status',
        'https://api.factoryfour.com/messages/health/status',
        'https://api.factoryfour.com/namespaces/health/status',
        'https://api.factoryfour.com/orders/health/status',
        'https://api.factoryfour.com/patients/health/status',
        'https://api.factoryfour.com/relationships/health/status',
        'https://api.factoryfour.com/rules/health/status',
        'https://api.factoryfour.com/templates/health/status',
        'https://api.factoryfour.com/users/health/status',
        'https://api.factoryfour.com/workflows/health/status',
    ];

    /* Use state for endpoints */
    const [url, setUrl] = useState([]);

    /* Use state for loading screen... */
    const [loading, setLoading] = useState(true);

    /* Function to Fetching data */
    const fetchData = async () => {
        setLoading(true);
        setUrl([]);
        setTimeout(() => {
            urls?.map(async (url) => {
                await axios.get(url)
                    .then((res) => {
                        if (res.status === 200) {
                            setUrl((prev) => [...prev, res.data]);
                        }
                    })
                    .catch((err) => setUrl((prev) => [...prev, {
                        success: false,
                        hostname: "services-d196fbac02e8",
                    }]));
            });
            setLoading(false);
        }, 500);
    }

    /* Loop's timer managment */
    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 15000) // <--- Here you can edit the delay' seconds to refresh the API data.
        return () => clearInterval(interval);
    }, [])

    /* Conditional return */
    if (loading) return (
        <div className="loading-div" >
            <h1>Loading ...</h1>
        </div>
    );
    return (
        <div className="container">
            {url.sort((a, b) => {
                if (a.hostname < b.hostname) {
                    return -1;
                } else if (a.hostname > b.hostname) {
                    return 1;
                }
                return 0;
            })
                .map((item, i) => <Box key={i} item={item} />)}
        </div>
    );
}

export default Container
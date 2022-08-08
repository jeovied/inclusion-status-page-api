import React from 'react';
import '../style/Box.css';

/* Dependencies imports */
import moment from 'moment';

const Box = ({ item }) => {

    return (
        <div className='box-container'>
            <div className='box'>
                <span className='min-container'>
                    {/* Title */}
                    <h1>
                        {item?.hostname ? item?.hostname.substring(0, item?.hostname.indexOf('-')) : null}
                    </h1>
                    {/* Conditional output */}
                    {
                        !item?.success ? 
                        /* Error result */
                        (
                            <div>
                                <p className={'deprecated'}
                                >
                                    {'Error'}
                                </p>
                                <p className='subp1'>
                                    OUTAGE
                                </p>
                                <p className='subp2'>
                                    503
                                </p>
                                <p className='subp2'>
                                    Forbidden
                                </p>
                            </div>
                        ) : 
                        /* Success result */
                        (
                            <div>
                                <p className={`${item.success ? 'success' : ''}`}
                                >
                                    {item.message && item.message}
                                </p>
                                <p
                                >
                                    {item?.success ? item?.hostname : ''}
                                </p>
                                <p className={'success-p'}
                                >
                                    {item?.success ? moment(item?.time).format('HH:mm:ss') : null}
                                </p>
                            </div>
                        )
                    }
                </span>
            </div>
        </div>
    )
}

export default Box
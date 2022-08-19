import React from 'react';
import {useLocation} from 'react-router-dom';
import { getCertificate } from '../../utils/api'
const { CertificateMenu } = require('../../components')


export function CertificatePage( { history, match } ) {
    const search = useLocation().search;
    const QRData = new URLSearchParams(search).get('data');
    // const [ user, setUser ] = React.useState(null)
    const [ loading, setLoading ] = React.useState(true)
    const [ certificateData, setCertificate ] = React.useState(null)
    React.useEffect(() => {
        getCertificate(QRData)
        .then( async ({data}) => {
            console.log(data)
            setCertificate(data)
            setLoading(false) 
        })
        // const { data } = match.query
    }, [])
    return !loading && (
        <div>
            <h1>Certificate Page</h1>
            <CertificateMenu certificateData={certificateData}/>
            {/* <getTop top5={ top5 } /> */}
        </div>
    )
}
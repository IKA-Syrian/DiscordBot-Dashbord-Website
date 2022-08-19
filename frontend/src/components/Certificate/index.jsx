import React from 'react';
import { Formik } from 'formik';
import { Input, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import { Buffer } from 'buffer'
global.buffer = Buffer

export function CertificateMenu( { 
    history,
    certificateData,
} ) {
    
    // eslint-disable-next-line no-unused-vars
    const [ prefix, setPrefix ] = React.useState("$");

    return (
        <div>
            <div><h1>اسم صاحب الشهادة :</h1><h3>{Buffer.from(certificateData.username).toString()}</h3></div>
            <div>
                <h1>الرقم التسلسلي للشهادة :</h1>
                <h3>{certificateData.data}</h3>
                <h1>صورة البركود :</h1>
                <img src={certificateData.QRUrl} alt="qr" />
            </div>
            <div>
                <h1>تخرج من دورة :</h1>
                <h3>{certificateData.position}ال</h3>
            </div>
            <div>
                <h1>الدرجة المئوية :</h1>
                <h3>{certificateData.degree}</h3>
            </div>
            <div>
                <h1>الشهادة :</h1>
                <img src={certificateData.certificate} alt="certificate" />
            </div>
        </div>
    )
}
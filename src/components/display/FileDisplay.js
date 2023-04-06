import React, { useState } from 'react'

const FileDisplay = () => {
    const [pptLink, setPptLink] = useState(
        'https://firebasestorage.googleapis.com/v0/b/fir-api-7421d.appspot.com/o/Test-Taking-Strategies-final-9-24-2019.pptx?alt=media&token=2eb4db2a-8ba5-4633-afee-756006b5cc43'
        );

    return (
        <div>
            <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(pptLink)}`} width="100%" height="600px" frameborder="0" title='app'></iframe>
        </div>
    );

}

export default FileDisplay

//https://firebasestorage.googleapis.com/v0/b/fir-api-7421d.appspot.com/o/class1.pptx?alt=media&token=2bfeee40-ead7-408f-8df3-ec5e0a201ce7
//https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/__WTM%20Secure%20Code%20Development.pptx?alt=media&token=ab11d017-257a-4ac5-a2b3-a1620080b380
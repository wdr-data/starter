import React from "react";


const Webtrekk = ({ cg1, cg2, cg3, cg4, cg5 }) => {
    const searchParams = new URLSearchParams();
    searchParams.append('p', '441,WDR_Verbraucher_Digital_Data_Daten sichtbar machen,1,1920x1200,24,1,1562577868831,0,975x1023,0') /*TODO Change URL?*/
    searchParams.append('tz', '2')
    searchParams.append('la', 'de')
    if (cg1) { searchParams.append('cg1', cg1)}
    if (cg2) { searchParams.append('cg2', cg2)}
    if (cg3) { searchParams.append('cg3', cg3)}
    if (cg4) { searchParams.append('cg4', cg4)}
    if (cg5) { searchParams.append('cg5', cg5)}
    searchParams.append('cp4', '2019-07-06')
    searchParams.append('np', 'Shockwave Flash')
    searchParams.append('pu', 'https://www1.wdr.de/verbraucher/digital/data/index.html')
    searchParams.append('eor', '1')

    const URL = `https://wdr01.wt-eu02.net/882049745744921/wt?${searchParams.toString()}`

    return <img style={{ display: "none" }} src={URL} />
}

export default Webtrekk;

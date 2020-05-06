const r = require('request-promise-native');
const fs = require('fs').promises;;

const main = async () => {
    const index = await fs.readFile('src/pages/index.md', 'utf8');
    const matches = [...index.matchAll(/videoId="(\d*)"/g)];
    const videoIds = matches.map((match) => match[1]);
    console.log(`Found videoIds in index.md: ${videoIds}`);

    for (const videoId of videoIds) {
        const jsResponse = await r.get(`https://deviceids-medp.wdr.de/ondemand/${videoId.substring(0, 3)}/${videoId}.js`);
        const jsonResponse = jsResponse.match(/\$mediaObject.jsonpHelper.storeAndPlay\((.*?)\);/)[1];
        const parsed = JSON.parse(jsonResponse);
        const m3uUrl = parsed.mediaResource.dflt.videoURL;

        const m3uResponse = await r.get(`https:${m3uUrl}`);
        await fs.writeFile(`./static/m3u/${videoId}.m3u8`, m3uResponse);
    }
}

main().then(() => console.log('Downloaded M3U files.'));

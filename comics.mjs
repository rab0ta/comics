import axios from "axios";
import * as cheerio from 'cheerio';
import fs from 'node:fs';
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
if(!fs.existsSync('cache')){
    fs.mkdirSync('cache');
}

for(let i = 21; i>0; i--){
    let res = await axios.get('https://nhentai.to/g/359336/' + i);
    const $ = cheerio.load(res.data);
    let cachePath = `cache/${i}.html`;
    let data;
    if(!fs.existsSync(cachePath)){
        await sleep(2000);
        let res = await axios.get('https://nhentai.to/g/359336/' + i);
        //CACHE
        fs.writeFileSync(cachePath, res.data);
        data = res.data;
        console.log("LIVE REQUEST!");
    } else {
        data = fs.readFileSync(cachePath);
    }

    //comics source output
    let imgSrc = $('section[id="image-container"]>a>img').attr('src');
    
    await sleep(1000)
    console.log(imgSrc);
}
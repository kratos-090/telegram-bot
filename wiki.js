const fetch = require('node-fetch');

const wikiRandomUrl =
  'https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts|info&format=json&inprop=url&explaintext&exchars=130'

async function pageInfo() {
  try {
    let result = await fetch(wikiRandomUrl)
    let wikiJSON = await result.json()
    
    const pageArr = wikiJSON.query.pages;
    const pageId = Object.keys(pageArr)[0];
    const title = pageArr[pageId].title;
    const summary = pageArr[pageId].extract;
    const url = pageArr[pageId].fullurl;
    
    console.log({ title, summary,url });
    return { title, summary,url };


  } catch (e) {
    console.log('Error in the getting info @wiki.js: ', e)
  }
}

module.exports = pageInfo ;
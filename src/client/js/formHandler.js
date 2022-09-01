import "babel-polyfill";
async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)
    // test url: 'https://webpack.js.org/guides/'
    let data = await fetchingAPI('http://localhost:8081/api',{url:formText});
    console.log('***********');
    console.log(data);
    console.log('***********');
    document.getElementById('agreement').innerText = "Agreement: " + data.agreement;
    document.getElementById('confidence').innerText = "Confidence: " + data.confidence;
    document.getElementById('polarity').innerText = "Polarity: " + checkPolarity(data.score_tag);
    document.getElementById('irony').innerText = "Irony: " + data.irony;
    document.getElementById('subjectivity').innerText = "Subjectivity: " + data.subjectivity;

    // console.log("::: Form Submitted :::")
    // fetch('http://localhost:8081/test')
    // .then(res => res.json())
    // .then(function(res) {
    //     document.getElementById('results').innerHTML = res.message
    // })
}

async function fetchingAPI(url = "" , data={}){
    console.log('begin fetching ...');
    let response = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    try{
        let data = await response.json();
        console.log(data);
        return data;
    }catch(error){
        console.log(error);
    }
    console.log('end fetching ...');
}
// P+: strong positive
// P: positive
// NEU: neutral
// N: negative
// N+: strong negative
// NONE: without polarity
function checkPolarity(polarityScore){
    let result = '';
    // results from https://learn.meaningcloud.com/developer/sentiment-analysis/2.1/doc/response
    switch(polarityScore){
        
        case 'P+': 
            result = 'strong positive'
            break;
        case 'P': 
            result = 'positive'
            break;
        case 'NEU': 
            result = 'neutral'
            break;
        case 'N': 
            result = 'negative'
            break;
        case 'N+': 
            result = 'strong negative'
            break;
        case 'NONE': 
            result = 'without polarity'
            break;
    }
    return result.toUpperCase();

}

export { handleSubmit }

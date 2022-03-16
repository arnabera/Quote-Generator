let quoteContainer = document.getElementById('quote-container')
let authorText= document.getElementById('author')
let quoteText = document.getElementById('quote')
let twitterBtn = document.getElementById('twitter')
let newQuoteBtn = document.getElementById('new-quote')
let loadingIcon = document.getElementById('loader')

let apiQuotes = [];
//loading function
function loading(){
    loadingIcon.hidden = false
    quoteContainer.hidden = true
}

function complete(){
    loadingIcon.hidden = true
    quoteContainer.hidden = false
}
// generates new quotes
function newQuotes(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    //if author field is blank replace with unknown
    if(!quote.author){
        authorText = 'Unknown'
    }else{
        authorText.textContent = quote.author;
    }
    quoteText.textContent = quote.text;
    complete();
}

//This is for tweet quotes
function tweetQuotes() {
    const tweetUrl = `https://twitter.com/intent/tweet?${quoteText.textContent} - ${authorText.textContent}`

    window.open(tweetUrl,'_blank')
}
// We are fetching data from the API's
async function getQuotes() {
    loading();
    const quoteUrl='https://type.fit/api/quotes'
    try{
        const response = await fetch(quoteUrl)
        apiQuotes = await response.json()
        newQuotes()
    }catch{
        // handle the error
    }
}

//adding Event listener

twitterBtn.addEventListener('click',tweetQuotes)
newQuoteBtn.addEventListener('click',newQuotes)

getQuotes()
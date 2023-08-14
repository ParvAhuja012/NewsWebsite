const API_KEY = "d03e9afa695b486593e9f804f2d54f6a";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener('load',()=> fetchNews('India')); 
async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`) ;
    const data = await res.json();
     console.log(data);
     bindData(data.articles);
}
function reload(){
    window.location.reload();
}
function bindData(articles){
    const cardContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById("template-news-card");

    cardContainer.innerHTML = "";
    articles.forEach(article=>{
       if(!article.urlToImage)return;
       const cardClone = newsCardTemplate.content.cloneNode(true);
       fillDataCard(cardClone,article);
       cardContainer.appendChild(cardClone);
    })
}
function fillDataCard(cardClone,article){
     const newsimg = cardClone.querySelector('#news-img');
     const newsTitle = cardClone.querySelector('#news-title');
     const newsSource = cardClone.querySelector('#news-source');
     const newsDesc = cardClone.querySelector('#news-desc');
     newsimg.src = article.urlToImage;
     newsTitle.innerHTML = article.title;
     newsDesc.innerHTML = article.description;

     const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:'Asia/Jakarta'
     })
     newsSource.innerHTML = `${article.source.name} / ${date}`;
     cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,'_blank');
     })

      
}
let currSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navitem = document.getElementById(id);
    currSelectedNav?.classList.remove('active');
    currSelectedNav = navitem;
    currSelectedNav.classList.add('active');

}
const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');
searchButton.addEventListener('click',()=>{
    const query = searchText.value;
    if(!query)return;
    fetchNews(query);
    currSelectedNav?.classList.remove('active');
    currSelectedNav = null;

});
 
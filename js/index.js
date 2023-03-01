const newsData = () => {

    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(news => showAllNews(news))
}

function showAllNews(allNews){

    const categoryName = document.getElementById('category_name');

    allNews.data.news_category.forEach((element) => {

        const createLists = document.createElement('div');

        createLists.innerHTML = `

        <p class="font-bold"> ${element.category_name} </P>

        `;

        categoryName.appendChild(createLists);

        console.log(element);

    });

    // console.log(allNews.data.news_category[0]);
}

newsData();
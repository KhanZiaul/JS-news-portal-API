const newsData = () => {

    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(news => showAllNews(news))
}

function showAllNews(allNews) {

    const categoryName = document.getElementById('category_name');

    allNews.data.news_category.forEach((element) => {

        const createLists = document.createElement('div');

        createLists.innerHTML = `

        <p class="font-bold cursor-pointer" onclick="showCategory('${element.category_id}', '${element.category_name}')"> ${element.category_name} </P>

        `;

        categoryName.appendChild(createLists);

    });

}

function showCategory(categoryId, categoryName) {

    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`

    fetch(url)

        .then(res => res.json())

        .then(data => showCategoryNameList(data.data, categoryName))
}

function showCategoryNameList(data, categoryName) {

    console.log(data);

    document.getElementById('categoryItems').innerText = data.length;

    document.getElementById('categoryName').innerText = categoryName;

    console.log('clicked');

}

newsData();
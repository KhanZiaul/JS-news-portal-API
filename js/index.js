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

    document.getElementById('categoryItems').innerText = data.length;

    document.getElementById('categoryName').innerText = categoryName;


    const news = document.getElementById('news');

    news.innerHTML = ""; 

    data.forEach(element =>{

        const createDiv = document.createElement('div');

        createDiv.classList.add('flex');

        createDiv.classList.add('p-5'); 

        createDiv.classList.add('gap-5');
    
        createDiv.innerHTML = `
    
        <div class="w-[50%]">
            <img src="${element.image_url}" class="w-[600px]" alt="no image found">
        </div>
        <div class="w-[50%]">
            <h2 class="text-justify">${element.details}</h2>
        </div>
        `;

        news.appendChild(createDiv);
    });

    console.log(data[0].details);

}

newsData();
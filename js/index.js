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

    data.forEach(element => {

        const createDiv = document.createElement('div');

        createDiv.classList.add('flex');

        createDiv.classList.add('p-5');

        createDiv.classList.add('gap-5');

        createDiv.innerHTML = `
    
        <div class="w-[50%]">

            <img src="${element.image_url}" class="w-[600px]" alt="no image found">
        </div>
        <div class="w-[50%]">

            <h2 class="text-justify font-bold mb-3">${element.title}</h2>
            <h2 class="text-justify">${element.details.slice(0, 200)}...</h2>

         <div class="flex justify-between items-center mt-24">

             <div class="flex gap-4">
                <div> 
                <img src="${element.author.img
            }" class="w-[50px] rounded-full" alt="no image found"> </div>
                <div> 
                <h2 > ${element.author.name} </h2>
                <h2> ${element.author.published_date} </h2>
                </div>
            </div>

            <div class="flex gap-2">
               <div> <i class="fa-solid fa-eye"> </i> </div>
               <div> <p>${element.total_view}</p> </div>
            </div>

            <div>
            <div> <i onclick="details('${element._id}')" class="fa-solid fa-arrow-right cursor-pointer"></i>  </div>
               </div>
            
        </div>
    </div>
        `;

        news.appendChild(createDiv);
    });

    console.log(data[0]._id);

}


function details(serial){

    const url = `https://openapi.programming-hero.com/api/news/${serial}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showDetails(data.data[0]))
}

function showDetails(data){

    console.log(data)
}

newsData();
let dataForTrendPick = [];

let categoryNameIs;

// all news fetch

const newsData = () => {

    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(news => showAllNews(news));
};

// show category name section

function showAllNews(allNews) {

    const categoryName = document.getElementById('category_name');

    allNews.data.news_category.forEach((element) => {

        const createLists = document.createElement('div');

        createLists.innerHTML = `

        <p class="font-bold cursor-pointer" onclick="showCategory('${element?.category_id}', '${element?.category_name}')"> ${element?.category_name} </P>

        `;

        categoryName.appendChild(createLists);

    });

};

// categoryId fetch

function showCategory(categoryId, categoryName) {

    console.log(categoryId, categoryName);

    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`

    fetch(url)

        .then(res => res.json())

        .then((data) => {

            dataForTrendPick = data.data;

            categoryNameIs = categoryName;

            showCategoryNameList(data.data, categoryName)
        })
}




// show category name and list section & card section

function showCategoryNameList(data, categoryName) {

    document.getElementById('categoryItems').innerText = data.length;

    document.getElementById('categoryName').innerText = categoryName;

    const news = document.getElementById('news');

    news.innerHTML = "";

    data.forEach(element => {

        const createDiv = document.createElement('div');

        createDiv.classList.add('lg:flex');

        createDiv.classList.add('p-3');

        createDiv.classList.add('lg:p-5');

        createDiv.classList.add('gap-3');

        createDiv.classList.add('lg:gap-5');

        createDiv.innerHTML = `
    
        <div class="lg:w-[50%]">

            <img src="${element?.image_url}" class="w-full lg:w-[600px]" alt="no image found">
        </div>
        <div class="lg:w-[50%]">

            <h2 class="text-justify font-bold mb-3">${element?.title}</h2>
            <h2 class="text-justify">${element?.details.slice(0, 200)}...</h2>

         <div class="flex flex-col md:flex-row justify-between items-center mt-10 lg:mt-24">

             <div class="flex gap-2 md:gap-4">
                <div> 
                <img src="${element?.author?.img}" class="w-[50px] rounded-full" alt="no image found"> </div>
                <div> 
                <h2 > ${element?.author?.name ? element.author.name : 'Unknown'} </h2>
                <h2> ${element?.author?.published_date} </h2>
                </div>
            </div>

            <div class="flex gap-2">
               <div> <i class="fa-solid fa-eye"> </i> </div>
               <div> <p>${element?.total_view ? element.total_view : 'No view'}</p> </div>
            </div>

            <div class="flex gap-2">

               ${rating(element.rating.number)}

               <div> <p> ${element.rating.number}</p> </div>

            </div>

            <div>
            <div> <label onclick="details('${element?._id}')" for="my-modal" class="fa-solid fa-arrow-right cursor-pointer"></label> </div>
               </div>
            
        </div>
    </div>
        `;

        news.appendChild(createDiv);
    });

}

// modal fetch

function details(serial) {

    const url = `https://openapi.programming-hero.com/api/news/${serial}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.data[0]))
}

// modal section 

function showDetails(data) {

    const image = document.getElementById('image');

    image.setAttribute('src', `${data?.image_url}`);

    const title = document.getElementById('title');

    title.innerText = data.title

    const detailsNews = document.getElementById('detailsNews');

    detailsNews.innerText = data.details;

    const isTrend = document.getElementById('isTrend');

    const author = document.getElementById('author');

    const createElements = document.getElementById('div');

    author.innerHTML = `

    <div>

    <p class="mt-4 mb-2 font-bold"> Author</p>

    <img src="${data?.author?.img}" class="w-[50px] rounded-full" alt="no image found">

    <h2 > ${data?.author?.name ? data.author.name : 'Unknown'} </h2>

    <h2> ${data?.author?.published_date} </h2>

    </div>

    <div>

    <p class="mt-4 mb-2 font-bold">Total Views</p>

    <div class="flex gap-3">

    <div> <i class="fa-solid fa-eye"> </i> </div>

    <div> <p>${data?.total_view ? data.total_view : 'No view'}</p> </div>

    </div>

    </div>
    `;

    data?.others_info?.is_trending ? isTrend.classList.remove('hidden') : isTrend.classList.add('hidden');

}

// function for Trending

function trending() {

    const isTrendingIs = dataForTrendPick.filter(element => element.others_info.is_trending === true);

    showCategoryNameList(isTrendingIs, categoryNameIs);

    document.getElementById('categoryName').innerText = 'Trending';

}

// function for Today's Pick

function pick() {

    const isTodaysPick = dataForTrendPick.filter(element => element.others_info.is_todays_pick === true);

    showCategoryNameList(isTodaysPick, categoryNameIs);

    document.getElementById('categoryName').innerText = "Today's Pick";

}

// function for rating

function rating(rating) {

    let ratingInnerHTML = "";

    for (let i = 0; i < Math.floor(rating); i++) {

        ratingInnerHTML += `<i class="fa-solid fa-star"> </i>`;
    }

    if (rating - Math.floor(rating) > 0) {

        ratingInnerHTML += `<i class="fa-solid fa-star-half"> </i>`;
    }

    return ratingInnerHTML;
}

// select section

function changeValue() {

    if (select.value === 'Breaking News') {

        showCategory('01', select.value);

    }

    else if (select.value === 'Regular News') {

        showCategory('02', select.value);

    }

    else if (select.value === 'International News') {

        showCategory('03', select.value);

    }

    else if (select.value === 'Sports') {

        showCategory('04', select.value);

    }

    else if (select.value === 'Entertainment') {

        showCategory('05', select.value);

    }

    else if (select.value === 'Culture') {

        showCategory('06', select.value);

    }

    else if (select.value === 'Arts') {

        showCategory('07', select.value);

    }

    else if (select.value === 'All News') {

        showCategory('08', select.value);

    }
};
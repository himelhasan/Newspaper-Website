// load categories from api

const loadCategory = () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategory(data.data.news_category))
    .catch((err) => console.log(err));
};

// display categories from api
const displayCategory = (categories) => {
  const catNav = document.getElementById("cat-nav");
  for (const category of categories) {
    const li = document.createElement("li");
    li.innerHTML = `
      <li class="nav-item catNav" onclick="loadCategoryPost('${category.category_id}')">
      <a class="nav-link text-black " aria-current="page" href="#">${category.category_name}</a>
    </li>
      `;
    catNav.append(li);
  }
};

const loadCategoryPost = (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => loadPostDataFromCategory(data.data))
    .catch((err) => console.log(err));
  //spinner starts
  toggleSpinner(true);
};

const loadPostDataFromCategory = (posts) => {
  // showing number of posts in top header
  const numberOfPosts = document.getElementById("number-of-posts");
  numberOfPosts.innerText = posts.length;

  // sort by views
  // posts.sort((a, b) => b.total_view - a.total_view);
  console.log(posts);
  sortByViews(posts);

  // loading posts from api in blog post container
  const blogContainer = document.getElementById("blog-container");
  blogContainer.innerHTML = "";
  for (const post of posts) {
    // console.log(post.title);
    const div = document.createElement("div");
    div.classList.add("col-md-6");
    div.innerHTML = `
    <div class="card mb-3" >
      <div class="row g-0" >
          <!-- blog card start -->
          <div class="col-md-4">

            <div class="bg-image " 
                style="background-image: url('${post.thumbnail_url}'); height: 100%; background-repeat: no-repeat !important;
                background-size: cover; background-position: center center;}"></div>
            </div>
            <img src="${post.thumbnail_url}" class="img-fluid d-block d-sm-block d-md-none" alt="">
            <div class="col-md-8" >
              <div class="card-body">
                <h5 class="card-title title-short">${post.title}</h5>
                <p class="card-text short">${post.details}</p>
                <p class="card-text">
                  <small class="text-muted">Last updated 3 mins ago</small>
                </p>
              </div>
              <!-- post details -->
              <div class="container text-center">
                <div class="row post-details-text">
                  <div class="col-6">
                    <div class="d-flex flex-row gap-2">
                      <div class="w-25">
                        <img class="image-fluid w-100 rounded-circle" src="${post.author.img}" alt="" />
                      </div>
                      <div class="w-75 text-start">
                       <small> <p class="text-start name"><b>${post.author.name}</b></p></small>
                       <small> <p class="">${post.author.published_date}</p></small>
                      </div>
                    </div>
                  </div>
                  <div class="col-3">
                    <p><i class="fa-regular fa-eye pe-2"></i></i>${post.total_view}</p>
                  </div>
                  <div class="col-3"><p class="star">   
                      <i class="fa-regular fa-star-half p-0 m-0 "></i>
                      <i class="fa-regular fa-star p-0 m-0 "></i>
                      <i class="fa-regular fa-star p-0 m-0 "></i>
                      <i class="fa-regular fa-star p-0 m-0 "></i>
                      <i class="fa-regular fa-star p-0 m-0 "></i>
                  
                  </p></div>
                </div>
              </div>

              
            </div>
          <!-- blog card start -->
      </div>
    </div>
  
      
      `;
    blogContainer.append(div);
  }
  //spinner ends
  toggleSpinner(false);
};

loadCategory();

// loader function for loading

const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

const sortByTitle = (post) => {
  post.sort((a, b) => a - b);
};

const sortByViews = (post) => {
  post.sort((a, b) => b.total_view - a.total_view);
};

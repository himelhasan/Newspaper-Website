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

  categories.forEach((category) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <li class="nav-item catNav" onclick="loadCategoryPost('${category.category_id}')">
        <a class="nav-link text-black " aria-current="page" href="#">${category.category_name}</a>
      </li>
      `;
    catNav.append(li);
  });
};

const loadCategoryPost = (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => loadPostDataFromCategory(data.data))
    .catch((err) => console.log(err));
  //spinner starts
  const blogContainer = document.getElementById("blog-container");
  blogContainer.innerHTML = "";
  toggleSpinner(true);
};

const loadPostDataFromCategory = (posts) => {
  // showing number of posts in top header
  const numberOfPosts = document.getElementById("number-of-posts");
  numberOfPosts.innerText = posts.length;
  sortByViews(posts);

  // loading posts from api in blog post container
  const blogContainer = document.getElementById("blog-container");
  blogContainer.innerHTML = "";
  for (const post of posts) {
    console.log(post._id);
    const div = document.createElement("div");
    div.classList.add("col-md-6");
    div.innerHTML = `
   
    
    <div class="card mb-3" onclick="generatePostId('${post._id}')"
     >

      <div class="row g-0" >
          <!-- blog card start -->
          <div class="col-md-4">

            <div class="bg-image " 
                style="background-image: url('${
                  post.thumbnail_url
                }'); height: 100%; background-repeat: no-repeat !important;
                background-size: cover; background-position: center center;}"></div>
            </div>
            <img src="${
              post.thumbnail_url
            }" class="img-fluid d-block d-sm-block d-md-none" alt="">
            <div class="col-md-8" >
              <div class="card-body">
                <h5 class="card-title title-short">${post.title}</h5>
                <p class="card-text short">${post.details} </p>
                <p class="card-text">
                  <small class="text-muted">
                  
                  <button type="button" class="read-more" data-bs-toggle="modal" data-bs-target='#exampleModal' >
                  Read More
                  </button>
                  </small>
                </p>
              </div>
              <!-- post details -->
              <div class="container text-center">
                <div class="row post-details-text">
                  <div class="col-6">
                    <div class="d-flex flex-row gap-2">
                      <div class="w-25">
                        <img class="image-fluid w-100 rounded-circle" src="${
                          post.author.img
                        }" alt="" />
                      </div>
                      <div class="w-75 text-start">
                       <small> <p class="text-start name"><b>${
                         post.author.name ? post.author.name : "No Data"
                       }</b></p></small>
                       <small> <p class="">${post.author.published_date}</p></small>
                      </div>
                    </div>
                  </div>
                  <div class="col-3">
                    <p><i class="fa-regular fa-eye pe-2"></i></i>${
                      post.total_view ? post.total_view : "No data"
                    }</p>
                  </div>
                  <div class="col-3"><p class="star">  
                  <i class="fa-solid fa-star-half-stroke"></i> 
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  
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

// show Blog Post details

const generatePostId = (postId) => {
  console.log(postId);
  url = `https://openapi.programming-hero.com/api/news/${postId}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => showBlogPostDetails(data.data, postId))
    .catch((err) => console.log(err));
};

const showBlogPostDetails = (url, postId) => {
  const exampleModalLabel = document.getElementById("exampleModalLabel");
  exampleModalLabel.innerText = `${url[0].title}`;
  const blogImage = (document.getElementById("blog-image").src = `${url[0].image_url}`);

  const blogDescription = document.getElementById("blog-description");
  blogDescription.innerText = `${url[0].details}`;

  // ${url[0].image_url}
  // ${url[0].details}
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

const loadDefaultPosts = (durl) => {
  fetch(durl)
    .then((res) => res.json())
    .then((data) => defaultPostsToShow(data.data))
    .catch((err) => console.log(err));
};
const durl = "https://openapi.programming-hero.com/api/news/category/08";
loadDefaultPosts(durl);

const defaultPostsToShow = (posts) => {
  // showing number of posts in top header
  const numberOfPosts = document.getElementById("number-of-posts");
  numberOfPosts.innerText = posts.length;
  sortByViews(posts);

  // loading posts from api in blog post container
  const blogContainer = document.getElementById("blog-container");
  blogContainer.innerHTML = "";
  for (const post of posts) {
    console.log(post._id);
    const div = document.createElement("div");
    div.classList.add("col-md-6");
    div.innerHTML = `
   
    
    <div class="card mb-3" onclick="generatePostId('${post._id}')"
     >

      <div class="row g-0" >
          <!-- blog card start -->
          <div class="col-md-4">

            <div class="bg-image " 
                style="background-image: url('${
                  post.thumbnail_url
                }'); height: 100%; background-repeat: no-repeat !important;
                background-size: cover; background-position: center center;}"></div>
            </div>
            <img src="${
              post.thumbnail_url
            }" class="img-fluid d-block d-sm-block d-md-none" alt="">
            <div class="col-md-8" >
              <div class="card-body">
                <h5 class="card-title title-short">${post.title}</h5>
                <p class="card-text short">${post.details} </p>
                <p class="card-text">
                  <small class="text-muted">
                  
                  <button type="button" class="read-more" data-bs-toggle="modal" data-bs-target='#exampleModal' >
                  Read More
                  </button>
                  </small>
                </p>
              </div>
              <!-- post details -->
              <div class="container text-center">
                <div class="row post-details-text">
                  <div class="col-6">
                    <div class="d-flex flex-row gap-2">
                      <div class="w-25">
                        <img class="image-fluid w-100 rounded-circle" src="${
                          post.author.img
                        }" alt="" />
                      </div>
                      <div class="w-75 text-start">
                       <small> <p class="text-start name"><b>${
                         post.author.name ? post.author.name : "No Data"
                       }</b></p></small>
                       <small> <p class="">${post.author.published_date}</p></small>
                      </div>
                    </div>
                  </div>
                  <div class="col-3">
                    <p><i class="fa-regular fa-eye pe-2"></i></i>${
                      post.total_view ? post.total_view : "No data"
                    }</p>
                  </div>
                  <div class="col-3"><p class="star">  
                  <i class="fa-solid fa-star-half-stroke"></i> 
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  
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

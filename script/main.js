console.log("https://openapi.programming-hero.com/api/news/categories");

const loadCategory = () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategory(data.data.news_category));
};

const displayCategory = (categories) => {
  console.log(categories);
  const catNav = document.getElementById("cat-nav");
  for (const category of categories) {
    console.log(category.category_name);
    const li = document.createElement("li");
    li.innerHTML = `
      <li class="nav-item catNav" onclick="loadCategoryPost(${category.category_id})">
      <a class="nav-link text-black " aria-current="page" href="#">${category.category_name}</a>
    </li>
      `;
    catNav.append(li);
  }
};

const loadCategoryPost = (id) => {
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  console.log(url);
};

loadCategory();

//  onclick="loadCategoryPost("${category.category_name}")"

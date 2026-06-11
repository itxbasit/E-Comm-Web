let list = document.getElementById("list");
let pagination = document.getElementById("pagination");

async function fetchApi(skip = 0, limit = 15) {
  try {
    let response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
    );
    let data = await response.json();
    fetchProducts(data);
    flag = true;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

function createPagination(totalPage, skip, currPage) {
  let paginationHTML =
    skip == 0
      ? `<li>
      <a  class="flex items-center justify-center text-gray-300 border border-gray-300 hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-s-base text-sm w-9 h-9 focus:outline-none">
        <span class="sr-only">Previous</span>
        <svg class="w-4 h-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/></svg>
      </a>
    </li>`
      : `<li onclick="fetchApi(${skip - 15})">
      <a  class="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-s-base text-sm w-9 h-9 focus:outline-none">
        <span class="sr-only">Previous</span>
        <svg class="w-4 h-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/></svg>
      </a>
    </li>`;

  for (let i = 1; i <= totalPage; i++) {
    paginationHTML += `<li onclick="fetchApi(${(i - 1) * 15})">
        <a class="flex items-center justify-center ${
          currPage == i ? "bg-green-400 text-white" : "text-gray-300"
        }  box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium text-sm w-9 h-9 focus:outline-none">${i}</a>
      </li>`;
  }

  paginationHTML +=
    currPage == totalPage
      ? `<li>
      <a  class="flex items-center justify-center text-body bg-neutral-secondary-medium text-gray-300 border border-gray-300 border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-e-base text-sm w-9 h-9 focus:outline-none">
        <span class="sr-only">Next</span>
        <svg class="w-4 h-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/></svg>
      </a>
    </li>`
      : `<li>
      <a onclick="fetchApi(${skip + 15})" class="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-e-base text-sm w-9 h-9 focus:outline-none">
        <span class="sr-only">Next</span>
        <svg class="w-4 h-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/></svg>
      </a>
    </li>`;
  pagination.innerHTML = paginationHTML;
}

function fetchProducts(data) {
  let totalPage = Math.ceil(data.total / 15);
  let currPage = data.skip / 15 + 1;
  createPagination(totalPage, data.skip, currPage);
  list.innerHTML = "";
  data.products.forEach((product) => {
    list.innerHTML += `<div onclick="window.location.href='detail.html?productId=${product.id}&title=${product.title}'"
        class="bg-neutral-primary-soft block w-full lg:max-w-sm p-6 border-0 rounded-2xl shadow-xl"
      >
        <a href="#">
          <img
            class="rounded-base"
            src=${product?.thumbnail}
            alt=""
          />
        </a>
        <a href="#">
          <h5
            class="mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading"
          >
            ${product.title}
          </h5>
        </a>
        <p class="mb-6 text-body">
        ${product.description}
        </p>
         <p class="mb-6 text-body">
        <span class="line-through">RS. ${product.price}</span>
        RS. ${(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}

        </p>
        <a
          href="#"
          class="inline-flex items-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          Detail
          <svg
            class="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </a>
      </div>`;
  });
}

fetchApi();


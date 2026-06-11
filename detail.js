let params = new URLSearchParams(window.location.search).get("productId");
let detail = document.getElementById("detail");
async function fetchApi() {
  try {
    let response = await fetch(`https://dummyjson.com/products/${params}`);
    let data = await response.json();
    renderData(data);
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

let renderData = (data) => {
  detail.innerHTML = `
  <div class="max-w-full mx-auto px-4 lg:px-12 py-8">
    <div class="grid lg:grid-cols-2 gap-10">

      <!-- Product Image -->
      <div>
        <img
          src="${data.thumbnail}"
          alt="${data.title}"
          class="w-full rounded-2xl shadow-xl"
        />

        <div class="flex gap-3 mt-4">
          ${data.images
            .map(
              (img) => `
              <img
                src="${img}"
                class="w-20 h-20 object-cover border rounded shadow cursor-pointer"
              />
            `,
            )
            .join("")}
        </div>
      </div>

      <!-- Product Info -->
      <div>
        <span class="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
          ${data.availabilityStatus}
        </span>

        <h1 class="text-4xl font-bold mt-4">${data.title}</h1>

        <div class="flex items-center gap-4 mt-3">
          <span class="text-gray-600">Brand: ${data.brand}</span>
          <span class="text-gray-600">Category: ${data.category}</span>
        </div>

        <!-- Rating -->
        <div class="flex items-center mt-4">
          <span class="ml-2 text-gray-600">⭐ ${data.rating}</span>
        </div>

        <!-- Price -->
        <div class="mt-6 flex items-center gap-4">
          <h2 class="text-4xl font-bold text-green-600">$${data.price}</h2>

          <span class="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
            ${data.discountPercentage}% OFF
          </span>
        </div>

        <!-- Description -->
        <div class="mt-6">
          <h3 class="font-semibold text-lg mb-2">Description</h3>
          <p class="text-gray-600 leading-relaxed">
            ${data.description}
          </p>
        </div>

        <!-- Product Details -->
        <div class="grid grid-cols-2 gap-4 mt-8">
          <div class="border rounded-lg p-4">
            <h4 class="font-semibold">SKU</h4>
            <p class="text-gray-600">${data.sku}</p>
          </div>

          <div class="border rounded-lg p-4">
            <h4 class="font-semibold">Stock</h4>
            <p class="text-gray-600">${data.stock} Units</p>
          </div>

          <div class="border rounded-lg p-4">
            <h4 class="font-semibold">Weight</h4>
            <p class="text-gray-600">${data.weight} kg</p>
          </div>

          <div class="border rounded-lg p-4">
            <h4 class="font-semibold">Min Order</h4>
            <p class="text-gray-600">${data.minimumOrderQuantity} Units</p>
          </div>
        </div>

        <!-- Dimensions -->
        <div class="mt-6 border rounded-lg p-4">
          <h4 class="font-semibold mb-2">Dimensions</h4>

          <p class="text-gray-600">Width: ${data.dimensions.width} cm</p>
          <p class="text-gray-600">Height: ${data.dimensions.height} cm</p>
          <p class="text-gray-600">Depth: ${data.dimensions.depth} cm</p>
        </div>

        <!-- Shipping Info -->
        <div class="mt-6 space-y-2">
          <div class="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            🚚 ${data.shippingInformation}
          </div>

          <div class="bg-green-50 border border-green-200 p-4 rounded-lg">
            🛡️ ${data.warrantyInformation}
          </div>

          <div class="bg-red-50 border border-red-200 p-4 rounded-lg">
            🔄 ${data.returnPolicy}
          </div>
        </div>

        <!-- Tags -->
        <div class="mt-6">
          <h4 class="font-semibold mb-3">Tags</h4>

          <div class="flex gap-2 flex-wrap">
            ${data.tags
              .map(
                (tag) => `
                <span class="bg-gray-100 px-3 py-1 rounded-full">
                  ${tag}
                </span>
              `,
              )
              .join("")}
          </div>
        </div>
        <!-- Quantity & Cart -->
<div class="mt-8 flex flex-wrap items-center gap-4">

  <div class="flex items-center border rounded-lg overflow-hidden">
    <button class="w-12 h-12 bg-gray-100 hover:bg-gray-200 text-xl font-bold">
      -
    </button>

    <input
      type="text"
      value="1"
      class="w-16 text-center outline-none"
      readonly
    />

    <button class="w-12 h-12 bg-gray-100 hover:bg-gray-200 text-xl font-bold">
      +
    </button>
  </div>

  <button
    class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2"
  >
    🛒 Add To Cart
  </button>

  <button
    class="border border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-lg font-semibold transition"
  >
    Buy Now
  </button>

</div>
      </div>
    </div>

    <!-- Reviews -->
    <div class="mt-16">
      <h2 class="text-3xl font-bold mb-6">Customer Reviews</h2>

      <div class="space-y-4">
        ${data.reviews
          .map(
            (review) => `
            <div class="border rounded-lg p-5">
              <div class="flex justify-between">
                <h4 class="font-semibold">${review.reviewerName}</h4>
                <span class="text-yellow-500">
                  ⭐ ${review.rating}
                </span>
              </div>

              <p class="text-gray-600 mt-2">
                ${review.comment}
              </p>
            </div>
          `,
          )
          .join("")}
      </div>
    </div>
  </div>`;
};

fetchApi();

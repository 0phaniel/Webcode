/** @format */
url = "https://makeup-api.herokuapp.com/api/v1/products.json";
let title = document.createElement("h1");
title.innerText = "Makeup API Products Application";
title.classList.add("title");
document.body.append(title);
let productTab = document.createElement("div");
productTab.innerText = "Products are loading .....";
productTab.style.color = "white";
document.body.append(productTab);
productTab.classList.add("productType");
let productCount = document.createElement("div");
productCount.classList.add("productCount");
document.body.append(productCount);
productCount.innerText = "Number of selected product available";
let output = document.createElement("div");
let strong = document.createElement("strong");
output.classList.add("output");

document.body.append(output);
output.innerHTML = `
      <div class="outputLeft" ></div >
      <div class="outputRight"></div>`;
outputLeft = document.querySelector(".outputLeft");
outputRight = document.querySelector(".outputRight");
outputLeft.innerHTML = `<h2>Loading the Makeup Products</h2>`;
outputLeft.classList.add("outputLeft");
outputRight.classList.add("outputRight");
outputRight.innerHTML = `<h2>Product Description Area</h2>
<h6>Click On Read Description to view the details</h6>`;
document.addEventListener("DOMContentLoaded", fetchMakeup(url));
async function fetchMakeup(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    processAPI(data);
  } catch (err) {
    alert(err.message);
  }
}

function processAPI(data) {
  outputLeft.innerHTML = `<h2>Select the Product from the List Given Above</h2>`;
  let product_type = [];
  data.forEach((item) => {
    product_type.push(item.product_type);
    product_type = [...new Set(product_type)].sort();
    console.log(product_type);
    productTab.innerHTML = `<h2 style="color : bisque">Products</h2>`;
    product_type.forEach((type) => {
      productTab.innerHTML += `<button class="btn btn-primary" id="${type}">${type}</button>`;
    });
  });
  globalEventListener(data);
}

function globalEventListener(data) {
  let buttons = productTab.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      let result = data.filter((x) => x.product_type === button.innerText);
      console.log(result);
      outputLeft.innerHTML = "";
      result.forEach((item) => {
        productCount.innerHTML = `<p class="count">${result.length} <span style="color : #333333">${item.product_type}</span> products were found</p>`;
        outputRight.innerHTML = "";
        let box = document.createElement("div");
        box.classList.add("box");
        let boxLeft = document.createElement("div");
        boxLeft.classList.add("boxLeft");
        let boxRight = document.createElement("div");
        boxRight.classList.add("boxRight");
        box.append(boxLeft);
        box.append(boxRight);
        outputLeft.append(box);
        let brand = document.createElement("p");
        brand.innerHTML = `<strong>Brand</strong> : ${item.brand}`;
        boxLeft.appendChild(brand);
        let product = document.createElement("p");
        product.innerHTML = `<strong>Product Name</strong> : ${item.name}`;
        boxLeft.appendChild(product);
        let price = document.createElement("p");
        price.innerHTML = `<strong>Price</strong> : ${item.price} ${item.price_sign}`;
        boxLeft.appendChild(price);
        let link = document.createElement("p");
        link.innerHTML = `<a href="${item.product_link}" target="_blank">Buy ${item.name}</a>`;
        boxLeft.appendChild(link);
        let readDescription = document.createElement("p");
        readDescription.innerHTML = `<strong>Read Description</strong>`;
        readDescription.classList.add("readDescription");
        boxLeft.appendChild(readDescription);
        let describe = document.createElement("p");
        describe.innerHTML = `<p><strong>Product Name</strong> : ${item.name}</p><strong>Description :</strong> ${item.description}`;
        describe.classList.add("describe");
        boxLeft.appendChild(describe);
        outputRight.innerHTML = `<h2>Product Description Area</h2>
        <h6>Click On Read Description to view the details</h6>`;
        let product_image = document.createElement("img");
        product_image.src = `${item.image_link}`;
        boxRight.appendChild(product_image);
        readDescription.addEventListener("click", function () {
          outputRight.innerHTML = describe.innerHTML;
        });
      });
    });
  });
}

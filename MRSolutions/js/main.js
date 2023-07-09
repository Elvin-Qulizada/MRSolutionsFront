const queryStr = window.location.search;
const params = new URLSearchParams(queryStr);
const id = params.get('id');
const page = params.get('page') != null ? params.get('page') : 1;
fetch("https://localhost:7255/api/Setting")
    .then(res => res.json())
    .then(data => data.forEach(element => {
        if (document.getElementById(`${element.key}`)) {
            if (element.key.substring(element.key.length - 3, element.key.length) == "Url") {
                document.getElementById(`${element.key}`).href = element.value;
            } else if (element.key == "phoneNumber") {
                document.querySelector(`.text #${element.key}`).href = "tel:" + element.value;
                document.querySelector(`.text #${element.key}`).innerHTML = element.value;

                document.querySelector(`li p #${element.key}`).href = "tel:" + element.value;
                document.querySelector(`li p #${element.key}`).innerHTML = element.value;
            } else if (element.key == "email") {
                document.querySelector(`.text #${element.key}`).href = "mailto:" + element.value;
                document.querySelector(`.text #${element.key}`).innerHTML = element.value;

                document.querySelector(`li p #${element.key}`).href = "mailto:" + element.value;
                document.querySelector(`li p #${element.key}`).innerHTML = element.value;
            }
            else {
                document.getElementById(`${element.key}`).innerHTML = element.value;
            }
        }
    }))
if (document.getElementById("brands-slider")) {
    fetch("https://localhost:7255/api/Brand")
        .then(res => res.json())
        .then(data => {
            let ul = `<ul class="brand-items-carousel owl-carousel owl-theme">`;
            data.forEach(element => {
                ul +=
                    `
                <li class="single-brand-item wow fadeInUp" data-wow-delay="0ms" data-wow-duration="400ms">
                    <a href="#"><img src="./uploads/brands/${element.name}/${element.imageUrl}" alt="Awesome Brand Image"></a>
                    <div class="overlay-content">
                        <p>${element.name}</p>
                    </div>
                </li>
            `
            })
            ul += "\n</ul>"
            console.log(ul);
            document.getElementById("brands-slider").innerHTML += ul;
        }).then(function () {
            window.dispatchEvent(new Event('resize'));
        })
}

if (document.getElementById("shop-section")) {
    fetch(`https://localhost:7255/api/Category`)
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                document.getElementById("category-filter").innerHTML +=
                    `
                <option value="${element.id}">${element.name}</option>
                `
            })
        })
    fetch(`https://localhost:7255/api/Product/${page}`)
        .then(res => res.json())
        .then(data => {
            data.products.forEach(element => {
                document.getElementById("shop-section").innerHTML +=
                    `
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                <a class="d-block" href="shop-single.html?id=${element.id}">
                    <div class="single-product-item text-center">
                        <div class="img-holder">
                            <img src="./uploads/products/${element.name}/${element.imageUrl}"
                                alt="Awesome Product Image">
                        </div>
                        <div class="title-holder text-center">
                            <div class="static-content">
                                        <h3 class="title text-center"><a href="shop-single.html?id=${element.id}">${element.name}</a></h3>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            `
            });
            if (data.productCount > 8) {
                let pagination = document.getElementById("pagination");
                for (let i = 1; i <= Math.ceil(data.productCount / 8); i++) {
                    if (page == i) {
                        pagination.innerHTML += `<li class="active"><a href="./shop.html?page=${i}">${i}</a></li>`
                    } else {
                        pagination.innerHTML += `<li><a href="./shop.html?page=${i}">${i}</a></li>`
                    }
                }
            }
        })
}
function filterByCategory(par) {
    fetch(`https://localhost:7255/api/Product/${page}`)
        .then(res => res.json())
        .then(data => {
            let arr = par == "" ? data.products : data.products.filter(p => p.categoryId == par)
            document.getElementById("shop-section").innerHTML = ``;
            arr.forEach(element => {
                document.getElementById("shop-section").innerHTML +=
                    `
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                <a class="d-block" href="shop-single.html?id=${element.id}">
                    <div class="single-product-item text-center">
                        <div class="img-holder">
                            <img src="./uploads/products/${element.name}/${element.imageUrl}"
                                alt="Awesome Product Image">
                        </div>
                        <div class="title-holder text-center">
                            <div class="static-content">
                                        <h3 class="title text-center"><a href="shop-single.html?id=${element.id}">${element.name}</a></h3>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            `
            });
            if (arr.length > 8) {
                let pagination = document.getElementById("pagination");
                for (let i = 1; i <= Math.ceil(data.productCount / 8); i++) {
                    if (page == i) {
                        pagination.innerHTML += `<li class="active"><a href="./shop.html?page=${i}">${i}</a></li>`
                    } else {
                        pagination.innerHTML += `<li><a href="./shop.html?page=${i}">${i}</a></li>`
                    }
                }
            } else {
                document.getElementById("pagination").innerHTML = ``
            }
        })
}
if (document.querySelector(".single-shop-area")) {

    let categoryId;
    fetch(`https://localhost:7255/api/Product/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            document.getElementById("name").innerText = data.name
            document.getElementById("headerText").innerText = data.headerText
            document.getElementById("description").innerText = data.description
            document.getElementById("image").src += data.name + "/" + data.imageUrl
            document.getElementById("video").innerHTML +=
                `
                <video autoplay="" muted="" loop="">
                    <source
                        src="./uploads/products/${data.name}/${data.videoUrl}"
                        type="video/mp4">
                </video>
            `
            categoryId = data.categoryId;
        })
    fetch(`https://localhost:7255/api/Product/${id}/related`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            data.forEach(element => {
                document.getElementById("related-products").innerHTML +=
                    `
                <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                    <div class="single-product-item text-center">
                        <div class="img-holder">
                            <img src="./uploads/products/${element.name}/${element.imageUrl}" alt="Awesome Product Image">
                        </div>
                        <div class="title-holder text-center">
                            <div class="static-content">
                                <h3 class="title text-center"><a href="shop-single.html?id=${element.id}">${element.name}</a></h3>
                            </div>
                        </div>
                    </div>
                </div>
                `
            });
        })
}
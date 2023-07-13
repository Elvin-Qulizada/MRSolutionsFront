const queryStr = window.location.search;
const params = new URLSearchParams(queryStr);
const id = params.get('id');
const page = params.get('page') != null ? params.get('page') : 1;
const category = params.get('category') != null ? params.get('category') : null;
fetch("https://localhost:7255/api/Setting")
    .then(res => res.json())
    .then(data => {
        if (document.getElementById("headerCity")) document.getElementById("headerCity").innerHTML = data.find(d => d.key == "city").value
        document.getElementById("footerCity").innerHTML = data.find(d => d.key == "city").value

        if (document.getElementById("headerAddress")) document.getElementById("headerAddress").innerHTML = data.find(d => d.key == "address").value
        document.getElementById("footerAddress").innerHTML = data.find(d => d.key == "address").value

        if (document.getElementById("headerPhoneNumber")) document.getElementById("headerPhoneNumber").innerHTML = data.find(d => d.key == "phoneNumber").value
        if (document.getElementById("headerPhoneNumber")) document.getElementById("headerPhoneNumber").href = "tel:" + data.find(d => d.key == "phoneNumber").value
        document.getElementById("footerPhoneNumber").innerHTML = data.find(d => d.key == "phoneNumber").value
        document.getElementById("footerPhoneNumber").href = "tel:" + data.find(d => d.key == "phoneNumber").value

        if (document.getElementById("headerEmail")) document.getElementById("headerEmail").innerHTML = data.find(d => d.key == "email").value
        if (document.getElementById("headerEmail")) document.getElementById("headerEmail").href = "mailto:" + data.find(d => d.key == "email").value
        document.getElementById("footerEmail").innerHTML = data.find(d => d.key == "email").value
        document.getElementById("footerEmail").href = "mailto:" + data.find(d => d.key == "email").value

        if (document.getElementById("facebookUrl")) document.getElementById("facebookUrl").href = data.find(d => d.key == "facebookUrl").value
        if (document.getElementById("instagramUrl")) document.getElementById("instagramUrl").href = data.find(d => d.key == "instagramUrl").value
        if (document.getElementById("linkedinUrl")) document.getElementById("linkedinUrl").href = data.find(d => d.key == "linkedinUrl").value
    })
if (document.querySelector(".main-slider")) {
    fetch("https://localhost:7255/api/Slider")
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                document.querySelector(".main-slider").innerHTML +=
                    `
                <div style="cursor:grab;;height: 90vh; background-image: url(./uploads/sliders/${element.title.split(' ')[0]}/${element.imageUrl});background-position: center;background-attachment: fixed;background-repeat: no-repeat;"
                    class="swiper-slide slide-content d-flex flex-column justify-content-center align-items-center gap-5">
                    <div class="big-title">${element.title}</div>
                    <div class="text">${element.description}</div>
                    <div class="btn-box">
                        <a class="btn-one" href="${element.redirectUrl}">${element.buttonText}<span class="flaticon-next"></span></a>
                    </div>
                </div>
              `
            });
        })
}
if (document.getElementById("brands-slider")) {
    fetch("https://localhost:7255/api/Brand")
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                $('#brands-slider').trigger('add.owl.carousel',
                    [`
                <li class="single-brand-item wow fadeInUp" data-wow-delay="0ms" data-wow-duration="400ms">
                    <a href="#"><img src="./uploads/brands/${element.name}/${element.imageUrl}" alt="Awesome Brand Image"></a>
                    <div class="overlay-content">
                        <p>${element.name}</p>
                    </div>
                </li>
                    `])
                    .trigger('refresh.owl.carousel');
            });
        })
}
if (document.getElementById("services")) {
    fetch("https://localhost:7255/api/Service")
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                document.getElementById("services").innerHTML +=
                    `
                <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                        <div class="single-service-style2 wow fadeInUp" data-wow-delay="200ms"
                            data-wow-duration="1200ms">
                            <div class="img-holder">
                                <img src="./uploads/services/${element.name}/${element.posterImageUrl}" alt="Awesome Image">
                                <div class="overlay-style-two"></div>
                            </div>
                            <div class="text-holder">
                                <div class="icon-holder">
                                    <span class="icon-cupboard"></span>
                                </div>
                                <div class="inner">
                                    <h3>${element.name}</h3>
                                    <div class="text">
                                        <p>${element.headerText}
                                        </p>
                                    </div>
                                    <div class="read-more">
                                        <a class="btn-one" href="services-single.html?id=${element.id}">Daha Çox<span
                                                class="flaticon-next"></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            })
        })
}
if (document.querySelector(".single-service-area")) {
    fetch("https://localhost:7255/api/Service/")
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                if (element.id == id) {
                    document.querySelector(".service-pages").innerHTML +=
                        `
                    <li class="active">
                        <a href="./services-single.html?id=${element.id}">
                            <div class="title">
                                <h3 class="static">${element.name}</h3>
                                <div class="overlay-title">
                                    <h3>${element.name}</h3>
                                </div>
                            </div>
                        </a>
                    </li>
                    `
                } else {
                    document.querySelector(".service-pages").innerHTML +=
                        `
                    <li>
                        <a href="./services-single.html?id=${element.id}">
                            <div class="title">
                                <h3 class="static">${element.name}</h3>
                                <div class="overlay-title">
                                    <h3>${element.name}</h3>
                                </div>
                            </div>
                        </a>
                    </li>
                    `
                }
            });
        })
    fetch(`https://localhost:7255/api/Service/${id}`)
        .then(res => res.json())
        .then(data => {
            document.title = data.name;
            document.getElementById("headerName").innerHTML = data.name;
            document.getElementById("headerCrumb").innerHTML = data.name;
            document.getElementById("name").innerHTML = data.name;
            document.getElementById("description").innerHTML = data.description;
            document.getElementById("image").src += data.name + "/" + data.imageUrl;
        })
}

if (document.getElementById("shop-section")) {
    fetch(`https://localhost:7255/api/Category`)
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                document.getElementById("category-filter").innerHTML +=
                    `
                <option value="${element.name}">${element.name}</option>
                `
            })
        })
    fetch(`https://localhost:7255/api/Product/${category}/${page}`)
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
                        pagination.innerHTML += `<li class="active"><a href="./shop.html?category=${category}&page=${i}">${i}</a></li>`
                    } else {
                        pagination.innerHTML += `<li><a href="./shop.html?category=${category}&page=${i}">${i}</a></li>`
                    }
                }
            }
        })
}
function filterByCategory(par) {
    window.location.href = `./shop.html?category=${par}`
}
if (document.querySelector(".single-shop-area")) {

    let categoryId;
    fetch(`https://localhost:7255/api/Product/${id}`)
        .then(res => res.json())
        .then(data => {
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

if (document.getElementById("projects")) {
    fetch(`https://localhost:7255/api/Project`)
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                document.getElementById("projects").innerHTML +=
                    `
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 pd0 filter-item contem ret">
                    <div class="single-project-style8">
                        <div class="img-holder">
                            <img src="./uploads/projects/${element.name}/${element.posterImageUrl}" alt="Awesome Image">
                            <div class="overlay-content">
                                <div class="inner-content">
                                    <div class="title-box">
                                    <h3><a href="project-single.html?id=${element.id}">${element.name}</a></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `
            });
        })
}
if (document.getElementById("single-project")) {
    fetch(`https://localhost:7255/api/Project/${id}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("posterImage").src += data.name + "/" + data.posterImageUrl
            document.getElementById("image").src += data.name + "/" + data.imageUrl
            document.getElementById("title").innerHTML = data.name
            document.getElementById("description").innerHTML = data.description
            document.getElementById("location").innerHTML = data.location
            document.getElementById("area").innerHTML = `${data.area}m<sup>2</sup>`
            document.getElementById("date").innerHTML = data.date.substring(0, 4)
        })
    fetch(`https://localhost:7255/api/Project/${id}/related`)
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                document.getElementById("related_projects").innerHTML+=
                `
                <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div class="single-similar-project">
                        <div class="img-holder">
                            <img src="./uploads/projects/${element.name}/${element.posterImageUrl}" alt="Awesome Image">
                        </div>
                        <div class="title-holder">
                            <h3><a href="./project-single.html?id=${element.id}">${element.name}</a></h3>
                        </div>
                    </div>
                </div>
                `
            });
        })
}
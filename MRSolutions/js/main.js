let shopSection = document.querySelector("#shop-section");
fetch("https://localhost:7255/api/Product")
    .then(response => response.json())
    .then(data => data.forEach(element => {
        shopSection.innerHTML += `
    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                                    <a class="d-block" href="shop-single.html">
                                        <div class="single-product-item text-center">
                                            <div class="img-holder">
                                                <img src="images/shop/Shelly_Plus1PM_x1-210x210.png"
                                                    alt="Awesome Product Image">
                                            </div>
                                            <div class="title-holder text-center">
                                                <div class="static-content">
                                                    <h3 class="title text-center"><a href="shop-single.html">${element.name}</a></h3>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
    `
    }))
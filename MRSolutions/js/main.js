const queryStr = window.location.search;
const params = new URLSearchParams(queryStr);
const id = params.get('id');
const page = params.get('page') != null ? params.get('page') : 1;
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
        // if (document.getElementById(`${element.key}`)) {
        //     if (element.key.substring(element.key.length - 3, element.key.length) == "Url") {
        //         document.getElementById(`${element.key}`).href = element.value;
        //     } else if (element.key == "phoneNumber") {
        //         document.querySelector(`.text #${element.key}`).href = "tel:" + element.value;
        //         document.querySelector(`.text #${element.key}`).innerHTML = element.value;

        //         document.querySelector(`li p #${element.key}`).href = "tel:" + element.value;
        //         document.querySelector(`li p #${element.key}`).innerHTML = element.value;
        //     } else if (element.key == "email") {
        //         document.querySelector(`.text #${element.key}`).href = "mailto:" + element.value;
        //         document.querySelector(`.text #${element.key}`).innerHTML = element.value;

        //         document.querySelector(`li p #${element.key}`).href = "mailto:" + element.value;
        //         document.querySelector(`li p #${element.key}`).innerHTML = element.value;
        //     }
        //     else {
        //         document.getElementById(`${element.key}`).innerHTML = element.value;
        //     }
        // }
    })
// if (document.querySelector(".main-slider")) {
//     //Fetch data from the server (example data)
//     const sliderData = [
//         {
//             imageUrl: "images/slides/shelly.jpg",
//             description: "Slide Description 1",
//             title: "Slide Title 1",
//             buttonText: "Button Text 1",
//             redirectUrl: "#"
//         },
//         {
//             imageUrl: "839cdf7f-ef36-45cd-8000-3b66e974582bshelly.jpg",
//             description: "Slide Description 2",
//             title: "Slide Title 2",
//             buttonText: "Button Text 2",
//             redirectUrl: "#"
//         }
//     ];
//     // const sliderData = fetch("https://localhost:7255/api/Slider")
//     // .then(res => res.json())
//     // .then(data => data)
//     // Dynamically generate the slider markup
//     const sliderMarkup = sliderData.map(slide => `
//     <li data-description="${slide.description}" data-easein="default" data-easeout="default"
//       data-fsmasterspeed="1500" data-fsslotamount="7" data-fstransition="fade"
//       data-hideafterloop="0" data-hideslideonmobile="off" data-masterspeed="default"
//       data-param1="" data-param10="" data-param2="" data-param3="" data-param4=""
//       data-param5="" data-param6="" data-param7="" data-param8="" data-param9=""
//       data-rotate="0" data-saveperformance="off" data-slotamount="default"
//       data-thumb="./uploads/sliders/${slide.title}/${slide.imageUrl}" data-title="${slide.title}" data-transition="parallaxvertical">

//       <img alt="" class="rev-slidebg" data-bgfit="cover" data-bgparallax="10"
//         data-bgposition="center center" data-bgrepeat="no-repeat" data-no-retina=""
//         src="./uploads/sliders/${slide.title}/${slide.imageUrl}">

//       <div class="tp-caption" data-paddingbottom="[0,0,0,0]" data-paddingleft="[0,0,0,0]"
//         data-paddingright="[0,0,0,0]" data-paddingtop="[0,0,0,0]" data-responsive_offset="on"
//         data-type="text" data-height="none" data-width="['800','800','700','500']"
//         data-whitespace="normal" data-hoffset="['15','15','15','15']"
//         data-voffset="['-160','-100','-110','-105']" data-x="['left','left','left','left']"
//         data-y="['middle','middle','middle','middle']" data-textalign="['top','top','top','top']"
//         data-frames='[{"from":"y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;",
//           "mask":"x:0px;y:0px;s:inherit;e:inherit;","speed":1500,"to":"o:1;",
//           "delay":1000,"ease":"Power3.easeInOut"},
//           {"delay":"wait","speed":1000,"to":"auto:auto;",
//           "mask":"x:0;y:0;s:inherit;e:inherit;","ease":"Power3.easeInOut"}]'
//         style="z-index: 7; white-space: nowrap;">
//         <div class="slide-content left-slide">
//           <div class="big-title">
//             ${slide.title}
//           </div>
//         </div>
//       </div>

//       <div class="tp-caption" data-paddingbottom="[0,0,0,0]" data-paddingleft="[0,0,0,0]"
//         data-paddingright="[0,0,0,0]" data-paddingtop="[0,0,0,0]" data-responsive_offset="on"
//         data-type="text" data-height="none" data-width="['800','800','700','500']"
//         data-whitespace="normal" data-hoffset="['15','15','15','15']"
//         data-voffset="['-75','-10','-25','-30']" data-x="['left','left','left','left']"
//         data-y="['middle','middle','middle','middle']" data-textalign="['top','top','top','top']"
//         data-frames='[{"from":"y:[-100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;",
//           "mask":"x:0px;y:0px;s:inherit;e:inherit;","speed":1500,"to":"o:1;",
//           "delay":1500,"ease":"Power3.easeInOut"},
//           {"delay":"wait","speed":1000,"to":"auto:auto;",
//           "mask":"x:0;y:0;s:inherit;e:inherit;","ease":"Power3.easeInOut"}]'
//         style="z-index: 7; white-space: nowrap;">
//         <div class="slide-content left-slide">
//           <div class="text">${slide.description}</div>
//         </div>
//       </div>

//       <div class="tp-caption" data-paddingbottom="[0,0,0,0]" data-paddingleft="[0,0,0,0]"
//         data-paddingright="[0,0,0,0]" data-paddingtop="[0,0,0,0]" data-responsive_offset="on"
//         data-type="text" data-height="none" data-width="['800','800','700','500']"
//         data-whitespace="normal" data-hoffset="['15','15','15','15']"
//         data-voffset="['25','90','100','85']" data-x="['left','left','left','left']"
//         datay="['middle','middle','middle','middle']" data-textalign="['top','top','top','top']"
//         data-frames='[{"from":"y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;",
//           "mask":"x:0px;y:0px;s:inherit;e:inherit;","speed":1500,"to":"o:1;",
//           "delay":1500,"ease":"Power3.easeInOut"},
//           {"delay":"wait","speed":1000,"to":"auto:auto;",
//           "mask":"x:0;y:0;s:inherit;e:inherit;","ease":"Power3.easeInOut"}]'
//         style="z-index: 7; white-space: nowrap;">
//         <div class="slide-content left-slide">
//           <div class="btn-box">
//             <a class="btn-one" href="${slide.redirectUrl}">${slide.buttonText}<span class="flaticon-next"></span></a>
//           </div>
//         </div>
//       </div>

//     </li>
//   `).join('');
//     console.log(sliderMarkup)
//     // Insert the generated slider markup into the container
//     document.getElementById('rev_slider_one_wrapper').innerHTML = `
//     <div class="rev_slider fullwidthabanner" id="rev_slider_one" data-version="5.4.1">
//       <ul>
//         ${sliderMarkup}
//       </ul>
//     </div>
//   `;

//     // Initialize the Revolution Slider
//     const revSlider = new RevolutionSlider('#rev_slider_one');
//     revSlider.init();
// }
// if (document.getElementById("slider")) {
// fetch("https://localhost:7255/api/Slider")
//     .then(res => res.json())
//     .then(data => {
//             data.forEach(element => {
//                 document.getElementById("slider").innerHTML+=
//                 `
//                 <li data-description="Slide Description" data-easein="default" data-easeout="default"
//                             data-fsmasterspeed="1500" data-fsslotamount="7" data-fstransition="fade"
//                             data-hideafterloop="0" data-hideslideonmobile="off" data-index="rs-1689"
//                             data-masterspeed="default" data-param1="" data-param10="" data-param2="" data-param3=""
//                             data-param4="" data-param5="" data-param6="" data-param7="" data-param8="" data-param9=""
//                             data-rotate="0" data-saveperformance="off" data-slotamount="default"
//                             data-thumb="images/slides/v1-1.jpg" data-title="Slide Title"
//                             data-transition="parallaxvertical">

//                             <img alt="" class="rev-slidebg" data-bgfit="cover" data-bgparallax="10"
//                                 data-bgposition="center center" data-bgrepeat="no-repeat" data-no-retina=""
//                                 src="./uploads/sliders/${element.name}/${element.imageUrl}">

//                             <div class="tp-caption" data-paddingbottom="[0,0,0,0]" data-paddingleft="[0,0,0,0]"
//                                 data-paddingright="[0,0,0,0]" data-paddingtop="[0,0,0,0]" data-responsive_offset="on"
//                                 data-type="text" data-height="none" data-width="['800','800','700','500']"
//                                 data-whitespace="normal" data-hoffset="['15','15','15','15']"
//                                 data-voffset="['-160','-100','-110','-105']" data-x="['left','left','left','left']"
//                                 data-y="['middle','middle','middle','middle']"
//                                 data-textalign="['top','top','top','top']"
//                                 data-frames='[{"from":"y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;","mask":"x:0px;y:0px;s:inherit;e:inherit;","speed":1500,"to":"o:1;","delay":1000,"ease":"Power3.easeInOut"},{"delay":"wait","speed":1000,"to":"auto:auto;","mask":"x:0;y:0;s:inherit;e:inherit;","ease":"Power3.easeInOut"}]'
//                                 style="z-index: 7; white-space: nowrap;">
//                                 <div class="slide-content left-slide">
//                                     <div class="big-title">
//                                         ${element.title}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div class="tp-caption" data-paddingbottom="[0,0,0,0]" data-paddingleft="[0,0,0,0]"
//                                 data-paddingright="[0,0,0,0]" data-paddingtop="[0,0,0,0]" data-responsive_offset="on"
//                                 data-type="text" data-height="none" data-width="['800','800','700','500']"
//                                 data-whitespace="normal" data-hoffset="['15','15','15','15']"
//                                 data-voffset="['-75','-10','-25','-30']" data-x="['left','left','left','left']"
//                                 data-y="['middle','middle','middle','middle']"
//                                 data-textalign="['top','top','top','top']"
//                                 data-frames='[{"from":"y:[-100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;","mask":"x:0px;y:0px;s:inherit;e:inherit;","speed":1500,"to":"o:1;","delay":1500,"ease":"Power3.easeInOut"},
//                         {"delay":"wait","speed":1000,"to":"auto:auto;","mask":"x:0;y:0;s:inherit;e:inherit;","ease":"Power3.easeInOut"}]'
//                                 style="z-index: 7; white-space: nowrap;">
//                                 <div class="slide-content left-slide">
//                                     <div class="text">${element.description}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div class="tp-caption" data-paddingbottom="[0,0,0,0]" data-paddingleft="[0,0,0,0]"
//                                 data-paddingright="[0,0,0,0]" data-paddingtop="[0,0,0,0]" data-responsive_offset="on"
//                                 data-type="text" data-height="none" data-width="['800','800','700','500']"
//                                 data-whitespace="normal" data-hoffset="['15','15','15','15']"
//                                 data-voffset="['25','90','100','85']" data-x="['left','left','left','left']"
//                                 data-y="['middle','middle','middle','middle']"
//                                 data-textalign="['top','top','top','top']"
//                                 data-frames='[{"from":"y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;","mask":"x:0px;y:0px;s:inherit;e:inherit;","speed":1500,"to":"o:1;","delay":1500,"ease":"Power3.easeInOut"},{"delay":"wait","speed":1000,"to":"auto:auto;","mask":"x:0;y:0;s:inherit;e:inherit;","ease":"Power3.easeInOut"}]'
//                                 style="z-index: 7; white-space: nowrap;">
//                                 <div class="slide-content left-slide">
//                                     <div class="btn-box">
//                                         <a class="btn-one" href="./${element.redirectUrl}">${element.buttonText}<span class="flaticon-next"></span></a>
//                                         <!-- <a class="project-view-button" href="#">Project 360<span style="font-size: 20px;">&deg</span>View</a> -->
//                                     </div>
//                                 </div>
//                             </div>

//                         </li>
//                 `
//             })
//         })
// }
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
            // let ul = `<ul class="brand-items-carousel owl-carousel owl-theme">`;
            // data.forEach(element => {
            //     ul +=
            //         `
            //     <li class="single-brand-item wow fadeInUp" data-wow-delay="0ms" data-wow-duration="400ms">
            //         <a href="#"><img src="./uploads/brands/${element.name}/${element.imageUrl}" alt="Awesome Brand Image"></a>
            //         <div class="overlay-content">
            //             <p>${element.name}</p>
            //         </div>
            //     </li>
            // `
            // })
            // ul += "\n</ul>"
            // console.log(ul);
            // document.getElementById("brands-slider").innerHTML += ul;
        })
}
if (document.getElementById("services")) {
    fetch("https://localhost:7255/api/Service")
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                document.getElementById("services").innerHTML+=
                `
                <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                        <div class="single-service-style2 wow fadeInUp" data-wow-delay="200ms"
                            data-wow-duration="1200ms">
                            <div class="img-holder">
                                <img src="./uploads/services/${element.name}/${element.imageUrl}" alt="Awesome Image">
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
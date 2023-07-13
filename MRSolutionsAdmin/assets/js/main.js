/**
 * Main
 */

'use strict';

let entityNames = {
  brand: "Tərəfdaş",
  category: "Kateqoriya",
  product: "Məhsul",
  project: "Layihə",
  service: "Xidmət",
  setting: "Tənzimləmə",
  slider: "Slayder"
}
//JWT
// const token = document.cookie // Retrieve the token from the cookie
//   .split('; ')
//   .find(row => row.startsWith('jwtToken='))
//   .split('=')[1];
const token = Cookies.get("jwtToken");

const queryStr = window.location.search;
const params = new URLSearchParams(queryStr);
const id = params.get('id');
const page = params.get('page') != null ? params.get('page') : 1;
function findFromEntityNames(entity) {
  const foundKey = Object.keys(entityNames).find(key => key.toString() === entity.toString());

  if (foundKey) {
    return entityNames[foundKey];
  }

  return undefined;
}

function entityDelete(e) {
  let url = `https://localhost:7255/api/${e.dataset.entity}/${e.dataset.id}`;
  let id = e.dataset.id;
  var entity = e.dataset.entity;
  Swal.fire({
    title: 'Əminsinizmi?',
    text: "Bu fəaliyyəti geri qaytarmaq mümkün olmayacaq!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Bəli',
    cancelButtonText: 'Ləğv et'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(url, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          if (response.status == 200) {
            Swal.fire(
              'Silindi!',
              `${findFromEntityNames(entity)} silindi.`,
              'info'
            ).then(function () {
              window.location.reload();
            })
            setTimeout(() => {
              window.location.reload();
            }, 10000);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Xəta',
              text: `Bu id-li layihə tapılmadı:${id}`
            })
          }

        })
    }
  })
}
async function postData(url = "", data = {}) {
  const urlpath = new URL(url);
  const path = urlpath.pathname; // "/api/Service"
  const parts = path.split("/"); // ["", "api", "Service"]
  const entity = parts[parts.length - 1].toLowerCase(); // "service"
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: data
    });

    if (!response.ok) {
      $("#modalCenter").modal('show');
    } else {
      Swal.fire(
        'Yaradıldı!',
        `${findFromEntityNames(entity)} yaradıldı.`,
        'info'
      ).then(function () {
        window.location.href = `./${entity}-index.html`;
      });

      setTimeout(() => {
        window.location.href = `./${entity}-index.html`;
      }, 10000);
    }

    return response.json(); // Return the parsed JSON data
  } catch (error) {
    $("#modalCenter").modal('show');
    throw error;
  }
}
async function putData(url = "", data = {}) {
  const urlpath = new URL(url);
  const path = urlpath.pathname; // "/api/Service"
  const parts = path.split("/"); // ["", "api", "Service"]
  const entity = parts[parts.length - 2].toLowerCase(); // "service"
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: data
    });

    if (!response.ok) {
      $("#modalCenter").modal('show');
    } else {
      Swal.fire(
        'Dəyişdirildi!',
        `${findFromEntityNames(entity)} dəyişdirildi.`,
        'info'
      ).then(function () {
        window.location.href = `./${entity}-index.html`;
      });

      setTimeout(() => {
        window.location.href = `./${entity}-index.html`;
      }, 10000);
    }

    return response.json(); // Return the parsed JSON data
  } catch (error) {
    $("#modalCenter").modal('show');
    throw error;
  }
}
//Dashboard
{
  const urlpath = new URL(window.location.href);
  const path = urlpath.pathname;
  const parts = path.split("/");
  const admin = parts[parts.length - 3].toLowerCase();
  if (admin == "mrsolutionsadmin") {
    if (parts[parts.length - 1].toLowerCase() != "auth-login-basic.html") {
      if (parts[parts.length - 1].toLowerCase() != "auth-forgot-password-basic.html") {
        if (parts[parts.length - 1].toLowerCase() != "auth-reset-password.html") {
          fetch("https://localhost:7255/api/Dashboard", {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .then(res => {
              if (!res.ok) {
                window.location.href = "./auth-login-basic.html"
              } else {
                return res.json();
              }
            })
            .then(data => {
              let keys = Object.keys(data);
              let values = Object.values(data);
              for (let i = 0; i < keys.length; i++) {
                if (document.getElementById("dashboard-index")) document.getElementById("dashboard-index").innerHTML +=
                  `
            <tr class="text-center">
              <td>${i + 1}</td>
              <td>${findFromEntityNames(keys[i])}</td>
              <td>${values[i]}</td>
              <td><a href="./${keys[i]}-index.html" class="text-white btn btn-success">Ətraflı</a></td>
            </tr>
          `
              }
            }
            )
        }
      }
    }
  }

  document.getElementById('formAuthentication')?.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = {
      email: email,
      password: password
    };
    fetch('https://localhost:7255/api/Auth/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          return response.json(); // Parse the response body as JSON
        } else if (response.status == 400) {
          throw new Error()
        }
      })
      .then(data => {
        const jwtToken = data.jwtToken; // Extract the JWT token from the response body

        // Store the JWT token in an HTTP-only cookie
        // document.cookie = `jwtToken=${jwtToken}; HttpOnly; Secure`; // Set the cookie
        Cookies.set('jwtToken', `${jwtToken}`)
        // const value = ('; ' + document.cookie).split(`; jwtToken=`).pop().split(';')[0];
        console.log(Cookies.get('jwtToken'));
        // Handle successful login or redirect to another page
        window.location.href = "./index.html";
      })
      .catch(error => {
        $("#modalCenter").modal('show');
      });
  });

  document.getElementById("forgotPasswordForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    let obj = {
      email: document.getElementById("email").value
    }
    fetch("https://localhost:7255/api/Auth/ForgotPassword/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(res => {
      if (!res.ok) {
        $("#modalCenter").modal('show');
      } else {
        Swal.fire(
          'Göndərildi!',
          'Şifrə dəyişdirilməsi ilə bağlı təsdiq poçtu göndərildi',
          'info'
        ).then(function () {
          window.location.href = './auth-login-basic.html';
        });
      }
    })
  })

  document.getElementById("resetPasswordForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const decodedToken = params.get('token').replaceAll(' ', '+');;
    console.log(decodedToken, params.get('email'))
    console.log(params.get('token'))
    const resetPasswordDto = {
      password: document.getElementById("password").value,
      confirmPassword: document.getElementById("confirmPassword").value,
      email: params.get('email'),
      token: decodedToken
    }
    fetch("https://localhost:7255/api/Auth/ResetPassword/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(resetPasswordDto)
    }).then(res => {
      if (!res.ok) {
        $("#modalCenter").modal('show');
      } else {
        Swal.fire(
          'Dəyişdirildi!',
          'Şifrə uğurla dəyişdirildi',
          'info'
        ).then(function () {
          window.location.href = './auth-login-basic.html';
        });
      }
    })

  })
  document.getElementById("logoutButton")?.addEventListener("click", function () {
    Cookies.remove('jwtToken')
  })
}
//Service
document.getElementById("createServiceForm")?.addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent form submission
  const formData = new FormData();
  const posterImage = document.getElementById("posterimage").files[0];
  const image = document.getElementById("image").files[0];
  formData.append('posterimage', posterImage)
  formData.append('image', image)
  formData.append('name', document.getElementById("name").value)
  formData.append('headertext', document.getElementById("headertext").value)
  formData.append('description', document.getElementById("description").value)
  // Example POST method implementation:


  postData("https://localhost:7255/api/Service", formData)
});
document.getElementById("updateServiceForm")?.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission
  const formData = new FormData();
  formData.append('id', id)
  formData.append('posterimage', document.getElementById("posterimage").files[0])
  formData.append('image', document.getElementById("image").files[0])
  formData.append('name', document.getElementById("name").value)
  formData.append('headertext', document.getElementById("headertext").value)
  formData.append('description', document.getElementById("description").value)
  putData(`https://localhost:7255/api/Service/${id}`, formData)
});
if (document.getElementById("updateServiceForm")) {
  fetch(`https://localhost:7255/api/Service/${id}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("name").value = data.name;
      document.getElementById("headertext").value = data.headerText;
      document.getElementById("description").value = data.description;
      document.getElementById("posterImageShow").src += data.name + "/" + data.posterImageUrl;
      document.getElementById("imageShow").src += data.name + "/" + data.imageUrl;
    });
}
if (document.getElementById("service-index")) {
  fetch("https://localhost:7255/api/Service")
    .then(res => res.json())
    .then(data => data.forEach(element => {
      document.getElementById("service-index").innerHTML +=
        `
                        <tr>
                          <td>
                            <i class="fab fa-angular fa-lg text-danger me-3"></i> <img style="width:200px" src="./../../MRSolutions/uploads/services/${element.name}/${element.posterImageUrl}">
                          </td>  
                          <td>
                            <i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${element.name}</strong>
                          </td>
                          <td>
                            <i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${element.headerText.length > 60 ? element.headerText.substring(0, 60) + "..." : element.headerText}</strong>
                          </td>
                          <td class="text-center">
                            <a href="./service-detail.html?id=${element.id}" class="text-white btn btn-info">Detallı</a>
                            <a href="./service-update.html?id=${element.id}" class="text-white btn btn-warning">Dəyişmək</a>
                            <a onClick="entityDelete(this)" data-entity="service" data-id="${element.id}"class="text-white btn btn-danger">Silmək</a>
                          </td>
                        </tr>
          `
    }))
}
if (document.getElementById("serviceDetail")) {
  fetch(`https://localhost:7255/api/Service/${id}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("name").innerText = data.name;
      document.getElementById("headerText").innerText = data.headerText;
      document.getElementById("description").innerText = data.description;
      document.getElementById("posterImageShow").src += data.name + "/" + data.posterImageUrl;
      document.getElementById("imageShow").src += data.name + "/" + data.imageUrl;
    });
}

//Brand
document.getElementById("createBrandForm")?.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission
  const formData = new FormData();
  formData.append('name', document.getElementById('name').value);
  formData.append('image', document.getElementById('image').files[0]);
  postData("https://localhost:7255/api/Brand", formData)
})
document.getElementById("updateBrandForm")?.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission
  const formData = new FormData();
  formData.append('id', id);
  formData.append('name', document.getElementById('name').value);
  formData.append('image', document.getElementById('image').files[0]);
  putData(`https://localhost:7255/api/Brand/${id}`, formData)
})
if (document.getElementById("updateBrandForm")) {
  fetch(`https://localhost:7255/api/Brand/${id}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("name").value = data.name;
      document.getElementById("imageShow").src += data.name + "/" + data.imageUrl;
    });
}
if (document.getElementById("brand-index")) {
  fetch("https://localhost:7255/api/Brand")
    .then(res => res.json())
    .then(data => data.forEach(element => {
      document.getElementById("brand-index").innerHTML +=
        `
                        <tr>
                          <td>
                            <strong>${element.name}</strong>
                          </td>
                          <td class="d-flex justify-content-center">
                            <img style="width:200px; height:200px" src="./../../MRSolutions/uploads/brands/${element.name}/${element.imageUrl}">
                          </td>
                          <td class="text-center">
                            <a href="./brand-update.html?id=${element.id}" class="text-white btn btn-warning">Dəyişmək</a>
                            <a onClick="entityDelete(this)" data-entity="brand" data-id="${element.id}"class="text-white btn btn-danger">Silmək</a>
                          </td>
                        </tr>
          `
    }))
}

//Category
document.getElementById("createCategoryForm")?.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission
  // postData("https://localhost:7255/api/Category", { name: document.getElementById('name').value })
  fetch("https://localhost:7255/api/Category", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({ name: document.getElementById('name').value }), // body data type must match "Content-Type" header
  })
    .then(response => {
      if (!response.ok) {
        $("#modalCenter").modal('show');
      } else {
        Swal.fire(
          'Yaradıldı!',
          'Kateqoriya yaradıldı.',
          'info'
        ).then(function () {
          window.location.href = "./category-index.html";
        })
        setTimeout(() => {
          window.location.href = "./category-index.html";
        }, 10000);
      }
    })
    .catch(() => {
      $("#modalCenter").modal('show');
    });
})
document.getElementById("updateCategoryForm")?.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission
  const name = document.getElementById('name').value;
  const updatedCategory = { id, name };
  fetch(`https://localhost:7255/api/Category/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedCategory)
  })
    .then(response => {
      if (!response.ok) {
        $("#modalCenter").modal('show');
      }
      response.json()
    })
    .then(data => {
      Swal.fire(
        'Dəyişdirildi!',
        'Kateqoriya dəyişdirildi.',
        'info'
      ).then(function () {
        window.location.href = "./category-index.html";
      })
      setTimeout(() => {
        window.location.href = "./category-index.html";
      }, 10000);
    })
    .catch(error => {
      $("#modalCenter").modal('show');
    });
})
if (document.getElementById("updateCategoryForm")) {
  fetch(`https://localhost:7255/api/Category/${id}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("name").value = data.name;
    });
}
if (document.getElementById("category-index")) {
  fetch("https://localhost:7255/api/Category")
    .then(res => res.json())
    .then(data => data.forEach(element => {
      document.getElementById("category-index").innerHTML +=
        `
                        <tr>
                          <td>
                            <i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${element.name}</strong>
                          </td>
                          <td class="text-center">
                            <a href="./category-update.html?id=${element.id}" class="text-white btn btn-warning">Dəyişmək</a>
                            <a onClick="entityDelete(this)" data-entity="category" data-id="${element.id}"class="text-white btn btn-danger">Silmək</a>
                          </td>
                        </tr>
          `
    }))
}

//Product
document.getElementById("createProductForm")?.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission
  const formData = new FormData();
  const image = document.getElementById("image").files[0];
  const video = document.getElementById("video").files[0];
  formData.append('image', image)
  formData.append('video', video)
  formData.append('name', document.getElementById("name").value)
  formData.append('headertext', document.getElementById("headertext").value)
  formData.append('description', document.getElementById("description").value)
  formData.append('categoryid', document.getElementById("category-selectlist").value)
  postData("https://localhost:7255/api/Product", formData);
})
document.getElementById("updateProductForm")?.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission
  const formData = new FormData();
  formData.append('id', id)
  formData.append('image', document.getElementById("image").files[0])
  formData.append('video', document.getElementById("video").files[0])
  formData.append('name', document.getElementById("name").value)
  formData.append('headertext', document.getElementById("headertext").value)
  formData.append('description', document.getElementById("description").value)
  formData.append('categoryid', document.getElementById("category-selectlist").value)
  putData(`https://localhost:7255/api/Product/${id}`, formData)
})
if (document.getElementById("createProductForm")) {
  fetch("https://localhost:7255/api/Category")
    .then(response => response.json())
    .then(data => data.forEach(element => {
      document.getElementById("category-selectlist").innerHTML += `<option value=${element.id}>${element.name}</option>`
    }))
}
if (document.getElementById("updateProductForm")) {
  let categoryId;
  fetch(`https://localhost:7255/api/Product/${id}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("name").value = data.name;
      document.getElementById("headertext").value = data.headerText;
      document.getElementById("description").value = data.description;
      document.getElementById("imageShow").src += data.name + "/" + data.imageUrl;
      document.getElementById("videoShow").innerHTML +=
        `
          <video autoplay controls class="w-100" style="height:150px;object-fit:fill">
              <source  src="./../../MRSolutions/uploads/products/${data.name}/${data.videoUrl}" type="video/mp4">
          </video>
          `
      categoryId = data.categoryId;
    }).then(() => {
      fetch("https://localhost:7255/api/Category")
        .then(response => response.json())
        .then(data => data.forEach(element => {
          if (element.id == categoryId) {
            document.getElementById("category-selectlist").innerHTML += `<option selected value=${element.id}>${element.name}</option>`
          }
          else {
            document.getElementById("category-selectlist").innerHTML += `<option value=${element.id}>${element.name}</option>`
          }
        }))
    });
}
if (document.getElementById("product-index")) {
  fetch(`https://localhost:7255/api/Product/${page}`)
    .then(res => res.json())
    .then(data => {
      data.products.forEach(element => {
        document.getElementById("product-index").innerHTML +=
          `
                        <tr>
                          <td>
                            <i class="fab fa-angular fa-lg text-danger me-3"></i> <img style="width:200px" src="./../../MRSolutions/uploads/products/${element.name}/${element.imageUrl}">
                          </td>  
                          <td>
                            <i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${element.name}</strong>
                          </td>
                          <td>
                            <i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${element.headerText.length > 60 ? element.headerText.substring(0, 60) + "..." : element.headerText}</strong>
                          </td>
                          <td class="text-center d-flex flex-column align-items-center gap-3">
                            <a href="./product-detail.html?id=${element.id}" class="text-white btn btn-info w-50">Detallı</a>
                            <a href="./product-update.html?id=${element.id}" class="text-white btn btn-warning w-50">Dəyişmək</a>
                            <a onClick="entityDelete(this)" data-entity="product" data-id="${element.id}"class="text-white btn btn-danger w-50">Silmək</a>
                          </td>
                        </tr>
          `
      })
      if (data.productCount > 8) {
        let pagination = document.getElementById("pagination");
        for (let i = 1; i <= Math.ceil(data.productCount / 8); i++) {
          if (page == i) {
            pagination.innerHTML +=
              `<li class="page-item active">
                  <a class="page-link" href="./product-index.html?page=${i}">${i}</a>
                </li>`
          } else {
            pagination.innerHTML +=
              `<li class="page-item">
                  <a class="page-link" href="./product-index.html?page=${i}">${i}</a>
                </li>`
          }
        }
      }
    })
}
if (document.getElementById("productDetail")) {
  let categoryId;
  fetch(`https://localhost:7255/api/Product/${id}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      document.getElementById("name").innerText = data.name;
      document.getElementById("headerText").innerText = data.headerText;
      document.getElementById("description").innerText = data.description;
      document.getElementById("imageShow").src += data.name + "/" + data.imageUrl;
      document.getElementById("videoShow").innerHTML +=
        `
          <video autoplay controls class="w-100" style="height:150px;object-fit:fill">
              <source  src="./../../MRSolutions/uploads/products/${data.name}/${data.videoUrl}" type="video/mp4">
          </video>
          `
      categoryId = data.categoryId;
    }).then(() => {
      fetch("https://localhost:7255/api/Category")
        .then(response => response.json())
        .then(data => data.forEach(element => {
          if (element.id == categoryId) {
            document.getElementById("category").innerText += element.name
          }
        }))
    });
}

//Project
document.getElementById("createProjectForm")?.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission
  const formData = new FormData();
  formData.append('posterimage', document.getElementById("posterImage").files[0])
  formData.append('image', document.getElementById("image").files[0])
  formData.append('name', document.getElementById("name").value)
  formData.append('date', document.getElementById("date").value)
  formData.append('location', document.getElementById("location").value)
  formData.append('area', document.getElementById("area").value)
  formData.append('description', document.getElementById("description").value)
  postData("https://localhost:7255/api/Project", formData)
})
document.getElementById("updateProjectForm")?.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission
  const formData = new FormData();
  formData.append('id', projectId)
  formData.append('posterimage', document.getElementById("posterImage").files[0])
  formData.append('image', document.getElementById("image").files[0])
  formData.append('name', document.getElementById("name").value)
  formData.append('date', document.getElementById("date").value)
  formData.append('location', document.getElementById("location").value)
  formData.append('area', document.getElementById("area").value)
  formData.append('description', document.getElementById("description").value)
  putData(`https://localhost:7255/api/Project/${id}`, formData);
})
if (document.getElementById("updateProjectForm")) {
  fetch(`https://localhost:7255/api/Project/${id}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("name").value = data.name;
      document.getElementById("description").value = data.description;
      document.getElementById("location").value = data.location;
      document.getElementById("area").value = data.area;
      document.getElementById("date").value = data.date.substring(0, 10);
      document.getElementById("posterImageShow").src += data.name + "/" + data.posterImageUrl
      document.getElementById("imageShow").src += data.name + "/" + data.imageUrl
    });
}
if (document.getElementById("project-index")) {
  fetch("https://localhost:7255/api/Project")
    .then(res => res.json())
    .then(data => data.forEach(element => {
      document.getElementById("project-index").innerHTML +=
        `
                        <tr>
                          <td>
                            <i class="fab fa-angular fa-lg text-danger me-3"></i> <img style="width:200px" src="./../../MRSolutions/uploads/projects/${element.name}/${element.posterImageUrl}">
                          </td>  
                          <td>
                            <i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${element.name}</strong>
                          </td>
                          <td class="text-center">
                            <a href="./project-detail.html?id=${element.id}" class="text-white btn btn-info">Detallı</a>
                            <a href="./project-update.html?id=${element.id}" class="text-white btn btn-warning">Dəyişmək</a>
                            <a onClick="entityDelete(this)" data-entity="project" data-id="${element.id}"class="text-white btn btn-danger">Silmək</a>
                          </td>
                        </tr>
          `
    }))
}
if (document.getElementById("projectDetail")) {
  fetch(`https://localhost:7255/api/Project/${id}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("name").innerText = data.name;
      document.getElementById("description").innerText = data.description;
      document.getElementById("location").innerText = data.location;
      document.getElementById("area").innerText = data.area;
      document.getElementById("date").innerText = data.date.substring(0, 10);
      document.getElementById("posterImageShow").src += data.name + "/" + data.posterImageUrl
      document.getElementById("imageShow").src += data.name + "/" + data.imageUrl
    });
}

//Setting

document.getElementById("updateSettingForm")?.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission
  const value = document.getElementById('value').value;
  const updatedSetting = { id, value };
  putData(`https://localhost:7255/api/Setting/${id}`, updatedSetting)
})
if (document.getElementById("updateSettingForm")) {
  fetch(`https://localhost:7255/api/Setting/${id}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("value").value = data.value;
      document.getElementById("key").innerHTML = data.key;
    });
}
if (document.getElementById("setting-index")) {
  fetch("https://localhost:7255/api/Setting")
    .then(res => res.json())
    .then(data => data.forEach(element => {
      document.getElementById("setting-index").innerHTML +=
        `
                        <tr>
                          <td>
                            <i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${element.key}</strong>
                          </td>
                          <td>
                            <i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${element.value}</strong>
                          </td>
                          <td class="text-center">
                            <a href="./setting-update.html?id=${element.id}" class="text-white btn btn-warning">Dəyişmək</a>
                          </td>
                        </tr>
          `
    }))
}

//Slider
document.getElementById("createSliderForm")?.addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent form submission
  const formData = new FormData();
  formData.append('image', document.getElementById("image").files[0])
  formData.append('title', document.getElementById("title").value)
  formData.append('description', document.getElementById("description").value)
  formData.append('buttontext', document.getElementById("buttontext").value)
  formData.append('redirecturl', document.getElementById("redirecturl").value)
  postData("https://localhost:7255/api/Slider", formData)
});
document.getElementById("updateSliderForm")?.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission
  const formData = new FormData();
  formData.append('id', id)
  formData.append('image', document.getElementById("image").files[0])
  formData.append('title', document.getElementById("title").value)
  formData.append('description', document.getElementById("description").value)
  formData.append('buttontext', document.getElementById("buttontext").value)
  formData.append('redirecturl', document.getElementById("redirecturl").value)
  putData(`https://localhost:7255/api/Slider/${id}`, formData)
});
if (document.getElementById("updateSliderForm")) {
  fetch(`https://localhost:7255/api/Slider/${id}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("title").value = data.title;
      document.getElementById("description").value = data.description;
      document.getElementById("buttontext").value = data.buttonText;
      document.getElementById("imageShow").src += data.title.split(' ')[0] + "/" + data.imageUrl;
      document.getElementById("redirecturl").value = data.redirectUrl;
    });
}
if (document.getElementById("slider-index")) {
  fetch("https://localhost:7255/api/Slider")
    .then(res => res.json())
    .then(data => data.forEach(element => {
      document.getElementById("slider-index").innerHTML +=
        `
                        <tr>
                          <td>
                            <i class="fab fa-angular fa-lg text-danger me-3"></i> <img style="width:200px" src="./../../MRSolutions/uploads/sliders/${element.title.split(' ')[0]}/${element.imageUrl}">
                          </td>  
                          <td>
                            <i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${element.title}</strong>
                          </td>
                          <td>
                            <i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${element.description.length > 60 ? element.description.substring(0, 60) + "..." : element.description}</strong>
                          </td>
                          <td class="text-center">
                            <a href="./slider-detail.html?id=${element.id}" class="text-white btn btn-info">Detallı</a>
                            <a href="./slider-update.html?id=${element.id}" class="text-white btn btn-warning">Dəyişmək</a>
                            <a onClick="entityDelete(this)" data-entity="slider" data-id="${element.id}"class="text-white btn btn-danger">Silmək</a>
                          </td>
                        </tr>
          `
    }))
}
if (document.getElementById("sliderDetail")) {
  fetch(`https://localhost:7255/api/Slider/${id}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("title").innerText = data.title;
      document.getElementById("description").innerText = data.description;
      document.getElementById("buttonText").innerText = data.buttonText;
      document.getElementById("image").src += data.title.split(' ')[0] + "/" + data.imageUrl;
      document.getElementById("redirectUrl").innerText = data.redirectUrl;
    });
}

let menu, animate;

(function () {
  // Initialize menu
  //-----------------

  let layoutMenuEl = document.querySelectorAll('#layout-menu');
  layoutMenuEl.forEach(function (element) {
    menu = new Menu(element, {
      orientation: 'vertical',
      closeChildren: false
    });
    // Change parameter to true if you want scroll animation
    window.Helpers.scrollToActive((animate = false));
    window.Helpers.mainMenu = menu;
  });

  // Initialize menu togglers and bind click on each
  let menuToggler = document.querySelectorAll('.layout-menu-toggle');
  menuToggler.forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault();
      window.Helpers.toggleCollapsed();
    });
  });

  // Display menu toggle (layout-menu-toggle) on hover with delay
  let delay = function (elem, callback) {
    let timeout = null;
    elem.onmouseenter = function () {
      // Set timeout to be a timer which will invoke callback after 300ms (not for small screen)
      if (!Helpers.isSmallScreen()) {
        timeout = setTimeout(callback, 300);
      } else {
        timeout = setTimeout(callback, 0);
      }
    };

    elem.onmouseleave = function () {
      // Clear any timers set to timeout
      document.querySelector('.layout-menu-toggle').classList.remove('d-block');
      clearTimeout(timeout);
    };
  };
  if (document.getElementById('layout-menu')) {
    delay(document.getElementById('layout-menu'), function () {
      // not for small screen
      if (!Helpers.isSmallScreen()) {
        document.querySelector('.layout-menu-toggle').classList.add('d-block');
      }
    });
  }

  // Display in main menu when menu scrolls
  let menuInnerContainer = document.getElementsByClassName('menu-inner'),
    menuInnerShadow = document.getElementsByClassName('menu-inner-shadow')[0];
  if (menuInnerContainer.length > 0 && menuInnerShadow) {
    menuInnerContainer[0].addEventListener('ps-scroll-y', function () {
      if (this.querySelector('.ps__thumb-y').offsetTop) {
        menuInnerShadow.style.display = 'block';
      } else {
        menuInnerShadow.style.display = 'none';
      }
    });
  }

  // Init helpers & misc
  // --------------------

  // Init BS Tooltip
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Accordion active class
  const accordionActiveFunction = function (e) {
    if (e.type == 'show.bs.collapse' || e.type == 'show.bs.collapse') {
      e.target.closest('.accordion-item').classList.add('active');
    } else {
      e.target.closest('.accordion-item').classList.remove('active');
    }
  };

  const accordionTriggerList = [].slice.call(document.querySelectorAll('.accordion'));
  const accordionList = accordionTriggerList.map(function (accordionTriggerEl) {
    accordionTriggerEl.addEventListener('show.bs.collapse', accordionActiveFunction);
    accordionTriggerEl.addEventListener('hide.bs.collapse', accordionActiveFunction);
  });

  // Auto update layout based on screen size
  window.Helpers.setAutoUpdate(true);

  // Toggle Password Visibility
  window.Helpers.initPasswordToggle();

  // Speech To Text
  window.Helpers.initSpeechToText();

  // Manage menu expanded/collapsed with templateCustomizer & local storage
  //------------------------------------------------------------------

  // If current layout is horizontal OR current window screen is small (overlay menu) than return from here
  if (window.Helpers.isSmallScreen()) {
    return;
  }

  // If current layout is vertical and current window screen is > small

  // Auto update menu collapsed/expanded based on the themeConfig
  window.Helpers.setCollapsed(true, false);
})();

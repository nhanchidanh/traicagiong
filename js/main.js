const fakeLogin = [
    {
        username: "username1",
        password: "password1"
    },
    {
        username: "username2",
        password: "password2"
    }
]

// Tim tài khoản
function findAccount(usernameInput, pwInput) {
    return fakeLogin.find(function (item) {
        return item.username === usernameInput && item.password === pwInput;
    });
}

function logged(form) {
    if (form) {
        const username = form.taikhoan;
        const pw = form.matkhau;

        // * username.value <==> giá trị input username
        // * username.value.length <==> giá trị độ dài input username
        // * username.focus() <=> trỏ vào ô input username.
        // * !username.value <==> không có giá trị == rỗng

        if (!username.value) {
            alert('Vui lòng nhập tài khoản');
        } else {
            // Tim kiếm theo username.
            const account = findAccount(username.value, pw.value);

            if (account) {
                window.location.href = "check.html";
            } else {
                alert("Tài khoản hoặc mật khẩu không chính xác");
            }
        }

        return true;
    }
}

// Check du lieu so dien thoai = bieu thuc chinh qui
function regexPhoneNumber(str) {
    const regexPhoneNumber = /((09|03|07|08|05)+([0-9]{8})\b)/g;

    if (!regexPhoneNumber.test(str)) {
        alert('Số điện thoại của bạn không đúng định dạng!');
        return false;
    } else {
        return true;
    }
}

function xuLyDangKy(form) {
    if (form) {
        const hoten = form.hoten
        const diachi = form.diachi
        const sdt = form.sdt
        const email = form.email
        const matkhau = form.matkhau
        const nhaplaimatkhau = form.nhaplai;

        const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!hoten.value) {
            alert("Không được bỏ trống họ tên")
            hoten.focus()
            return false
        }

        if (!diachi.value) {
            alert("Không được bỏ trống địa chỉ")
            diachi.focus()
            return false
        }

        // Kiem tra dinh dang so dien thoai
        regexPhoneNumber(sdt.value)

        if (!emailReg.test(email.value)) {
            alert("Email không hợp lệ");
            email.focus();
            return false;
        }

        if (matkhau.value.length < 8) {
            alert("Mật khẩu ít nhất 8 kí tự!");
            matkhau.focus();
            return false;
        }

        if (nhaplaimatkhau.value.length < 8) {
            alert("Mật khẩu nhập lại chưa đủ!");
            nhaplaimatkhau.focus();
            return false;
        }

        if (nhaplaimatkhau.value !== matkhau.value) {
            alert("Mật khẩu nhập lại không khớp!");
            nhaplaimatkhau.focus();
            return false;
        }

        return true;
    }
}

// Show Menu Responsive
const menuElement = document.querySelector(".menu-responsive--wp");
const barsElement = document.querySelector(".icon-bar");
const closeMenuElement = document.querySelector(".icon-close");

if (barsElement) {
    barsElement.onclick = function () {
        menuElement.classList.add("active");
    }
}

if (closeMenuElement) {
    closeMenuElement.onclick = function () {
        if (menuElement.classList.contains("active"))
            menuElement.classList.remove("active");
    }
}

// Active Link Navigate
function activeLink() {
    let location = window.location.pathname;
    location = location.replace("/", "");
    const links = document.querySelectorAll("a[href='" + location + "']");
    links.forEach(link => {
        link.classList.add("active");
    })
}

activeLink();

// Show modal add Product;
const btnAdd = document.querySelector(".add-btn");
const modalElement = document.querySelector(".modal");

if (btnAdd) {
    function showModal() {
        document.body.style.overflow = "hidden"; // ADD THIS LINE
        document.body.style.height = "100%"; // ADD THIS LINE
        modalElement.classList.add("active");
        const title = document.querySelector(".title-header");
        title.textContent = "THÊM SẢN PHẨM";
        btnUpdate.style.display = "none";
        btn.style.display = "inline-block";
    }

    btnAdd.addEventListener("click", showModal);
}

// Close Modal
function closeModal() {
    document.body.style.overflow = "unset"; // ADD THIS LINE
    document.body.style.height = "100%"; // ADD THIS LINE
    modalElement.classList.remove("active")
}

// Format price
function formatPrice(price) {
    return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}


// Begin: add product
const btn = document.getElementById('btnSubmit');
const tensp = document.getElementById('tensanpham');
const loaisp = document.getElementById('loaisanpham');
const sl = document.getElementById('soluong');
const dg = document.getElementById('dongia');
const ha = document.getElementById('hinhanh');
const list = document.querySelector('#list tbody');

// Create id random auto
function uuidv4() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

var getUrlBlobImg = null;

// handle get url blob image
function handleChangeInputFileImg({ target }) {
    let file = target.files[0];
    getUrlBlobImg = URL.createObjectURL(file);
}

// array select type product
const dataSelectTypeProduct = [
    { label: 'Cá rô', value: 'caro' },
    { label: 'Cá diêu hồng', value: 'cadieuhong' },
    { label: 'Cá thát lác', value: 'cathatlat' },
    { label: 'Cá lóc', value: 'caloc' },
    { label: 'Cá Vô', value: 'cavo' },
    { label: 'Cá trê', value: 'catre' },
    { label: 'Cá chốt', value: 'cachot' },
]

if (btn) {
    btn.onclick = async function () {
        const tr = document.createElement('tr');
        const id = document.createAttribute("id");
        const pid = uuidv4();
        const data = {
            id: pid,
            imgProduct: getUrlBlobImg,
            nameProduct: tensp.value,
            numProduct: sl.value,
            priceProduct: dg.value,
            typeProduct: loaisp.value
        }

        id.value = pid;
        tr.setAttributeNode(id)
        list.appendChild(tr);

        const tr1 = document.getElementById(id.value);

        function add(sp, tr) {
            const td = document.createElement('td');
            td.textContent = sp.value || sp;
            tr.appendChild(td);
            sp.value = null;
        }

        function addimg(sp, tr) {
            const src = getUrlBlobImg;
            const td = document.createElement('td');
            if (src) {
                td.innerHTML = "<img width='70' height='70' src = '" + src + "' >";
                tr.appendChild(td);
                sp.value = null;
            }
        }

        function addAction() {
            const td = document.createElement('td');
            console.log(data);
            td.innerHTML = ` 
            <i class="fa-solid fa-pen-to-square" onclick="updateProduct(event, {id: '${data.id}',imgProduct: '${data.imgProduct}', nameProduct: '${data.nameProduct}', numProduct: '${data.numProduct}', priceProduct: '${data.priceProduct}', typeProduct: '${data.typeProduct}'});"></i>
            <i class="fa-solid fa-delete-left" onclick="deleteProduct(event, {id: ${data.id}});"></i>
        `;
            tr.appendChild(td);
        }

        add(pid, tr1);
        addimg(ha, tr1);
        add(tensp, tr1);
        add(sl, tr1);
        add(formatPrice(+dg.value), tr1);
        add(dataSelectTypeProduct.map(typeProduct => (typeProduct.value === loaisp.value ? typeProduct.label : null)).join(""), tr1);
        addAction();

        closeModal();
    }
}
// End: add product

// Delete Product
function deleteProduct(event, idInput) {
    if (idInput) {
        const { id } = idInput;
        id.parentNode.removeChild(id);
        deleteDataProduct(id);
    }
}

// Update Product 
const btnUpdate = document.querySelector("#btnSubmitUpdate");
var getIdUpdate = null;

function updateProduct(event, product) {
    showModal();
    const title = document.querySelector(".title-header");
    title.textContent = "CẬP NHẬT SẢN PHẨM";
    btnUpdate.style.display = "inline-block";
    btn.style.display = "none";

    if (product) {
        console.log(product)
        const {
            id,
            imgProduct,
            nameProduct,
            numProduct,
            priceProduct,
            typeProduct
        } = product;

        getIdUpdate = id;

        tensp.value = nameProduct;
        sl.value = numProduct;
        dg.value = priceProduct;
        loaisp.value = typeProduct;
    }
}

if (btnUpdate) {
    btnUpdate.addEventListener("click", function (e) {
        const trElement = document.querySelector("#" + getIdUpdate);
        const tdElements = trElement.querySelectorAll("td");
        let length = tdElements.length;

        // Foreach td
        for (let i = 0; i < length; i++) {
            const td = tdElements[i];

            switch (i) {
                case 0:
                    td.textContent = getIdUpdate;
                    break;
                case 1:
                    const img = td.querySelector('img');
                    const imgSrc = getUrlBlobImg ? getUrlBlobImg : img.getAttribute('src');
                    img.setAttribute('src', imgSrc);
                    break;
                case 2:
                    td.textContent = tensp.value;
                    break;
                case 3:
                    td.textContent = sl.value;
                    break;
                case 4:
                    td.textContent = formatPrice(+dg.value);
                    break;
                case 5:
                    td.textContent = dataSelectTypeProduct.map(typeProduct => (typeProduct.value === loaisp.value ? typeProduct.label : null)).join("");
                    break;
                case 6:
                    const imgElement = trElement.querySelector('td img');
                    const imgSrcs = getUrlBlobImg ? getUrlBlobImg : imgElement.getAttribute('src');
                    td.innerHTML = ` 
                    <i class="fa-solid fa-pen-to-square" onclick="updateProduct(event, {id: '${getIdUpdate}',imgProduct: '${imgSrcs}', nameProduct: '${tensp.value}', numProduct: '${sl.value}', priceProduct: '${dg.value}', typeProduct: '${loaisp.value}'});"></i>
                    <i class="fa-solid fa-delete-left" onclick="deleteProduct(event, {id: ${getIdUpdate}});"></i>
                `;
                    break;
                default:
                    break;
            }
        }

        // Clear value after update product
        ha.value = null;
        tensp.value = null;
        sl.value = null;
        dg.value = null;
        loaisp.value = "";

        closeModal();
    })
}
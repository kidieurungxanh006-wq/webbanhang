/* FH Fashion – script.js: toàn bộ tương tác (đổi trang, chọn màu/size, giỏ hàng) */
/* ============ JS 1: TẠO ẢNH SẢN PHẨM GIẢ (thay bằng <img src="..."> khi có ảnh thật) ============ */
const $ = id => document.getElementById(id);                  // viết tắt: $('grid') = lấy phần tử có id="grid"
const shirt = (fill, text, ink) =>
  `<svg viewBox="0 0 100 110" role="img" aria-label="Ảnh sản phẩm"><path d="M32 8L12 22L19 44L29 40V102H71V40L81 44L88 22L68 8Q50 22 32 8Z" fill="${fill}"/><text x="50" y="62" text-anchor="middle" font-size="9" font-weight="700" fill="${ink}">${text}</text></svg>`;


/* BƯỚC 1: TẠO DỮ LIỆU SẢN PHẨM */
// Ảnh sản phẩm trong thư mục images/image như cấu trúc người dùng cung cấp.
// Giữ nguyên các tên file ảnh đã được khai báo trong code sản phẩm gốc.
// Mỗi sản phẩm có tên, loại, màu, size và giá riêng

var danhSachSanPham = [
    {
        id: 1,
        ten: "Áo thun nam",
        loai: "Áo Nam",
        gia: 250000,
        mau: ["Trắng", "Đen"],
        size: ["S", "M", "L"],
        mauHinh: "#ffffff",
        chuHinh: "AO THUN",
        mauChu: "#222222",
        hinhAnh: "images/image/tshirt-black.png"
    },
    {
        id: 2,
        ten: "Quần kaki nam",
        loai: "Quần Nam",
        gia: 450000,
        mau: ["Đen", "Xanh"],
        size: ["M", "L", "XL"],
        mauHinh: "#222222",
        chuHinh: "KAKI",
        mauChu: "#ffffff",
        hinhAnh: "images/image/jeans-black.jpg"
    },
    {
        id: 3,
        ten: "Áo sơ mi nam",
        loai: "Áo Nam",
        gia: 550000,
        mau: ["Xanh", "Trắng"],
        size: ["M", "L", "XL"],
        mauHinh: "#2850a3",
        chuHinh: "SO MI",
        mauChu: "#ffffff",
        hinhAnh: "images/image/hoodie.png"
    },
    {
        id: 4,
        ten: "Áo thun nữ",
        loai: "Áo Nữ",
        gia: 280000,
        mau: ["Đỏ", "Trắng"],
        size: ["S", "M"],
        mauHinh: "#cc3333",
        chuHinh: "AO NU",
        mauChu: "#ffffff",
        hinhAnh: "images/image/tshirt-white.png"
    },
    {
        id: 5,
        ten: "Quần kaki nữ",
        loai: "Quần Nữ",
        gia: 380000,
        mau: ["Trắng", "Đen"],
        size: ["S", "M", "L"],
        mauHinh: "#eeeeee",
        chuHinh: "QUAN NU",
        mauChu: "#222222",
        hinhAnh: "images/image/jeans-blue.jpg"
    },
    { id: 6, ten: "Áo hoodie nam", loai: "Áo Nam", gia: 420000, mau: ["Đen", "Trắng"], size: ["M", "L", "XL"], mauHinh: "#222222", chuHinh: "HOODIE", mauChu: "#ffffff", hinhAnh: "images/image/hoodie.png" },
    { id: 7, ten: "Quần jean nam", loai: "Quần Nam", gia: 490000, mau: ["Xanh", "Đen"], size: ["S", "M", "L", "XL"], mauHinh: "#2850a3", chuHinh: "JEANS", mauChu: "#ffffff", hinhAnh: "images/image/jeans-blue.jpg" },
    { id: 8, ten: "Áo thun basic đen", loai: "Áo Nam", gia: 220000, mau: ["Đen", "Trắng"], size: ["S", "M", "L"], mauHinh: "#222222", chuHinh: "BASIC", mauChu: "#ffffff", hinhAnh: "images/image/tshirt-black.png" },
    { id: 9, ten: "Quần jean đen nữ", loai: "Quần Nữ", gia: 420000, mau: ["Đen", "Xanh"], size: ["S", "M", "L"], mauHinh: "#222222", chuHinh: "JEANS", mauChu: "#ffffff", hinhAnh: "images/image/jeans-black.jpg" },
    { id: 10, ten: "Áo sweater nam", loai: "Áo Nam", gia: 390000, mau: ["Trắng", "Đen"], size: ["M", "L", "XL"], mauHinh: "#eeeeee", chuHinh: "SWEATER", mauChu: "#222222", hinhAnh: "images/image/hoodie.png" },
    { id: 11, ten: "Áo thun nữ trắng", loai: "Áo Nữ", gia: 260000, mau: ["Trắng", "Đỏ"], size: ["S", "M", "L"], mauHinh: "#eeeeee", chuHinh: "AO NU", mauChu: "#222222", hinhAnh: "images/image/tshirt-white.png" },
    { id: 12, ten: "Quần jean xanh nữ", loai: "Quần Nữ", gia: 430000, mau: ["Xanh", "Đen"], size: ["S", "M", "L"], mauHinh: "#2850a3", chuHinh: "JEANS", mauChu: "#ffffff", hinhAnh: "images/image/jeans-blue.jpg" },
    { id: 13, ten: "Áo hoodie nữ", loai: "Áo Nữ", gia: 410000, mau: ["Đỏ", "Đen"], size: ["S", "M"], mauHinh: "#cc3333", chuHinh: "HOODIE", mauChu: "#ffffff", hinhAnh: "images/image/hoodie.png" },
    { id: 14, ten: "Quần kaki nam slim", loai: "Quần Nam", gia: 470000, mau: ["Đen", "Trắng"], size: ["M", "L", "XL"], mauHinh: "#222222", chuHinh: "KAKI", mauChu: "#ffffff", hinhAnh: "images/image/jeans-black.jpg" },
    { id: 15, ten: "Áo thun basic trắng", loai: "Áo Nam", gia: 210000, mau: ["Trắng", "Đen"], size: ["S", "M", "L", "XL"], mauHinh: "#eeeeee", chuHinh: "BASIC", mauChu: "#222222", hinhAnh: "images/image/tshirt-white.png" }
];
/* BƯỚC 2: TẠO THẺ HIỂN THỊ SẢN PHẨM */
function taoTheSanPham(sanPham) {
    var theSanPham = `
        <a class="card" href="#/product/${sanPham.id}">
            <div class="img">
                <img src="${sanPham.hinhAnh}" alt="${sanPham.ten}">
            </div>
            <p>${sanPham.ten}</p>
            <div class="meta"><b>${sanPham.gia.toLocaleString("vi-VN")}đ</b></div>
        </a>`;
    return theSanPham;
}

/* TRANG CHỦ CHỈ TRƯNG BÀY 4 SẢN PHẨM NỔI BẬT */
function hienThiSanPhamTrangChu() {
    var noiDung = "";
    for (var i = 0; i < 4 && i < danhSachSanPham.length; i++) {
        noiDung += taoTheSanPham(danhSachSanPham[i]);
    }
    document.getElementById("homeProducts").innerHTML = noiDung;
    document.getElementById("heroList").innerHTML = "";
}
hienThiSanPhamTrangChu();

/* TRANG SẢN PHẨM: CHIA THÀNH 3 TRANG, MỖI TRANG 5 SẢN PHẨM */
var danhSachDangHienThi = danhSachSanPham.slice();
var trangHienTai = 1;
var soSanPhamMoiTrang = 5;

function hienThiSanPham(danhSach) {
    var batDau = (trangHienTai - 1) * soSanPhamMoiTrang;
    var noiDung = "";
    var ketThuc = batDau + soSanPhamMoiTrang;

    for (var i = batDau; i < ketThuc && i < danhSach.length; i++) {
        noiDung += taoTheSanPham(danhSach[i]);
    }

    document.getElementById("grid").innerHTML = noiDung;
    document.getElementById("empty").hidden = danhSach.length !== 0;
    hienThiNutTrang(danhSach.length);
}

function hienThiNutTrang(tongSoSanPham) {
    var tongSoTrang = Math.ceil(tongSoSanPham / soSanPhamMoiTrang);
    var noiDungNut = "";

    for (var i = 1; i <= tongSoTrang; i++) {
        noiDungNut += '<button type="button" class="' +
            (i === trangHienTai ? 'on' : '') +
            '" data-page="' + i + '">' + i + '</button>';
    }

    document.getElementById("pager").innerHTML = noiDungNut;
}

document.getElementById("pager").onclick = function (event) {
    if (event.target.tagName === "BUTTON") {
        trangHienTai = Number(event.target.getAttribute("data-page"));
        hienThiSanPham(danhSachDangHienThi);
        window.scrollTo(0, 0);
    }
};

/* BỘ LỌC CHỈ HOẠT ĐỘNG TRÊN TRANG SẢN PHẨM */
document.getElementById("go").onclick = function () {
    var tuKhoa = document.getElementById("q").value.toLowerCase().trim();
    var sizeDaChon = document.getElementById("fSize").value;
    var loaiDaChon = document.getElementById("fType").value;
    var mauDaChon = document.getElementById("fColor").value;
    var giaDaChon = document.getElementById("fPrice").value;
    var danhSachKetQua = [];

    for (var i = 0; i < danhSachSanPham.length; i++) {
        var sanPham = danhSachSanPham[i];
        var hopLe = true;

        if (sanPham.ten.toLowerCase().indexOf(tuKhoa) === -1) hopLe = false;
        if (sizeDaChon !== "" && sanPham.size.indexOf(sizeDaChon) === -1) hopLe = false;
        if (loaiDaChon !== "" && sanPham.loai !== loaiDaChon) hopLe = false;
        if (mauDaChon !== "" && sanPham.mau.indexOf(mauDaChon) === -1) hopLe = false;

        if (giaDaChon !== "") {
            var khoangGia = giaDaChon.split("-");
            var giaThapNhat = Number(khoangGia[0]);
            var giaCaoNhat = Number(khoangGia[1]);
            if (sanPham.gia < giaThapNhat || sanPham.gia > giaCaoNhat) hopLe = false;
        }

        if (hopLe === true) danhSachKetQua.push(sanPham);
    }

    danhSachDangHienThi = danhSachKetQua;
    trangHienTai = 1;
    hienThiSanPham(danhSachDangHienThi);
};

document.getElementById("resetFilter").onclick = function () {
    document.getElementById("q").value = "";
    document.getElementById("fSize").value = "";
    document.getElementById("fType").value = "";
    document.getElementById("fColor").value = "";
    document.getElementById("fPrice").value = "";
    danhSachDangHienThi = danhSachSanPham.slice();
    trangHienTai = 1;
    hienThiSanPham(danhSachDangHienThi);
};

hienThiSanPham(danhSachDangHienThi);

/* ============ JS 3: ĐỔI TRANG KHÔNG CẦN TẢI LẠI ============ */
var pages = ["home", "collection", "products", "product", "about", "cart", "sale", "support", "login", "register"];

function route() {
    var duongDan = window.location.hash.replace("#/", "");
    var cacPhan = duongDan.split("/");
    var tenTrang = cacPhan[0];

    if (tenTrang === "") {
        tenTrang = "home";
    }

    if (tenTrang === "product") {
        tenTrang = "product";
    }

    if (pages.includes(tenTrang) === false) {
        tenTrang = "home";
    }

    for (var i = 0; i < pages.length; i++) {
        document.getElementById(pages[i]).classList.toggle(
            "active",
            pages[i] === tenTrang
        );
    }

    // Nếu mở trang chi tiết, lấy mã sản phẩm từ đường dẫn
    if (tenTrang === "product") {
        var maSanPham = Number(cacPhan[1]);

        if (maSanPham > 0) {
            hienThiChiTietSanPham(maSanPham);
        }
    }

    // Khi mở giỏ hàng, cập nhật danh sách và tổng tiền
    if (tenTrang === "cart") {
        hienThiGioHang();
    }

    if (tenTrang === "login") capNhatTrangDangNhap();
    if (tenTrang === "support" && cacPhan[1] === "khieunai") {
        document.getElementById("khieunai").scrollIntoView();
    } else {
        window.scrollTo(0, 0);
    }
}

var sanPhamDangChon = null;
var mauDangChon = "";
var sizeDangChon = "";
var soLuongDangChon = 1;
var danhSachTrongGio = [];
var gioHangDaLuu = localStorage.getItem("gioHangFH");
if (gioHangDaLuu !== null) {
    danhSachTrongGio = JSON.parse(gioHangDaLuu);
}
function luuGioHang() {
    localStorage.setItem(
        "gioHangFH",
        JSON.stringify(danhSachTrongGio)
    );
}
// Hiển thị chi tiết sản phẩm được chọn
function hienThiChiTietSanPham(maSanPham) {
    sanPhamDangChon = null;

    for (var i = 0; i < danhSachSanPham.length; i++) {
        if (danhSachSanPham[i].id === maSanPham) {
            sanPhamDangChon = danhSachSanPham[i];
            break;
        }
    }

    if (sanPhamDangChon === null) {
        return;
    }

    mauDangChon = sanPhamDangChon.mau[0];
    sizeDangChon = sanPhamDangChon.size[0];
    soLuongDangChon = 1;

    document.getElementById("dName").textContent = sanPhamDangChon.ten;
    document.getElementById("dCode").textContent = "Mã sản phẩm: FH" + sanPhamDangChon.id;
    document.getElementById("dPrice").textContent = sanPhamDangChon.gia.toLocaleString("vi-VN") + "đ";
    document.getElementById("qty").textContent = soLuongDangChon;
    document.getElementById("dDesc").textContent = sanPhamDangChon.ten + " với nhiều màu sắc và kích thước.";

    hienThiLuaChonMau();
    hienThiLuaChonSize();
    capNhatHinhSanPham();
    hienThiDanhGia();
    document.getElementById("related").innerHTML = danhSachSanPham.filter(function(sp) { return sp.id !== maSanPham; }).slice(0, 5).map(taoTheSanPham).join("");
}

// Hiển thị các màu có thể chọn
function hienThiLuaChonMau() {
    var noiDungMau = "";

    for (var i = 0; i < sanPhamDangChon.mau.length; i++) {
        var mau = sanPhamDangChon.mau[i];

        noiDungMau += '<button type="button" class="cdot ' +
            (mau === mauDangChon ? "on" : "") +
            '" data-color="' + mau + '">' + mau + '</button>';
    }

    document.getElementById("dColors").innerHTML = noiDungMau;

    var cacNutMau = document.querySelectorAll("#dColors .cdot");

    for (var i = 0; i < cacNutMau.length; i++) {
        cacNutMau[i].onclick = function () {
            mauDangChon = this.getAttribute("data-color");
            hienThiLuaChonMau();
            capNhatHinhSanPham();
        };
    }
}

// Hiển thị các size có thể chọn
function hienThiLuaChonSize() {
    var noiDungSize = "";

    for (var i = 0; i < sanPhamDangChon.size.length; i++) {
        var size = sanPhamDangChon.size[i];

        noiDungSize += '<button type="button" class="size ' +
            (size === sizeDangChon ? "on" : "") +
            '" data-size="' + size + '">' + size + '</button>';
    }

    document.getElementById("dSizes").innerHTML = noiDungSize;

    var cacNutSize = document.querySelectorAll("#dSizes .size");

    for (var i = 0; i < cacNutSize.length; i++) {
        cacNutSize[i].onclick = function () {
            sizeDangChon = this.getAttribute("data-size");
            hienThiLuaChonSize();
        };
    }
}

// Thay hình minh họa theo màu đang chọn
function capNhatHinhSanPham() {
    var mauHinh = sanPhamDangChon.mauHinh;
    var mauChu = sanPhamDangChon.mauChu;

    if (mauDangChon === "Đen") {
        mauHinh = "#222222";
        mauChu = "#ffffff";
    } else if (mauDangChon === "Trắng") {
        mauHinh = "#eeeeee";
        mauChu = "#222222";
    } else if (mauDangChon === "Đỏ") {
        mauHinh = "#cc3333";
        mauChu = "#ffffff";
    } else if (mauDangChon === "Xanh") {
        mauHinh = "#2850a3";
        mauChu = "#ffffff";
    }

    document.getElementById("mainImg").innerHTML =
        '<img src="' + sanPhamDangChon.hinhAnh +
        '" alt="' + sanPhamDangChon.ten + '">';

    var noiDungAnhNho = "";

    for (var i = 0; i < 5; i++) {
        noiDungAnhNho += '<div class="th">' +
            shirt(mauHinh, "", mauChu) + '</div>';
    }

    document.getElementById("thumbs").innerHTML = noiDungAnhNho;
}

// Nút tăng giảm số lượng
document.getElementById("minus").onclick = function () {
    if (soLuongDangChon > 1) {
        soLuongDangChon = soLuongDangChon - 1;
    }

    document.getElementById("qty").textContent = soLuongDangChon;
};

document.getElementById("plus").onclick = function () {
    soLuongDangChon = soLuongDangChon + 1;
    document.getElementById("qty").textContent = soLuongDangChon;
};

// Thêm sản phẩm vào giỏ hàng
function themSanPhamVaoGio() {
    if (sanPhamDangChon === null) {
        return;
    }

    var daCoTrongGio = false;

    for (var i = 0; i < danhSachTrongGio.length; i++) {
        if (
            danhSachTrongGio[i].id === sanPhamDangChon.id &&
            danhSachTrongGio[i].mau === mauDangChon &&
            danhSachTrongGio[i].size === sizeDangChon
        ) {
            danhSachTrongGio[i].soLuong =
                danhSachTrongGio[i].soLuong + soLuongDangChon;

            daCoTrongGio = true;
            break;
        }
    }

    if (daCoTrongGio === false) {
        var sanPhamMoi = {
            id: sanPhamDangChon.id,
            ten: sanPhamDangChon.ten,
            gia: sanPhamDangChon.gia,
            hinhAnh: sanPhamDangChon.hinhAnh,
            mau: mauDangChon,
            size: sizeDangChon,
            soLuong: soLuongDangChon
        };

        danhSachTrongGio.push(sanPhamMoi);
    }
    luuGioHang();
    hienThiGioHang();
}

document.getElementById("add").onclick = function () {
    themSanPhamVaoGio();
};

document.getElementById("buy").onclick = function () {
    themSanPhamVaoGio();
    window.location.hash = "#/cart";
};

// Hiển thị giỏ hàng và tính tổng tiền
function hienThiGioHang() {
    var noiDungGioHang = "";
    var tongTien = 0;
    var tongSoLuong = 0;

    for (var i = 0; i < danhSachTrongGio.length; i++) {
        var sanPham = danhSachTrongGio[i];
        var thanhTien = sanPham.gia * sanPham.soLuong;

        noiDungGioHang +=
            '<div class="cart-item">' +
            '<img class="cart-image" src="' + sanPham.hinhAnh +
            '" alt="' + sanPham.ten + '">' +
            '<div class="cart-info">' +
            '<h3>' + sanPham.ten + '</h3>' +
            '<p>Màu: ' + sanPham.mau + '</p>' +
            '<p>Size: ' + sanPham.size + '</p>' +
            '<p>Đơn giá: ' + sanPham.gia.toLocaleString("vi-VN") + 'đ</p>' +
            '<p>Số lượng: ' + sanPham.soLuong + '</p>' +
            '<p>Thành tiền: ' +
            (sanPham.gia * sanPham.soLuong).toLocaleString("vi-VN") + 'đ</p>' +
            '<button type="button" onclick="xoaSanPhamKhoiGio(' + i +
            ')">Xóa sản phẩm</button>' +
            '</div>' +
            '</div>';

        tongTien = tongTien + thanhTien;
        tongSoLuong = tongSoLuong + sanPham.soLuong;
    }

    if (danhSachTrongGio.length === 0) {
        noiDungGioHang = "<p>Giỏ hàng của bạn đang trống.</p>";
    }

    document.getElementById("cartList").innerHTML = noiDungGioHang;

    document.getElementById("cartTotal").textContent =
        "Tổng tiền: " + tongTien.toLocaleString("vi-VN") + "đ";

    document.getElementById("count").textContent = tongSoLuong;
    document.getElementById("count").hidden = tongSoLuong === 0;
}
// Xóa một sản phẩm khỏi giỏ
function xoaSanPhamKhoiGio(viTri) {
    danhSachTrongGio.splice(viTri, 1);
    luuGioHang();
    hienThiGioHang();
}
// Xóa toàn bộ giỏ hàng
document.getElementById("clearCart").onclick = function () {
    danhSachTrongGio = [];
    luuGioHang();
    hienThiGioHang();
};
// Chạy lại khi chuyển trang
window.addEventListener("hashchange", route);
hienThiGioHang();
hienThiSale();
khoiTaoDanhGia();
route();


/* ====== GIAO DIEN SALE ====== */
function hienThiSale() {
    var noiDung = "";
    for (var i = 0; i < danhSachSanPham.length; i++) {
        if (danhSachSanPham[i].gia < 300000) {
            noiDung += taoTheSanPham(danhSachSanPham[i]);
        }
    }
    document.getElementById("saleGrid").innerHTML = noiDung;
}

/* ====== DANG KY VA DANG NHAP (DEMO LOCALSTORAGE) ====== */
function docDanhSachTaiKhoan() {
    try {
        var duLieu = localStorage.getItem("danhSachTaiKhoan") || "[]";
        var ds = JSON.parse(duLieu);
        return Array.isArray(ds) ? ds : [];
    } catch (loi) {
        return [];
    }
}

function dangKy() {
    var taiKhoan = document.getElementById("reg-taikhoan").value.trim();
    var matKhau = document.getElementById("reg-matkhau").value;
    if (taiKhoan === "" || matKhau === "") {
        alert("Vui lòng nhập đầy đủ tài khoản và mật khẩu!");
        return;
    }
    var danhSachTaiKhoan = docDanhSachTaiKhoan();
    for (var i = 0; i < danhSachTaiKhoan.length; i++) {
        if ((danhSachTaiKhoan[i].taikhoan || danhSachTaiKhoan[i].taiKhoan) === taiKhoan) {
            alert("Tài khoản đã tồn tại!");
            return;
        }
    }
    var taiKhoanMoi = { taikhoan: taiKhoan, matkhau: matKhau };
    danhSachTaiKhoan.push(taiKhoanMoi);
    localStorage.setItem("danhSachTaiKhoan", JSON.stringify(danhSachTaiKhoan));
    alert("Đăng ký thành công! Hãy đăng nhập.");
    document.getElementById("reg-taikhoan").value = "";
    document.getElementById("reg-matkhau").value = "";
    window.location.hash = "#/login";
}

function dangNhap() {
    var taiKhoan = document.getElementById("login-taikhoan").value.trim();
    var matKhau = document.getElementById("login-matkhau").value;
    if (taiKhoan === "" || matKhau === "") {
        alert("Vui lòng nhập tài khoản và mật khẩu!");
        return;
    }
    var danhSachTaiKhoan = docDanhSachTaiKhoan();
    for (var i = 0; i < danhSachTaiKhoan.length; i++) {
        var tk = danhSachTaiKhoan[i];
        if ((tk.taikhoan || tk.taiKhoan) === taiKhoan &&
            (tk.matkhau || tk.matKhau) === matKhau) {
            sessionStorage.setItem("HT_demoUser", taiKhoan);
            alert("Đăng nhập thành công!");
            document.getElementById("login-matkhau").value = "";
            window.location.hash = "#/home";
            return;
        }
    }
    alert("Sai tài khoản hoặc mật khẩu!");
}

function capNhatTrangDangNhap() {
    var ten = sessionStorage.getItem("HT_demoUser");
    document.getElementById("loginStatus").textContent =
        ten ? "Đang đăng nhập (mô phỏng): " + ten : "Bạn chưa đăng nhập.";
    document.getElementById("logoutBtn").hidden = !ten;
}

function dangXuat() {
    sessionStorage.removeItem("HT_demoUser");
    alert("Đã đăng xuất khỏi bản mô phỏng.");
    capNhatTrangDangNhap();
}

/* ====== HO TRO: PHAN KHIẾU NẠI CHỈ MÔ PHỎNG ====== */
function guiKhieuNai() {
    var ten = document.getElementById("tenkn").value.trim();
    var mail = document.getElementById("mailkn").value.trim();
    var lyDo = document.getElementById("lydo").value.trim();
    var noiDung = document.getElementById("noidungkn").value.trim();
    if (!ten || !mail || !lyDo || !noiDung) {
        alert("Vui lòng điền đầy đủ các ô khiếu nại.");
        return;
    }
    alert("Đã nhận thông tin trong giao diện mô phỏng. Yêu cầu chưa được gửi đến cửa hàng.");
}

/* ====== DANH GIA SAN PHAM: MO PHONG ====== */
var diemDanhGia = 5;
function khoiTaoDanhGia() {
    var stars = document.getElementById("stars");
    for (var i = 1; i <= 5; i++) {
        var nut = document.createElement("button");
        nut.type = "button";
        nut.className = "review-star";
        nut.textContent = "★ " + i;
        nut.setAttribute("data-rating", i);
        nut.onclick = function () {
            diemDanhGia = Number(this.getAttribute("data-rating"));
            capNhatSao();
        };
        stars.appendChild(nut);
    }
    capNhatSao();
    document.getElementById("sendRev").onclick = guiDanhGia;
}
function capNhatSao() {
    var nut = document.querySelectorAll("#stars .review-star");
    for (var i = 0; i < nut.length; i++) {
        nut[i].classList.toggle("selected", Number(nut[i].getAttribute("data-rating")) === diemDanhGia);
    }
}
function hienThiDanhGia() {
    if (!sanPhamDangChon) return;
    var ten = sessionStorage.getItem("HT_demoUser");
    document.getElementById("loginNote").hidden = !!ten;
    document.getElementById("formBox").hidden = !ten;
    var danhGia = [];
    try { danhGia = JSON.parse(localStorage.getItem("HT_reviews_" + sanPhamDangChon.id) || "[]"); } catch (e) {}
    if (!Array.isArray(danhGia)) danhGia = [];
    var khu = document.getElementById("revList");
    khu.innerHTML = "";
    var tong = 0;
    for (var i = 0; i < danhGia.length; i++) {
        var dong = document.createElement("div");
        dong.className = "review-entry";
        dong.textContent = danhGia[i].user + " – " + danhGia[i].rating + "/5 ★: " + danhGia[i].text;
        khu.appendChild(dong);
        tong += Number(danhGia[i].rating);
    }
    document.getElementById("avg").textContent = danhGia.length ?
        "(" + (tong / danhGia.length).toFixed(1) + "/5)" : "(Chưa có đánh giá)";
}
function guiDanhGia() {
    var user = sessionStorage.getItem("HT_demoUser");
    if (!user) { alert("Vui lòng đăng nhập trước khi đánh giá."); return; }
    if (!sanPhamDangChon) return;
    var noiDung = document.getElementById("revText").value.trim();
    if (!noiDung) { alert("Vui lòng nhập nội dung đánh giá."); return; }
    var key = "HT_reviews_" + sanPhamDangChon.id;
    var ds = [];
    try { ds = JSON.parse(localStorage.getItem(key) || "[]"); } catch (e) {}
    if (!Array.isArray(ds)) ds = [];
    ds.push({ user: user, rating: diemDanhGia, text: noiDung });
    localStorage.setItem(key, JSON.stringify(ds));
    document.getElementById("revText").value = "";
    hienThiDanhGia();
}

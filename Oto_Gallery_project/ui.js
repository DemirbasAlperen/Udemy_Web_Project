// Arayüz işlemleri

// form içine ekleme constructor ı
function UI() {

}

UI.prototype.addCarToUI = function (newCar) {    // UI prototype ını oluşturduk

    /*
    <!-- <tr>
    <td><img src="" class="img-fluid img-thumbnail"></td>
    <td></td>
    <td></td>
    <td><a href="#" id = "delete-car" class = "btn btn-danger">Aracı Sil</a></td>
    </tr> -->
    <!-- <tr>
    <td><img src="" class="img-fluid img-thumbnail"></td>
    <td></td>
    <td></td>
    <td><a href="#" id = "delete-car" class = "btn btn-danger">Aracı Sil</a></td>
    </tr> -->  */


    const carList = document.getElementById("cars");

    carList.innerHTML += `
        <tr>
            <td><img src="${newCar.url}" class="img-fluid img-thumbnail"></td>
            <td>${newCar.title}</td>
            <td>${newCar.price}</td>
            <td><a href="#" id = "delete-car" class = "btn btn-danger">Aracı Sil</a></td>
        </tr>
    `

}

// form kısmında yazılan yazıların otomatik temizlenmesi(form temizleme inputu)
UI.prototype.clearInputs = function (element1, element2, element3) {
    element1.value = "";
    element2.value = "";
    element3.value = "";
}

// Hata ve bilgilendirme mesajları 
UI.prototype.displayMessages = function (message, type) {

    const cardBody = document.querySelector(".card-body");

    // Alert div ini oluşturma
    const div = document.createElement("div");

    div.className = `alert alert-${type}`    // div class ını verme
    div.textContent = message;        // div content ini belirleme

    cardBody.appendChild(div);    // oluşturduğumuz div i cardBody içerisine ekledik

    setTimeout(function () {      // ekranda görünen mesajın süresini(2 saniye) ayarladık
        div.remove();
    }, 2000);
}

UI.prototype.loadAllCars = function(cars) {
    const carList = document.getElementById("cars");      // araçlarımız index.html içerisindeki tbody(id="cars") içerisinde bu id yi seçiyoruz

    cars.forEach(function (car) {
        // her defasında innerHTML üzerine ilave olcağı için (+=) kullanırız
        carList.innerHTML += `          
        <tr>
            <td><img src="${car.url}" class="img-fluid img-thumbnail"></td>
            <td>${car.title}</td>
            <td>${car.price}</td>
            <td><a href="#" id = "delete-car" class = "btn btn-danger">Aracı Sil</a></td>
        </tr>
    `
    });
}

UI.prototype.deleteCarFromUI = function(element){
    element.parentElement.parentElement.remove();      // element in ebeveyninin ebeveynine erişip sildik
}

UI.prototype.clearAllCarsFromUI = function(){
    const carList = document.getElementById("cars");    // Önce araç listesi seçildi

    // carList.innerHTML = "";   // 1.silme yöntemi  

    while(carList.firstElementChild !== null) {          // yani içeride çocuk olduğu sürece ilk çocuğu silecek
        carList.firstElementChild.remove();
        
    }      


}
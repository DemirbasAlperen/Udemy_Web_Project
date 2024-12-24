// Projemizin ana js dosyası

// form seçimi
const form = document.getElementById("car-form");
const titleElement = document.querySelector("#title");
const priceElement = document.querySelector("#price");
const urlElement = document.querySelector("#url");

// aracı silme işlemi için yapılan seçiml
const cardbody = document.querySelectorAll(".card-body")[1];   // ikinci card-body sınıfını seçtim 

// Tüm araçları silme işlemi için yapılan seçim
const clear = document.getElementById("clear-cars");

// UI Objesini Başlatma:

const ui = new UI();

const storage = new Storage();


// Tüm Eventleri Yükleme

eventListeners();

function eventListeners() {
    form.addEventListener("submit",addCar);     // araç ekleme için submit event ini ekledik

    document.addEventListener("DOMContentLoaded", function(){    // LS dan tüm araçları sayfamıza yüklememiz gerekiyor. Yani sayfa yenilendiğinde araçlarımız görünecek.
        let cars = storage.getCarsFromStorage();
        ui.loadAllCars(cars);   // araçları ui.js de oluşturduğumuz loadAllCars() a gönderdik
    });

    cardbody.addEventListener("click",deleteCar);   // deleteCar fonksiyonunu altta oluşturduk 

    clear.addEventListener("click",clearAllCars);   // clearAllCars  fonksiyonunu en altta oluşturduk
}

// addCar bölümünü oluşturma
function addCar(e) {
    
    const title = titleElement.value;    // seçilen elementlerin değerlerini(value) alacağız
    const price = priceElement.value;
    const url = urlElement.value;

    // araç ekleme bölümünde boş alan bırakılırsa hata ile karşılaşma koşulu oluşturalım.
    if (title === "" || price === "" || url === "") {
        
        // ui.js deki hata mesajını buraya çektik
        ui.displayMessages("Lütfen tüm alanları doldurun...", "danger"); 
    }
    else{  // form boş değilse yeni araç oluşturulsun
        // yeni araç
        const newCar = new Car(title,price,url);

        ui.addCarToUI(newCar);   // arayüze araç ekleme

        // araç eklendi mesajından önce aracın local storage ye eklenmesi gerekiyor
        storage.addCarToStorage(newCar);

        // ui.js deki hata mesajını buraya çektik
        ui.displayMessages("Araç başarıyla eklendi...", "success");

    }

    ui.clearInputs(titleElement,urlElement,priceElement);    // ui.js deki form temizleme inputunu burada çağırdık

    e.preventDefault();    // sayfa yenilenmesini engelledik 
    // Not: e.preventDefault(); bunu yazmadığım zaman console da yadırmak istediklerim görünmedi

}

function deleteCar(e){
    
    if (e.target.id === "delete-car") {
        ui.deleteCarFromUI(e.target);       // buradaki fonksiyon ui.js içerisinde olulturuldu

        storage.deleteCarFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);           // aracın ismine bu şekilde ulaşabiliyoruz. LS den silme işlemi için
        // e.target = buton erişimi bunun ebeveyni ve bunun kardeşi ve yine bunun kardeşi bununda text i alınacak

        ui.displayMessages("Silme işlemi başarıyla gerçekleşti...", "success");   //LS den silme işlemi gerçekleşince mesaj verecek
    }
}

function clearAllCars(){
    
    if(confirm("Tüm araçlar silinecek. Emin misiniz?")) {      // Kullanıcıya sorulur ve cevap evet ise aşağıdaki işlemler gerçekleşir

        ui.clearAllCarsFromUI();         // Önce arayüzden sildik
        storage.clearAllCarsFromStorage();   // Sonra LS den sildik
    }

}
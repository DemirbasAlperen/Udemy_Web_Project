// Local storage işlemleri

function Storage() {

    Storage.prototype.addCarToStorage = function (newCar) {   // addCarToStorage adında bir yöntem oluşturup bunu Storage nesnesinin prototipine ekledik.

        let cars = this.getCarsFromStorage();

        cars.push(newCar);     // yeni aracın yüklenmesi

        localStorage.setItem("cars",JSON.stringify(cars));    // yeni aracı LS içerisine alırken yeniden string olarak dönüştürdük 
    }

    Storage.prototype.getCarsFromStorage = function () { // LS sorgu işleminin fonksiyonunu oluşturduk, istediğimiz yerde kullanabiliriz.

        let cars;

        if (localStorage.getItem("cars") === null) {      // localStorage içerisinde cars objesi yoksa boş dizi
            cars = [];
        }
        else {   // aksi halde cars objesini ekle
            cars = JSON.parse(localStorage.getItem("cars"));     // string değeri parse edip dizi ye çevirdik. LS sadece string değerleri kabul ettiği için

        }
        return cars;
    }
}

Storage.prototype.deleteCarFromStorage = function(carTitle) {
    let cars = this.getCarsFromStorage();

    cars.forEach(function(car,index){     // forEach ile içeride gezindik
        cars.splice(index,1);             // cars içerisinden splice ile index elemanını 1 tane olarak (yani kendisini) sildik
        localStorage.setItem("cars", JSON.stringify(cars));       // silme işleminden sonra LS güncelledik.
    });
};

Storage.prototype.clearAllCarsFromStorage = function() {
    localStorage.removeItem("cars");         // LS deki cars key lerini silince tamamı silinmiş olacak
}
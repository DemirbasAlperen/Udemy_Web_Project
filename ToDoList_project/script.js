// Todo Eleman Ekleme:

// Eleman seçimi

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list")
// const items = ["Todo 1", "Todo 2", "Todo 3", "Todo 4"];      // index içerisindeki li leri silip burada dizi olarak oluşturduk. Bu sayede kolayca Todo listesini çoğaltabiliriz.

// Todo ları storage a ekleme
let todos; 


// load items
loadItems();


eventListeners();

function eventListeners() {
    // submit event
    form.addEventListener("submit", addNewItem);
    // delete an item
    taskList.addEventListener("click", deleteItem);
    // delete all item
    btnDeleteAll.addEventListener("click", deleteAllItems);
}

function loadItems() {             // Todo listesini burada fonksiyon kullanarak yaparak daha profesyonel bir kod yazmış oluyoruz
    todos = getItemsFromLS();    // local storage den verileri çektik
    todos.forEach(function (item) {   // foreach ile dönerek item oluşturacak
        createItem(item);
    })
}

// get itemsfrom local storage
function getItemsFromLS(){
    if(localStorage.getItem("todos") === null) {   // localStorage.getItem : local storage içersindeki bilgileri getirir. Koşul ; bu bilgilerin içerisi boş(null) ise
        todos = [];   // boş olarak tanımlanmasını istiyoruz
    } 
    else {     // boş değilse
        todos = JSON.parse(localStorage.getItem("todos"));    // todos içerisine local storage içinde(todos) bulunan bilgileri dahil ettik bu bilgileri getirecek.
        // JSON.parse(....) kullanarak parantez içerisinde bulunan string veriyi dizi olarak dönüştürüp bize verecek
    }
    return todos;
}

// set item to local storage (local storage de veri oluşturma) 
function setItemToLS(newTodo) {
    todos = getItemsFromLS();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));   // todos u string e çevirerek local storage içerisine set ettim
}


function createItem(newTodo) {    // burada createItem isimli bir fonksiyon oluşturarak li ve a yı oluşturma da kolaylık sağladık

    // li oluşturma
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    // input alanından girilen değeri li ile bağladık (appendChild)
    li.appendChild(document.createTextNode(newTodo));

    // a oluşturma
    const a = document.createElement("a");
    a.classList = "delete-item float-right";    // a class ını bağladık
    a.setAttribute("href", "#");                  // a içerisine href ekledik
    a.innerHTML = '<i class="fas fa-times"></i>';  // silme x işaretini ekledik

    li.appendChild(a);           // a yı li ye dahil ettik
    taskList.appendChild(li);    // li yi de ul içerisine ekledik yani task list içerisine
}

function addNewItem(e) {
    if (input.value === '') {        // burada form kısmı boş bırakılmasın diye koşul ekledik bu sayade bize uyarı verecek
        alert("add new item");
        //console.log("submit");
    }

    // createItem
    createItem(input.value);      // Listemize yeni Todo eklemek için burada  yukarıda oluşturduğumuz fonksiyonu yazdık ve içerisinde ise text yerine input.value yazdık. Yani kullanıcının gireceği değer 

    // yukarıda oluşturduğumuz setItemToLS i buraya dahil ediyoruz
    setItemToLS(input.value);


    input.value = "";    // listeye ekleme yapınca text kısmının tekrar boş kalması için yazdık

    e.preventDefault();    // sayfanın otomatik olarak yenilenmesini kapattık.
}


// Todo Eleman Silme:
// İlk önce yukarıda eventListeners içerisinde delete an item kısmını oluşturduk

function deleteItem(e) {

    if (e.target.className === "fas fa-times") {    // tıklandıktan sonraki hedef kısmın className si fas fa-times değerine eşitse koşul sağlanacak. Kısaca sadece x işaretinin çalışmasını sağladık

        if (confirm("Silmek İstediğinize Emin Misiniz?")) {

            // console.log(e.target);
            e.target.parentElement.parentElement.remove();  // silme ikonunun parent ı a etiketi onun da parenti li etiketidir. O yüzden burada bu şekilde yazdık
            deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);   // Aşağıdaki local storage den silme fonksiyonunu burada çalıştırdık
        }
    }
    e.preventDefault();   // Otomatik olan sayfa yenilenmesini kapatır.

}


function deleteTodoFromStorage(deleteTodo) {
    let todos = getItemsFromLS();   // LS den veriyi çektik

    todos.forEach(function(todo,index){     // LS içerisinde dolaşmamız gerekiyor bu sebeple foreach kullandık
        // Kullanıcının silmek için tıkladığı eleman ile silinmesi gereken eleman LS de var mı ona bakmamız gerekiyor. (if kullanarak) 
        if (todo === deleteTodo){
            todos.splice(index,1);   // splice : bulunduğu noktadan itibaren kaç tane veri sileceğini index numarası olarak belirtebiliriz 
        }
    });  
    localStorage.setItem("todos",JSON.stringify(todos)); // üst kısımda silme tamamlandı ve burada son halini Ls e gönderdik

}


// Tüm Elemanları Silme:
// ilk önce yukarıda eventListeners içerisinde delete all item kısmını oluşturduk

function deleteAllItems(e) {

    // 1.yol
    if (confirm("Tüm Elemanları Silmek İstediğinize Emin Misiniz?")) {
        
        while(taskList.firstChild){       // koşul : listemizin ilk elemanı olduğu sürece
            taskList.removeChild(taskList.firstChild);   // removeChild ile her seferinde ilk elemanı silerek listeyi boşaltabiliriz.
        }       
        // sayfadaki elemanlar silinince LS de temizlenmesi gerekiyor. Bunun için aşağıdaki işlem yeterlidir.
        localStorage.clear();
        
    }


    // 2. yol
    // taskList.innerHTML="";   // Yukarıdaki işlem yerine bu da kullanılabilir. Burada html içerisini boşaltmasını istedik bu da binevi silem işlemi yapacaktır.

}


// Proje Aşamaları: 

// 1. Todo Eleman Ekleme
// 2. Todo Eleman Silme
// 3. Diziden Todo Elemanlarını Aktarma
// 4. Todo'ları Storage'a Ekleme
// 5. Todo'ları Storage'den Silme
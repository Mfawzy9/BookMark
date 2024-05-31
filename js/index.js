

var siteNameInput = document.getElementById("siteNameInput");
var siteUrlInput = document.getElementById("siteUrlInput");
var searchInput = document.getElementById("searchInput");

// btn vars
var saveSite = document.getElementById("saveSite");
var editSite = document.getElementById("editSite");


//validation alert vars
//// name
var nameMsgInvalid = document.getElementById("nameMsgInvalid");
var nameMsgValid = document.getElementById("nameMsgValid");
//// url
var urlMsgInvalid = document.getElementById("urlMsgInvalid");
var urlMsgValid = document.getElementById("urlMsgValid");

// delete all btn
var deleteAllBtn = document.getElementById('deleteAllBtn');
var deleteConfirm = document.getElementById("deleteConfirm")

//edit index
var index ;

// mother array
var sitesList ;


if(localStorage.getItem('sitesContainer') == null){
    sitesList = [];
}else{
    sitesList = JSON.parse(localStorage.getItem('sitesContainer'));
    displayData();
};

if(sitesList.length === 0){
    deleteAllBtn.classList.add('d-none');
}else{
    deleteAllBtn.classList.remove('d-none');
};



// pulling inputs values from user
function addSite(){
    if(validationName() == true && validationUrl() == true){
        var site ={
            siteName : siteNameInput.value ,
            siteUrl : siteUrlInput.value
        }
    
        sitesList.push(site);
    
        localStorage.setItem('sitesContainer' , JSON.stringify(sitesList));
    
        displayData();
    
        clearForm();

        deleteAllBtn.classList.remove('d-none');

        nameMsgValid.classList.add("d-none");
        urlMsgValid.classList.add("d-none");

        siteNameInput.classList.remove("is-valid");
        siteUrlInput.classList.remove("is-valid");

        document.getElementById("done").classList.remove("d-none");
        setTimeout( alright ,2000 );
        
    }else{
        openingValidtionWindow();
    };

};

// done alert delay
function alright(){
    document.getElementById("done").classList.add("d-none");
    document.getElementById("updated").classList.add("d-none");
};

// adding the input value to the table list
function displayData(){
    var container = ``;

    for( var i = 0 ; i < sitesList.length ; i++){
        container += `
    <tr>
        <td>${i + 1}</td>
        <td>${sitesList[i].siteName}</td>
        <td><button onclick="visitUrl(${i})" class="btn btn-sm btn-success"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
        <td><button onclick="editTable(${i})" class="btn btn-sm btn-warning"><i class="fa-solid fa-pen pe-2"></i></i>Edit</button></td>
        <td><button onclick="deleteItems(${i})" class="btn btn-sm btn-danger"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
    </tr>`;
    };

    document.getElementById("tableData").innerHTML = container;
};

// clear inputs
function clearForm(){
    siteNameInput.value = null;
    siteUrlInput.value = null;
    searchInput.value = null;
};

// edit table btn
function editTable(editIndex){
    siteNameInput.value = sitesList[editIndex].siteName;
    siteUrlInput.value = sitesList[editIndex].siteUrl;

    saveSite.classList.add("d-none");
    editSite.classList.remove("d-none");

    window.scrollTo(0, 0);

    index = editIndex;
};

function editData(){
    if(validationName() == true && validationUrl() == true){
    var site ={
        siteName : siteNameInput.value ,
        siteUrl : siteUrlInput.value
    }

    sitesList.splice( index , 1  , site);

    localStorage.setItem('sitesContainer' , JSON.stringify(sitesList));

    displayData();

    clearForm();

    saveSite.classList.remove("d-none");
    editSite.classList.add("d-none");

    nameMsgValid.classList.add("d-none");
    urlMsgValid.classList.add("d-none");

    siteNameInput.classList.remove("is-valid");
    siteUrlInput.classList.remove("is-valid");

    document.getElementById("updated").classList.remove("d-none");
    setTimeout( alright ,2000 )

    }else{
    openingValidtionWindow();
    }
};

// delete item from the list
function deleteItems(deleteIndex){
    sitesList.splice(deleteIndex , 1);

    localStorage.setItem('sitesContainer' , JSON.stringify(sitesList));

    displayData();

    if (sitesList.length === 0) {
        deleteAllBtn.classList.add('d-none');
    };
};

// delete all
function deleteAll(){
    deleteConfirm.classList.remove('d-none');
};

function deleteConfirmed(){

    sitesList = [];
    
    displayData();

    localStorage.setItem('sitesContainer' , JSON.stringify(sitesList));



    deleteAllBtn.classList.add('d-none');
    deleteConfirm.classList.add('moves-out');
    document.getElementById("deleteConfirmed").classList.remove("d-none");

    setTimeout(   deleteConfirmedWindow       ,2000 );
    function deleteConfirmedWindow(){
        deleteConfirm.classList.add('d-none');
        deleteConfirm.classList.remove('moves-out');
        document.getElementById("deleteConfirmed").classList.add("d-none");
    };
};

function deleteCancel(){
    deleteConfirm.classList.add('moves-out');

    setTimeout(   closeDeleteWindow       ,1000 );
    function closeDeleteWindow(){
        deleteConfirm.classList.add('d-none');
        deleteConfirm.classList.remove('moves-out');
    };
};

// visit input
function visitUrl(visitIndex){

    if(sitesList[visitIndex].siteUrl.startsWith("https://")){
        window.open( sitesList[visitIndex].siteUrl , '_blank');
    }else{
        window.open("https://"+ sitesList[visitIndex].siteUrl , '_blank');
    };
};

// search input
function searchitems(){
    var searchKey = searchInput.value;

    var container = ``;

    for( var i = 0 ; i < sitesList.length ; i++){
        if(sitesList[i].siteName.toLowerCase().includes(searchKey.toLowerCase())){
            container += `
            <tr>
                <td>${i + 1}</td>
                <td>${sitesList[i].siteName}</td>
                <td><button onclick="visitUrl(${i})" class="btn btn-sm btn-success"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
                <td><button onclick="editTable(${i})" class="btn btn-sm btn-warning"><i class="fa-solid fa-pen pe-2"></i></i>Edit</button></td>
                <td><button onclick="deleteItems(${i})" class="btn btn-sm btn-danger"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
            </tr>`;
            };
        };

    document.getElementById("tableData").innerHTML = container;
};

// validation name
function validationName(){
    var userText = siteNameInput.value;

    var regex = /^.{3,20}$/;

    if( regex.test(userText) == true ){
        siteNameInput.classList.add('is-valid');
        siteNameInput.classList.remove('is-invalid');
        nameMsgInvalid.classList.add("d-none");
        nameMsgValid.classList.remove('d-none');
        return true;
    }else{
        siteNameInput.classList.add('is-invalid');
        siteNameInput.classList.remove('is-valid');
        nameMsgInvalid.classList.remove("d-none");
        nameMsgValid.classList.add('d-none');

        siteNameInput.classList.add("shake");
        setTimeout(   removeNameShake       ,1000 );
        function removeNameShake(){
            siteNameInput.classList.remove("shake");
        }
        return false;
    }

};

// validation URL
function validationUrl(){
    var userUrl = siteUrlInput.value;
    // /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/.*)?$/;
    var regex = /^(https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-]{2,20}(?:\.[a-zA-Z]{2,3}){0,2}(?:\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;

    if(regex.test(userUrl) == true){
        siteUrlInput.classList.add("is-valid");
        siteUrlInput.classList.remove("is-invalid");
        urlMsgInvalid.classList.add('d-none');
        urlMsgValid.classList.remove('d-none');
        return true;
    }else{
        siteUrlInput.classList.add("is-invalid");
        siteUrlInput.classList.remove("is-valid");
        urlMsgInvalid.classList.remove('d-none');
        urlMsgValid.classList.add('d-none');

        siteUrlInput.classList.add("shake")
        setTimeout(   removeUrlShake       ,1000 );
        function removeUrlShake(){
            siteUrlInput.classList.remove("shake");
        };
        return false;
    }
};

// validation window
function closingValidtionWindow(){

    document.getElementById('exitMsg').classList.add("moves-out");

    setTimeout(   closeWindowAnimation       ,1000 );
    function closeWindowAnimation(){
        document.getElementById('exitMsg').classList.add("d-none");
        document.getElementById('exitMsg').classList.remove("moves-out");
    };

};

function openingValidtionWindow(){
    document.getElementById('exitMsg').classList.remove("d-none");
};

// changing dark mode icon
var dModeIcon = function(icon){
    icon.classList.toggle("fa-moon");
};


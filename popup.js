
//use button "Login" and redirect to cognito front end and delete popup contents
function clickHandler(e) {

    chrome.tabs.create({url:"https://slant.auth.us-west-2.amazoncognito.com/login?response_type=token&client_id=68qqmdg46ulqtqffpuhjqu88ke&redirect_uri=https://psalabs.us"});
    window.close(); //
};

function upload(){
    var newbody = '<form class=\"md-form\"><div class=\"file-field\"><a class=\"btn-floating purple-gradient mt-0 float-left\"><i class=\"fas fa-cloud-upload-alt\"></i><input type=\"file\"></a><div class=\"file-path-wrapper\"><input class=\"file-path validate\" type=\"text\" placeholder=\"Upload your file\"></div></div></form>'
    document.getElementById('bodyshift').innerHTML=newbody
};

function biasview(){

       chrome.storage.local.get(apiReturn, function){
        //display on document.getElementById("SlantPopup") is CLICKED
        //MOE FILL IN UR MAGIC HERE
     }
}

var port = chrome.extension.connect({
   name: "Bias Data"
});

port.onMessage.addListener(function(msg) {
     console.log("message recieved " + msg);
     var tabId = msg.toString();
     chrome.storage.local.get(tabId, function(result) {

       var x = document.getElementById("SlantPopup");
       let outProb = ((result[tabId].prob - 50)) * 2
       x.querySelector('.scoreforslant').innerHTML = outProb + "%"; //current way to display labels in popup

       var y = document.getElementById("SlantPopup2");
       y.querySelector('.partyforslant').innerHTML = result[tabId].party;

       document.getElementById("SlantTitle").querySelector('.titleforslant').innerHTML = result[tabId].title;
       document.getElementById("SlantSummary").querySelector('.summaryforslant').innerHTML = result[tabId].summary;
       document.getElementById("SlantKeywords").querySelector('.keywordsforslant').innerHTML = result[tabId].keywords.slice(0, 5).join(', ');
       document.getElementById("SlantUsername").querySelector('.usernameforslant').innerHTML = result[tabId].uid;
     });

});

chrome.storage.local.get(['party'], function(result) {
  //var y = document.getElementById("SlantPopup2");
  //y.querySelector('.partyforslant').innerHTML = result.party;
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login_btn').addEventListener('click', clickHandler);
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('SendVideo').addEventListener('click', upload);
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('SlantPopup').addEventListener('click', biasview);
});

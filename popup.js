
//use user icon to redirect to cognito front end and authenticate
function clickHandler(e) {

    chrome.tabs.create({url:"https://slant.auth.us-west-2.amazoncognito.com/login?response_type=token&client_id=68qqmdg46ulqtqffpuhjqu88ke&redirect_uri=https://psalabs.us"});
    window.close(); //
};

function animate(){
    var c = new CountUp("target_animate",0,30,0,1, {
        useEasing: true
    });
    c.start();
        };

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

       document.getElementById("SlantKeywords").querySelector('.keywordsforslant').innerHTML = result[tabId].keywords;
     });

});

chrome.storage.local.get(['party'], function(result) {
  //var y = document.getElementById("SlantPopup2");
  //y.querySelector('.partyforslant').innerHTML = result.party;
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login_btn').addEventListener('click', clickHandler);
});

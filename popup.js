
//use button "Login" and redirect to cognito front end and delete popup contents
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
        
chrome.storage.local.get(['prob'], function(result) {
  var x = document.getElementById("SlantPopup");
  x.querySelector('.scoreforslant').innerHTML = result.prob + "%"; //current way to display labels in popup
});

chrome.storage.local.get(['party'], function(result) {
  var y = document.getElementById("SlantPopup2");
  y.querySelector('.partyforslant').innerHTML = result.party;
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login_btn').addEventListener('click', clickHandler);
});

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('target_animate').addEventListener('mouseover', animate);
});

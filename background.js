chrome.runtime.onInstalled.addListener(function() 
{
	chrome.history.search({"text": "", "startTime": 0 , "maxResults": 1000000000}, function callback(results) 
	{ 
		//store user history to dynamo on first install
		var json= JSON.stringify(results);
		console.log(JSON.parse(json));
	}) 
});

chrome.tabs.getSelected(null, function(tab) 
{ //get current tab URL from extension

	var tablink = tab.url;
});

var apigClientFactory = require('aws-api-gateway-client').default;

var apigClient = apigClientFactory.newClient();

var body =
{
	"url": "https://9rautkbsa5.execute-api.us-west-2.amazonaws.com/test",
	"method": "POST",
	"data": tablink
};

apigClient.chromeurl(params, body, addtionalParams)

	.then(function(result){
      // Add success callback code here.
    }).catch( function(result){
      // Add error callback code here.
    });
/*chrome.runtime.onInstalled.addListener(function() 
{
	chrome.history.search({"text": "", "startTime": 0 , "maxResults": 1000000000}, function callback(results) 
	{ 
		//store user history to dynamo on first install
		var json= JSON.stringify(results);
		console.log(JSON.parse(json));
	}) 
});*/

chrome.tabs.onUpdated.addListener(function(id,activeInfo,tab) 
{
	if(activeInfo.status != ("complete"))
		return;
  // how to fetch tab url using activeInfo.tabid
 // chrome.tabs.get(activeInfo.tabId, function(tab)
//  {
  	var tablink = tab.url;
    
    console.log(tablink.substring(0,4)); //display url on console

     	if (tablink.substring(0,4) == 'http')
     	{
     		var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.

		// Open a new connection, using the GET request on the URL endpoint
		request.open('POST', 'https://3xe435ebm9.execute-api.us-east-2.amazonaws.com/Dev/classifyurl', true);

		/*var temp = {"input": "{\"data\": \"https://www.cnn.com/2018/12/03/opinions/mueller-is-about-to-have-his-say-honig/index.html\"}",
	   "stateMachineArn": "arn:aws:states:us-east-2:313327970627:stateMachine:Choicestate"}*/
		
		var temp = '{"data": "'+tablink+'"}'
		//var temp2 = {"data": tablink}
		//var temp =  {"data": "https://www.cnn.com/2018/12/03/opinions/mueller-is-about-to-have-his-say-honig/index.html"}
		var payload = JSON.parse(temp)

		console.log(payload);

		var output = request.send(temp);
	    }

	   console.log(request.body);

	   /* else
	    	console.log("error");*/
       
      
  //});
}); 





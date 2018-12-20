//handling url pull from each active chrome tab
chrome.tabs.onUpdated.addListener(function(id,activeInfo,tab) 
{
	if(activeInfo.status != ("complete"))
		return;

  	var tablink = tab.url;
    
    console.log(tablink.substring(0,4)); //display url on console

     	if (tablink.substring(0,4) == 'http')
     	{
     		var request = new XMLHttpRequest(); // initiate http request

		// Open a new connection, use GET method on the api endpoint
		request.open('POST', 'https://3xe435ebm9.execute-api.us-east-2.amazonaws.com/Dev/classifyurl', true);
		
		var temp = '{"data": "'+tablink+'"}' //append url in a new variable for expected format

		var payload = JSON.parse(temp)

		console.log(payload);

		var output = request.send(temp);

		request.onreadystatechange = function() 
		{ 
			var out = request.responseText;
			console.log(out);
			document.querySelector('.classifyText').innerHTML = out; //current way to clean up text in website
		};
	    }

}); 
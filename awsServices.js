var awsServices = (function()
{
	var gateway;
})

function initGateway(region)
{
	gateway = new AWS.APIGateway ({ region: region});
}

initGateway: function
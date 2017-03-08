var xmlHttp = createXmlHttpRequestObject();


// create function to create object for communication

function createXmlHttpRequestObject() {
	var xmlHttp;

	if(window.ActiveXObject){
		try {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch(e) {
			xmlHttp = false;
		}
	} else {
		try {
			xmlHttp = new XMLHttpRequest();  //allows to communicate with the server behind the scenes
		} catch(e) {
			xmlHttp = false;
		}
	}

	if(!xmlHttp)
		alert("cant create that object hoss!");
	else
		return xmlHttp;
}


function fetchData() {
	if(xmlHttp.readyState==0 || xmlHttp.readyState==4) {
		xmlHttp.open("GET", "getMyOrder.json", true);
		xmlHttp.onreadystatechange = handleServerResponse;
		xmlHttp.send(null);
	} else {
		setTimeout('fetchData()',1000);
	}
}
	

function handleServerResponse() {
	if(xmlHttp.readyState==4) {           						// done with communication
		if(xmlHttp.status==200) {         						// communication session went OK
			xmlResponse = xmlHttp.responseText;
			document.getElementById("input").innerHTML = '<span style="color:blue">' + xmlResponse + '</span>';
			setTimeout('process()',1000);     //wait a second and then communicate with the server
		} else {
			alert("Something went wrong!");
		}


	}
}

/* peer.js sandbox */
//(function() {

	connected = false;
	//connect To Peer given ID
	function connectToPeer(){
		if (!connected){
			connected = true;
			peerId = document.getElementById("theirId").value; 
			var conn = peer.connect(peerId);
			openConnection(conn);
			return false;
		}
	}

	//connection is now open
	function openConnection(conn){
		console.log("3");
		conn.on('open', function() {
				window.alert("connected to peer -- now you can communicate directly with their browser.");
				console.log("connected!");
		
  		// Send messages
  		conn.send('Hello!');
		});

  		
	}

	// create peer 
	var peer = new Peer({key: 'upfmeiivospxpqfr'});

	// set peer ID for display
	peer.on('open', function(id) {
		document.getElementById("selfId").value = id;
	});

	//listen in case another peer connects first
	peer.on('connection', function(conn) {
		connected = true; 

  		conn.on('data', function(data){
    	// Will print 'hi!'
    	console.log(data);
  		});


	});


	/** MESSAGE FUNCTIONALITY **/

	messages = [];

	function sendMessage(e){
		var message = document.getElementById("messageTypeBox").value;
		console.dir(message);
		console.log(e.value);
		messages.push(message);
		updateMessages(message,true);
	};

	function updateMessages(newMessage, fromLocal){
		//get messageBox
		var list = document.getElementById('messageBox');
		var messageElement = document.createElement('li');

		// add id
		var id = document.createAttribute("id");
		if (fromLocal){
			id.value = "selfMessage";
		} else {
			id.value = "theirMessage";
		}
		messageElement.setAttributeNode(id);

		//add class
		var classType = document.createAttribute("class");
		classType.value = "message";
		messageElement.setAttributeNode(classType);


		messageElement.appendChild(document.createTextNode(newMessage));
		list.appendChild(messageElement);

	};

	function clearMessageTypeBox(e){
		document.getElementById("messageTypeBox").value = "";


	}
	


//})();
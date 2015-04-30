$(document).ready(function(){

  //ACCESING FIREBASE VARIABLE
  var firebaseUrl = $('#chatApp').attr('firebaseUrl');

  // CREATE A REFERENCE TO FIREBASE
  var messagesRef = new Firebase(firebaseUrl);

  // REGISTER DOM ELEMENTS
  var mainDivElement = $("<header>Firebase Chat Demo</header> <div class='example-chat-toolbar'> <label for='nameInput'>Username:</label> <input type='text' id='nameInput' placeholder='enter a username...'> </div> <footer> <label for='priorityInput'>Please enter priority:</label> <select id='priorityInput'> <option value='black' selected>ASAP </option> <option value='yellow'>Hurry </option> <option value='red'>Emergency </option> </select></br> <input type='text' id='messageInput'  placeholder='Type a message...'> </footer>");
  var mainDivField = $('#chatApp');
  var homeDivField = $('#homeDiv');
  mainDivField.append(mainDivElement);
  var messageList = $('#example-messages');
  var priorityField = $('#priorityInput');
  var messageField = $('#messageInput');
  var nameField = $('#nameInput');
  
  // LISTEN FOR KEYPRESS EVENT
  messageField.keypress(function (e) {
    if (e.keyCode == 13) {
      //FIELD VALUES
      var username = nameField.val();
      var message = messageField.val();
	  var priority = priorityField.val();

	  var regex1 = /\s/i;
	  var regex2 = /^[0-9]/;
      var result1 = regex1.test(username);
	  var result2 = regex2.test(username);
	  console.log('Result of space validation :', result1);
	  console.log('Result of digit validation :', result2);
	  if (result1 || result2) {
	  alert('Incorrect username... The username must be in a single string and can not be started with a digit...');
	  $('#nameInput').focus();
	  return;
	  }
      //SAVE DATA TO FIREBASE AND EMPTY FIELD
	  messagesRef.push({name:username, text:message, priority:priority});
      messageField.val('');
    }
  });

  // Add a callback that is triggered for each chat message.
  messagesRef.limitToLast(100).on('child_added', function (snapshot) {
    //GET DATA
    var data = snapshot.val();
    var username = data.name || "anonymous";
    var message = data.text;
	var color = data.priority || "blue";
	
	var ulElement = $("<ul id='example-messages-"+username+"' class='example-chat-messages'></ul>");
	var $div = $("<div>", { id: 'old-'+username, class: 'example-chat l-demo-container' });
	$('#homeDiv').prepend($div);
	var idfieldname = '#old-'+username;
	var oldDivField = $(idfieldname);
	oldDivField.append(ulElement);
	var ulfieldname = '#example-messages-'+username;
	messageList = $(ulfieldname);
    //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
    var messageElement = $("<li>");
	var messageSpan = $("<span style='color:"+color+"'></span>");
    var nameElement = $("<strong class='example-chat-username'></strong></li>");
    nameElement.text(username);
	messageSpan.text(message);
	messageElement.prepend(nameElement);
	messageElement.append(messageSpan);
	document.getElementById('nameInput').value = '';
	$('#nameInput').focus();

    //ADD MESSAGE
    messageList.append(messageElement);

    //SCROLL TO BOTTOM OF MESSAGE LIST
    //messageList[0].scrollTop = messageList[0].scrollHeight;
  });

});
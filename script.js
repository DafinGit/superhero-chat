const messages = [
    ["Batman: What new villains have you faced?", "Superman: Well, recently I fought a giant robot that Lex Luthor built."],
    ["Superman: How is Robin doing?", "Batman: He's doing well, though sometimes reckless as usual."], 
    ["Batman: Any space adventures lately?", "Superman: Yes, teamed up with Green Lantern to stop an alien invasion."]
  ];
  
  // Function to generate random message
  function generateMessage() {
    const messageIndex = Math.floor(Math.random() * messages.length);
    const message = messages[messageIndex];
    
    return message;
  }
  
  // Generate new message every 2 seconds
  setInterval(function() {
  
    const message = generateMessage();
  
    const chatDiv1 = document.createElement('div');
    chatDiv1.classList.add('chat');
    chatDiv1.classList.add('batman');
    chatDiv1.innerHTML = message[0];
  
    const chatDiv2 = document.createElement('div');
    chatDiv2.classList.add('chat'); 
    chatDiv2.classList.add('superman');
    chatDiv2.innerHTML = message[1];
  
    const conversationDiv = document.getElementById('conversation');
    conversationDiv.appendChild(chatDiv1);
    conversationDiv.appendChild(chatDiv2);
  
  }, 2000);
// Arrays of content
const superheroes = ['Batman', 'Superman', 'Wonder Woman', 'Hulk', 'Spiderman'];
const villains = ['Joker', 'Lex Luthor', 'Loki', 'Thanos', 'Green Goblin'];
const superpowers = ['super strength', 'flight', 'speed', 'magic', 'spider senses'];
const adventures = ['defeated a robot army', 'saved the city from a meteor', 'stopped a villain from taking over the world', 'reversed time', 'flew into space'];
const gadgets = ['utility belt', 'lasso', 'shield', 'web shooters', 'power ring'];

// Helper function to get a random element from an array
function randomElement(array) {
  if (!array || array.length === 0) {
    return ""; // Return empty string for empty or undefined array
  }
  return array[Math.floor(Math.random() * array.length)];
}

// Conversation context
let currentHeroes = []; // Stores [currentSpeaker, otherHeroInConversation]
let mentionedVillains = [];
let mentionedPowers = [];
let mentionedAdventures = [];
let mentionedGadgets = [];

// Update context based on the latest message
function updateContext(message) {
  if (!message || typeof message !== 'string' || !message.includes(':')) return;

  const heroName = message.split(':')[0];
  const messageText = message.substring(message.indexOf(':') + 1).toLowerCase();

  // Update currentHeroes: heroName is the current speaker.
  // The other hero in currentHeroes (if any) becomes the listener.
  // currentHeroes should be [currentSpeaker, previousSpeaker/listener]
  if (currentHeroes.length === 0) {
    currentHeroes.push(heroName);
    let otherHero = randomElement(superheroes.filter(h => h !== heroName));
    if (otherHero) currentHeroes.push(otherHero);
    else if (superheroes.length > 0 && superheroes[0] !== heroName) currentHeroes.push(superheroes[0]); // fallback if only one other hero
    else if (superheroes.length > 0) currentHeroes.push(superheroes[0]); // fallback if only one hero total
  } else {
    const currentSpeakerIndex = currentHeroes.indexOf(heroName);
    if (currentSpeakerIndex === -1) { // New hero not in conversation joins
        currentHeroes.unshift(heroName); // New hero becomes current speaker
        if(currentHeroes.length > 2) currentHeroes.pop(); // Keep it to 2 heroes
    } else { // Existing hero spoke
        if(currentSpeakerIndex === 1) { // The listener spoke, swap them
            [currentHeroes[0], currentHeroes[1]] = [currentHeroes[1], currentHeroes[0]];
        }
        // if currentSpeakerIndex is 0, no change needed as they are already primary speaker
    }
  }
  // Ensure currentHeroes has max 2 unique heroes, with the latest speaker as currentHeroes[0]
  let uniqueHeroes = [];
  if (currentHeroes.length > 0 && currentHeroes[0] && !uniqueHeroes.includes(currentHeroes[0])) {
    uniqueHeroes.push(currentHeroes[0]);
  }
  if (currentHeroes.length > 1 && currentHeroes[1] && !uniqueHeroes.includes(currentHeroes[1])) {
    uniqueHeroes.push(currentHeroes[1]);
  }
  currentHeroes = uniqueHeroes;

  // If after all, we don't have two heroes, try to fill it (e.g. if one hero was removed)
   if (currentHeroes.length < 2 && superheroes.length >= 1) {
        let hero1 = currentHeroes.length > 0 ? currentHeroes[0] : randomElement(superheroes);
        let hero2 = randomElement(superheroes.filter(h => h !== hero1));
        if (!hero2 && superheroes.length > 0) hero2 = hero1; // Fallback if only one hero total or can't find different
        currentHeroes = [hero1, hero2];
         // Ensure speaker of the message is currentHeroes[0]
        if (currentHeroes[1] === heroName && currentHeroes[0] !== heroName) {
            [currentHeroes[0], currentHeroes[1]] = [currentHeroes[1], currentHeroes[0]];
        }
   }


  // Extract and store entities
  villains.forEach(v => {
    if (messageText.includes(v.toLowerCase()) && !mentionedVillains.includes(v)) {
      mentionedVillains.push(v);
    }
  });

  superpowers.forEach(p => {
    if (messageText.includes(p.toLowerCase()) && !mentionedPowers.includes(p)) {
      mentionedPowers.push(p);
    }
  });

  adventures.forEach(a => {
    if (messageText.includes(a.toLowerCase()) && !mentionedAdventures.includes(a)) {
      mentionedAdventures.push(a);
    }
  });

  gadgets.forEach(g => {
    if (messageText.includes(g.toLowerCase()) && !mentionedGadgets.includes(g)) {
      mentionedGadgets.push(g);
    }
  });
}


// Generate a message (initial message in a turn)
function generateMessage() {
  // currentHeroes[0] is speaker, currentHeroes[1] is listener/addressed hero
  if (currentHeroes.length < 2 || !currentHeroes[0] || !currentHeroes[1]) {
    // This should be initialized by setInterval, but as a fallback:
    let h1 = randomElement(superheroes);
    let h2 = randomElement(superheroes.filter(h => h !== h1));
    if (!h2 && superheroes.length > 0) h2 = h1; // If only one hero or no other distinct
    currentHeroes = [h1 || "Hero1", h2 || "Hero2"];
  }
  
  const speaker = currentHeroes[0];
  const listener = currentHeroes[1];

  const structure = Math.random() < 0.5 ? 'question' : 'statement';
  const topicOptions = ['villain', 'power', 'adventure', 'gadget'];
  const topic = randomElement(topicOptions);
  let message = "";

  if (structure === 'question') {
    switch (topic) {
      case 'villain':
        message = `${speaker}: ${listener}, faced any nasty villains lately?`;
        break;
      case 'power':
        message = `${speaker}: ${listener}, what's your most reliable superpower?`;
        break;
      case 'adventure':
        message = `${speaker}: Any exciting adventures to share, ${listener}?`;
        break;
      case 'gadget':
        message = `${speaker}: ${listener}, is that a new gadget you have?`;
        break;
      default: // Should not happen if topic is from topicOptions
        message = `${speaker}: Hey ${listener}, what's up?`;
    }
  } else { // Statement
    switch (topic) {
      case 'villain':
        const vil = randomElement(villains);
        message = `${speaker}: Just took down ${vil}. All in a day's work!`;
        break;
      case 'power':
        const pow = randomElement(superpowers);
        message = `${speaker}: My ${pow} really saved the day earlier!`;
        break;
      case 'adventure':
        const adv = randomElement(adventures);
        message = `${speaker}: You wouldn't believe it, I just ${adv}!`;
        break;
      case 'gadget':
        const gad = randomElement(gadgets);
        message = `${speaker}: I find my ${gad} to be incredibly useful.`;
        break;
      default:
        message = `${speaker}: Keeping the city safe, as usual.`;
    }
  }
  return message;
}

// Generate a response to a previous message
function generateResponse(previousMessage) {
  const prevSpeaker = previousMessage.split(':')[0];
  const messageText = previousMessage.substring(previousMessage.indexOf(':') + 1).toLowerCase();
  
  // Responder is currentHeroes[1] (the one who was listening)
  // Listener (for the response) is currentHeroes[0] (the one who spoke previously)
  if (currentHeroes.length < 2 || !currentHeroes[0] || !currentHeroes[1]) {
     // Fallback if currentHeroes isn't set up, though updateContext should handle this.
     let responderName = randomElement(superheroes.filter(h => h !== prevSpeaker)) || "HeroX";
     return `${responderName}: Indeed, ${prevSpeaker}.`;
  }

  const responder = currentHeroes[1]; 
  const listener = currentHeroes[0]; 

  // Attempt to make a relevant response
  if (messageText.includes('villain') || messageText.includes('villains')) {
    const relevantVillain = randomElement(mentionedVillains.length > 0 ? mentionedVillains : villains);
    return `${responder}: Speaking of villains, ${listener}, ${relevantVillain} is causing trouble again!`;
  } else if (messageText.includes('power') || messageText.includes('superpower')) {
    const relevantPower = randomElement(mentionedPowers.length > 0 ? mentionedPowers : superpowers);
    return `${responder}: Absolutely, ${listener}! My ${relevantPower} is essential. And yours?`;
  } else if (messageText.includes('adventure') || messageText.includes('adventures')) {
    const relevantAdventure = randomElement(mentionedAdventures.length > 0 ? mentionedAdventures : adventures);
    return `${responder}: That sounds like quite the adventure, ${listener}! It reminds me when I ${relevantAdventure}.`;
  } else if (messageText.includes('gadget') || messageText.includes('gadgets')) {
    const relevantGadget = randomElement(mentionedGadgets.length > 0 ? mentionedGadgets : gadgets);
    return `${responder}: Gadgets are key, ${listener}. I wouldn't go anywhere without my ${relevantGadget}.`;
  }

  // Generic fallback responses
  const genericResponses = [
    `${responder}: Interesting point, ${listener}.`,
    `${responder}: I see what you mean, ${listener}. We must stay vigilant.`,
    `${responder}: That's true, ${listener}. Teamwork is crucial.`,
    `${responder}: Well said, ${listener}! What else is new?`
  ];
  return randomElement(genericResponses);
}

// Generate conversation and display it
setInterval(() => {
  // Ensure we have two distinct heroes to start/continue the conversation
  if (currentHeroes.length < 2 || !currentHeroes[0] || !currentHeroes[1] || (superheroes.length > 1 && currentHeroes[0] === currentHeroes[1])) {
    let hero1 = randomElement(superheroes);
    let hero2 = randomElement(superheroes.filter(h => h !== hero1));
    
    if (superheroes.length === 0) { // No heroes defined
        currentHeroes = ["ChatBot1", "ChatBot2"];
    } else if (superheroes.length === 1 && hero1) { // Only one superhero defined
        hero2 = hero1; 
        currentHeroes = [hero1, hero2];
    } else if (hero1 && !hero2) { // One hero selected, couldn't find a different one
        hero2 = randomElement(superheroes); // Pick any, could be same if only one hero
        currentHeroes = [hero1, hero2 || hero1]; // Fallback for hero2
    } else if (!hero1 && !hero2 && superheroes.length > 0){ // both undefined but heroes exist
        hero1 = superheroes[0];
        hero2 = superheroes.length > 1 ? superheroes[1] : superheroes[0];
        currentHeroes = [hero1, hero2];
    } else { // Default if all else fails
        currentHeroes = [hero1 || "Narrator", hero2 || "System"];
    }
  }
  
  // Message 1 (currentHeroes[0] speaks to currentHeroes[1])
  const message1 = generateMessage(); 
  updateContext(message1); // Updates context, sets currentHeroes[0] as speaker of message1

  // Message 2 (currentHeroes[1] responds to currentHeroes[0])
  const message2 = generateResponse(message1);
  updateContext(message2); // Updates context, sets currentHeroes[0] as speaker of message2 (who was currentHeroes[1])

  // Display messages
  const conversationDiv = document.getElementById('conversation');
  if (conversationDiv) {
    const message1Div = document.createElement('div');
    const speaker1Name = message1.split(':')[0].trim().toLowerCase().replace(/\s+/g, '-');
    message1Div.className = `chat ${speaker1Name || 'unknown'}`;
    message1Div.textContent = message1;
    conversationDiv.appendChild(message1Div);

    const message2Div = document.createElement('div');
    const speaker2Name = message2.split(':')[0].trim().toLowerCase().replace(/\s+/g, '-');
    message2Div.className = `chat ${speaker2Name || 'unknown'}`;
    message2Div.textContent = message2;
    conversationDiv.appendChild(message2Div);
    
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
  } else {
    console.error("Conversation div not found. Ensure your HTML has <div id='conversation'></div>");
  }

}, 3000);

// Initial call to set up heroes if needed, or just wait for interval
if (superheroes.length > 0) {
    let hero1 = randomElement(superheroes);
    let hero2 = randomElement(superheroes.filter(h => h !== hero1));
    if (superheroes.length === 1) hero2 = hero1;
    else if (!hero2) hero2 = superheroes[0]; // Fallback if filter results in empty
    currentHeroes = [hero1, hero2];
} else {
    currentHeroes = ["ChatBot1", "ChatBot2"]; // Fallback if no heroes
}
console.log("Initial heroes:", currentHeroes);

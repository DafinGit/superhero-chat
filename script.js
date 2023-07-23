// Arrays of content
const superheroes = ['Batman', 'Superman', 'Wonder Woman', 'Hulk', 'Spiderman']; 

const villains = ['Joker', 'Lex Luthor', 'Loki', 'Thanos', 'Green Goblin'];

const superpowers = ['super strength', 'flight', 'speed', 'magic', 'spider senses'];

const adventures = ['defeated a robot army', 'saved the city from a meteor', 'stopped a villain from taking over the world', 'reversed time', 'flew into space'];

const gadgets = ['utility belt', 'lasso', 'shield', 'web shooters', 'power ring'];

// Conversation context
let currentHeroes = [];
let mentionedVillains = [];
let mentionedPowers = [];
let mentionedAdventures = [];
let mentionedGadgets = [];

// Generate a message
function generateMessage() {

  // Pick different message structures
  const structure = Math.random() < 0.5 ? 'question' : 'statement';

  if(structure === 'question') {
    
    // Ask about villains, powers, adventures, or gadgets
    const topic = Math.random() < 0.5 ? 'villain' : Math.random() < 0.33 ? 'power' : Math.random() < 0.5 ? 'adventure' : 'gadget';
    
    let message;
    if(topic === 'villain') {
      message = `${currentHeroes[0]}: ${currentHeroes[1]}, tell me about a villain you recently defeated!`;
    } else if (topic === 'power') {
      message = `${currentHeroes[0]}: What's your favorite superpower to use when saving the day?`; 
    } else if (topic === 'adventure') {
      message = `${currentHeroes[0]}: Been on any fun adventures lately?`;
    } else if (topic === 'gadget') {
      message = `${currentHeroes[0]}: That's a cool gadget you have, where did you get it?`;
    }
    
    return message;

  } else {

    // Make a statement about villains, powers, adventures or gadgets  
    const topic = Math.random() < 0.4 ? 'villain' : Math.random() < 0.33 ? 'power' : Math.random() < 0.5 ? 'adventure' : 'gadget';
    
    let message;
    if(topic === 'villain') {
      const villain = randomElement(mentionedVillains); 
      message = `${currentHeroes[1]}: Well ${currentHeroes[0]}, just yesterday I was fighting ${villain} when...`;
    } else if (topic === 'power') {
      const power = randomElement(mentionedPowers);
      message = `${currentHeroes[1]}: I have to say ${currentHeroes[0]}, my ${power} comes in handy quite often!`;
    } else if (topic === 'adventure') {
      const adventure = randomElement(mentionedAdventures);
      message = `${currentHeroes[1]}: Oh yes, last week I ${adventure}, it was so much fun!`; 
    } else if (topic === 'gadget') {
      const gadget = randomElement(mentionedGadgets);
      message = `${currentHeroes[1]}: This ${gadget} is my newest and greatest gadget! Let me tell you about it...`;
    }
    
    return message;
  
  }

}


// Update context
function updateContext(message) {

  const heroName = message.split(':')[0];
  if(!currentHeroes.includes(heroName)) {
    currentHeroes.unshift(heroName);
  }

  // Extract villains, powers, adventures, gadgets
  const keywords = message.match(/villain|power|adventure|gadget/g);
  if(keywords) {
    keywords.forEach(word => {
      if(word === 'villain') {
        const villain = message.split('villain')[1].trim();
        if(!mentionedVillains.includes(villain)) {
          mentionedVillains.push(villain);  
        }
      } 
      // Do same for other keywords
    });
  }

}

// Generate conversation  
setInterval(() => {
  
  const message1 = generateMessage();
  updateContext(message1);
  
  const message2 = generateResponse(message1);
  updateContext(message2);

  // Display messages

}, 3000);

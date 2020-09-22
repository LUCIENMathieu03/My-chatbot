/* 
index.js
*/

/*
* Classes definition
*/
class Message {
  constructor(type, content) {
      this.type = type;
      this.content = content;
      this.time = getFormattedDate();
  }
}

class Bot {
  constructor(avatar, name) {
    this.avatar = avatar;
    this.name = name;
    this.numberOfResponses = 0;
    this.messages = [];
    this.sentences = new Object();
    this.addMessage = (type, content) => {
      if (type == "sent") {
        this.messages.push(new Message("messages-item--sent", content));
      } else {
        this.messages.push(new Message("messages-item--received", content));
        this.numberOfResponses++;
      }
    }
    this.answer = (value) => {
      let trigger = false;

      Object.keys(this.sentences).forEach(key => {
        if (value.search(key) != -1) {
          let newMessage = this.sentences[key]();
          this.addMessage("received", newMessage);
          trigger = true;
        }
      });
      if (!trigger) {
        this.addMessage("received", "Je n'ai pas compris... (essaye d'écrire \"help\")");
      }
    }
    this.help = () => {
      let helpMessage = "Bonjour, je suis " + this.name;
      helpMessage += "<br/>Tu peux me demander :<br/>";
      Object.keys(this.sentences).forEach(key => {
        if (key == "heure") {
          helpMessage += "- l'heure<br/>";
        } else if (key == "temps") {
          helpMessage += "- le temps qu'il fait";
        }
      })
      this.addMessage("received", helpMessage);
    }
  }
}

/*
* Input messages functions
*/
function formattedInputValue(value) {
  let formattedValue = value.toLowerCase();
  formattedValue = formattedValue.replace('-', ' ');
  formattedValue = formattedValue.replace(/[!?,.:\/;_]+/g, '');
  formattedValue = formattedValue.replace(/[éèêë]+/g, 'e');
  formattedValue = formattedValue.replace(/[àâä]+/g, 'e');

  console.log(formattedValue);

  return formattedValue;
}

function getInputValue() {
  let input = document.querySelector('.chat-input');
  let inputValue = input.value;

  input.value = "";
  return inputValue;
}

function handleInput() {
  let inputValue = getInputValue();

  if (inputValue != "") {
    bots[activeBot].addMessage("sent", inputValue);
    if (formattedInputValue(inputValue) == "help") {
      bots[activeBot].help();
    } else {
      bots[activeBot].answer(formattedInputValue(inputValue));
    }
    refreshScreen();
  }
}

/*
* Bots functions
*/
function changeBot(event) {
  let target = event.target;
  let bot;

  if (target.parentNode.classList == "contact-users") {
    bot = target;
  } else {
    bot = target.parentNode;
  }

  let botID = bot.id;
  botID = botID.replace("botID", "");
  activeBot = botID;

  changeActiveBot(bot);
  refreshScreen();
}

function botGetTime() {
  let date = new Date();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let secondes = date.getSeconds();

  return `Il est actuellement ${hours}h${minutes}min${secondes}s.`;
}

function botGetWeather() {
  return `Il fait froid. Genre très froid.`;
}

/*
* View functions
*/
function getFormattedDate() {
  let date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (month < 10) {
      month = "0" + month;
  }
  if (hours < 10) {
      hours = "0" + hours;
  }
  if (minutes < 10) {
      minutes = "0" + minutes;
  }

  return `${hours}:${minutes} ${day}/${month}/${year}`;
}

function forceScroll() {
  let messagesContainer = document.querySelector(".messages-container");
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function toggleSideBar() {
  let contactContainer = document.querySelector(".contact-container");

  if (contactContainer.style.display == "block") {
    contactContainer.style.display = "none";
  } else {
    contactContainer.style.display = "block";
  }
}

function displayMessages() {
  let messagesContainer = document.querySelector('.messages-container')
  let allMessages = bots[activeBot].messages.map(message => {
    return `<div class="messages-item ${message.type}">
              <p class="messages-value">
                ${message.content}
              </p>
              <span class="messages-date">${message.time}</span>
            </div>`;
  }).join('');

  messagesContainer.innerHTML = allMessages;
}

function changeActiveBot(bot) {
  let activeBot = document.querySelector(".contact-users-active");
  activeBot.classList.remove("contact-users-active");
  bot.classList.add("contact-users-active");
}

function displayBots() {
  let contactUsers = document.querySelector(".contact-users");
  let id = 0;

  let botsString = bots.map(bot => {
    let active = "";

    if (activeBot == id) {
      active = "contact-users-active";
    }
    let str = `<div id="botID${id}" class="contact-users-item ${active}">
                <div class="contact-users-avatar" style="background-image: url('${bot.avatar}')">    
                </div>
                <h3 class="contact-users-name">
                  ${bot.name}
                </h3>
                <div class="popUp">
                  <span class="notifPop">${bot.numberOfResponses}</span>
                </div>
              </div>`;

    id++;
    return str;
  }).join('');

  contactUsers.innerHTML = botsString;
}

function displayChatHeader() {
  let chatHeader = document.querySelector(".chat-header");
  let avatar = bots[activeBot].avatar;
  let name = bots[activeBot].name;
  let templattedStr = `<div class="chat-header-avatar" style="background-image: url('${avatar}')">
                      </div>
                      <div class="chat-header-content">
                        <h3 class="chat-header-name">${name}</h3>
                        <h4 class="chat-header-online">
                          Online now
                        </h4>
                      </div>`;

  chatHeader.innerHTML = templattedStr;
}

function refreshScreen() {
  displayBots();
  displayChatHeader();
  displayMessages();
  forceScroll();
}

/*
* Initialisation
*/
function initialisation() {
  bots.push(new Bot("https://pbs.twimg.com/profile_images/1338985026/Picture_1_400x400.png", "Tyrion Lannister"));
  bots.push(new Bot("https://i.pinimg.com/originals/fd/29/9c/fd299c3743a9679df23f110daf575ee4.jpg", "Arya Stark"));

  bots[0].sentences = {
    "heure": botGetTime
  }

  bots[1].sentences = {
    "temps": botGetWeather
  }

  refreshScreen();
}

var bots = []
var activeBot = 0;

/*
* Event listeners
*/
window.addEventListener('load', initialisation);
document.querySelector(".chat-input").addEventListener("change", handleInput);
document.querySelector(".chat-input-send").addEventListener("click", handleInput);
document.querySelector(".toggle-contact").addEventListener("click", toggleSideBar);
document.querySelector(".contact-users").addEventListener("click", (event) => changeBot(event));
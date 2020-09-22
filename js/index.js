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
    this.messages = [];
  }
}

/*
* Input messages functions
*/
function getInputValue() {
  let input = document.querySelector('.chat-input');
  let inputValue = input.value;

  input.value = "";
  return inputValue;
}

function handleInput() {
  let inputValue = getInputValue();

  if (inputValue != "") {
    bots[activeBot].messages.push(new Message("messages-item--sent", inputValue));
    /*
    * here -> need to call bot function that will analyse the input and answer
    * bots.answer(inputValue);
    *  check inputValue
    *  if it's "quelle heure est-il ?" -> bots.sayTime()
    *    add a Message in bot messages -> type: messages-item--received / content: actual time
    */
    displayMessages();
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
  displayChatHeader();
  displayMessages();
  forceScroll();
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

/*
* Initialisation
*/
function initialisation() {
  bots.push(new Bot("https://pbs.twimg.com/profile_images/1338985026/Picture_1_400x400.png", "Tyrion Lannister"));
  bots.push(new Bot("https://i.pinimg.com/originals/fd/29/9c/fd299c3743a9679df23f110daf575ee4.jpg", "Arya Stark"));

  forceScroll();
  displayBots();
  displayChatHeader();
  displayMessages();
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
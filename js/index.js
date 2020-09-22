/* 
index.js
*/

/*
* Classes definition
*/
class Message {
	constructor(type, content) {
		let date = new Date();

    	this.type = type;
    	this.content = content;
    	this.time = date.getTime();
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
		bots[actualBot].messages.push(new Message("messages-item--sent", inputValue));
		/*
		* here -> need to call bot function that will analyse the input and answer
		* bots.answer(inputValue);
		*	check inputValue
		*	if it's "quelle heure est-il ?" -> bots.sayTime()
		*		add a Message in bot messages -> type: messages-item--received / content: actual time
		*/
		displayMessages();
	}
}

/*
* Bots functions
*/
function changeBot(event) {
	let target = event.target;

	activeBot(target);
	displayMessages();
}

/*
* View functions
*/
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
	let allMessages = bots[actualBot].messages.map(message => {
		return `<div class="messages-item ${message.type}">
            		<p class="messages-value">
                    	${message.content}
                    </p>
              		<span class="messages-date">${message.time}</span>
                </div>`;
	}).join('');

	messagesContainer.innerHTML = allMessages;
}

function activeBot(target) {
	let bot;

	if (target.parentNode.classList == "contact-users") {
		bot = target;
	} else {
		user = target.parentNode;
	}

	let activeBot = document.querySelector(".contact-users-active");
	activeBot.classList.remove("contact-users-active");
	user.classList.add("contact-users-active");
}

/*
* Initialisation
*/
function initialisation() {
	bots.push(new Bot("https://pbs.twimg.com/profile_images/1338985026/Picture_1_400x400.png", "Tyrion Lannister"));
	bots.push(new Bot("https://i.pinimg.com/originals/fd/29/9c/fd299c3743a9679df23f110daf575ee4.jpg", "Arya Stark"));

	forceScroll();
	displayMessages();
}

var bots = []
var actualBot = 0;

/*
* Event listeners
*/
window.addEventListener('load', initialisation);
document.querySelector(".chat-input").addEventListener("change", handleInput);
document.querySelector(".chat-input-send").addEventListener("click", handleInput);
document.querySelector(".toggle-contact").addEventListener("click", toggleSideBar);
document.querySelector(".contact-users").addEventListener("click", (event) => changeBot(event));
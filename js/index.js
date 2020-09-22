/* 
index.js
*/
class message {
		constructor(messageType, content) {
		let date = new Date();
    this.type = messageType;
    this.content = content;
    this.time= date.getTime();
  }
}

function createMessage(message) {
	let newMessage = `<div class="messages-item ${message.type}">
                      <p class="messages-value">
                        ${message.content}
                      </p>
                      <span class="messages-date">${message.time}</span>
                    </div>`;

  let allMessages = document.querySelector('.messages-container').innerHTML;
  allMessages += newMessage;
  document.querySelector('.messages-container').innerHTML = allMessages;
  forceScroll();
}

function getInputValue() {
		let input = document.querySelector('.chat-input');
		let inputValue = input.value;
		createMessage(new message("messages-item--sent", inputValue)); //messages-item--received
		input.value = "";
}

function toggleSideBar() {
	let contactContainer = document.querySelector(".contact-container");

	if (contactContainer.style.display == "block") {
		contactContainer.style.display = "none";
	} else {
		contactContainer.style.display = "block";
	}
}

function changeBot(event) {
	let user;
	let target = event.target;

	if (target.parentNode.classList == "contact-users") {
		user = target;
	} else {
		user = target.parentNode;
	}

	let activeUser = document.querySelector(".contact-users-active");
	activeUser.classList.remove("contact-users-active");
	user.classList.add("contact-users-active");
}

function forceScroll() {
	let messagesContainer = document.querySelector(".messages-container");
	messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

document.querySelector(".toggle-contact").addEventListener("click", toggleSideBar);
document.querySelector(".contact-users").addEventListener("click", (event) => changeBot(event));
window.addEventListener('load', forceScroll);





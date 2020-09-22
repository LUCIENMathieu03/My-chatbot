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
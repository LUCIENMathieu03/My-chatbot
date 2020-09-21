function toggleSideBar() {
	let contactContainer = document.querySelector(".contact-container");

	if (contactContainer.style.display == "block") {
		contactContainer.style.display = "none";
	} else {
		contactContainer.style.display = "block";
	}
}
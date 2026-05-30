const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙";
    }
});

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
}
/* ---------------------------
   MOBILE NAVIGATION TOGGLE
--------------------------- */
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navLinkItems = document.querySelectorAll(".nav-links a");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navLinkItems.forEach(link => {
        link.addEventListener("click", () => {
            menuToggle.classList.remove("active");
            navLinks.classList.remove("active");
        });
    });
}


/* ---------------------------
   EMAILJS CONTACT FORM
--------------------------- */

emailjs.init("ei66X3Pwkv1BigATe");

document
    .getElementById("contact-form")
    .addEventListener("submit", function (e) {

        e.preventDefault();

        emailjs.sendForm(
            "service_ioxgr6a",
            "template_wzxb407",
            this
        )
            .then(() => {

                alert("Message Sent Successfully!");

                this.reset();

            })
            .catch((error) => {

                console.error(error);

                alert("Failed to send message.");

            });

    });
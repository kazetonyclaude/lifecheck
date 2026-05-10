const team = window.team || [];

const teamContainer = document.getElementById("team");

if (team.length > 0) {
    teamContainer.innerHTML = "";

    team.forEach(member => {
        const article = document.createElement("article");

        const image = document.createElement("img");
        image.className = "team-img";
        image.src = member.image;
        image.alt = member.role;

        const name = document.createElement("h3");
        name.textContent = member.name;

        const role = document.createElement("p");
        role.textContent = "Role: " + member.role;

        const bio = document.createElement("p");
        bio.textContent = member.bio;

        article.appendChild(image);
        article.appendChild(name);
        article.appendChild(role);
        article.appendChild(bio);

        teamContainer.appendChild(article);
    });
}

document.addEventListener("mouseover", function (e) {
    if (e.target.classList.contains("team-img")) {
        e.target.style.border = "3px solid #4890A8";
    }
});

document.addEventListener("mouseout", function (e) {
    if (e.target.classList.contains("team-img")) {
        e.target.style.border = "none";
    }
});

document.querySelectorAll("nav a").forEach(function (link) {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

const form = document.querySelector("#form form");

const submitButton = form.querySelector("button");

let messages = JSON.parse(localStorage.getItem("messages")) || [];

let feedback = document.createElement("p");

feedback.className = "feedback";

form.appendChild(feedback);

submitButton.addEventListener("click", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const message = document.getElementById("message").value.trim();

    let error = "";

    if (name === "") {
        error = "Name cannot be empty.";
    }
    else if (!email.includes("@") || !email.includes(".")) {
        error = "Please enter a valid email.";
    }
    else if (message.length < 10) {
        error = "Message must be at least 10 characters.";
    }

    if (error !== "") {
        feedback.style.color = "red";
        feedback.textContent = error;
        return;
    }

    messages.push({
        name: name,
        email: email,
        message: message
    });

    localStorage.setItem("messages", JSON.stringify(messages));

    feedback.style.color = "green";
    feedback.textContent = "Message submitted successfully.";

    form.reset();
});
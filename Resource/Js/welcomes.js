document.addEventListener("DOMContentLoaded", () => {
    const welcomeElement = document.getElementById("welcome");
    const currentHour = new Date().getHours();

    let greeting = "";

    if (currentHour >= 0 && currentHour < 12) {
        greeting = "Buenos días,";
    } else if (currentHour >= 12 && currentHour < 19) {
        greeting = "Buenas tardes,";
    } else {
        greeting = "Buenas noches,";
    }

    welcomeElement.textContent = greeting;
});

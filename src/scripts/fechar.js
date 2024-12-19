const exitButtons = document.querySelectorAll(".exit");

exitButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.closest("section").classList.remove("appear");
    })
})
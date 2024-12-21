const exitButtons = document.querySelectorAll(".exit");

exitButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const ordinaryButton = button.closest("section");   

        const popupInfo = button.closest(".popup-info");
        if(popupInfo) {
            popupInfo.classList.remove("appear");
            return; 
        }

        if(ordinaryButton) {
            ordinaryButton.classList.remove("appear")
        }
    })
})
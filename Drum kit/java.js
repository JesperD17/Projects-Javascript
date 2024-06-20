const buttons = document.querySelectorAll(".hi-hat");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const audio = new Audio("Sounds/Hi-hat.mp3");
    audio.play();
  });
});
function startShake() {
    var logo = document.getElementById("animationlogo");
    logo.style.animation = "shake 0.5s infinite";
  }
  
  function stopShake() {
    var logo = document.getElementById("animationlogo");
    logo.style.animation = "none";
  }
  
  setInterval(startShake, 500);
  setTimeout(stopShake, 3000);
  
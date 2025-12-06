document.getElementById("startBtn").addEventListener("click",async ()=>{

    if(Notification.permission!=="granted"){
        let permission = await Notification.requestPermission();
        console.log("permission:", permission);
    }
    let seconds = Number(document.getElementById("secondsInput").value);

    if(!seconds || seconds<=0){
        alert("Please enter a valid number of seconds.")
        return;
    }

    startCountdown(seconds);
});
function startCountdown(seconds){
    let display = document.getElementById("timeDisplay")
    let beep = document.getElementById("beepSound")

    display.textContent = seconds+"s";

    let timer =  setInterval(() =>{
        seconds--;
        display.textContent = seconds+"s";

        if(seconds<=0){
            clearInterval(timer);
            finishTimer(beep, display);
        }
    },1000);
}

function finishTimer(beep,display){
    beep.play();

    if(Notification.permission === "granted"){
        new Notification("Timer finished!");
    }else{
        alert("Timer finished!");
    }

    display.textContent = "Time's UP!"
}
const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

let savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    body.classList.add("light-mode");
    toggleBtn.textContent = "🌙 Dark Mode";
} else {
    body.classList.remove("light-mode"); 
    toggleBtn.textContent = "☀️ Light Mode";
}

// Toggle on button click
toggleBtn.addEventListener("click", () => {
    body.classList.toggle("light-mode");

    if (body.classList.contains("light-mode")) {
        toggleBtn.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    } else {
        toggleBtn.textContent = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");
    }
});

let atoms = 1000;
let totalatoms = 1000;
let clickPower = 1;
let researcherAmount = 0;
let researcherPower = 1;
let researcherCost = 1000;
let RP = 0;
let researchUnlocked = false;

function clickAtom() {
	atoms+= clickPower;
  totalatoms+=clickPower;
  document.getElementById("atomCount").innerText = "Atoms: " + atoms;
}

function upgradeClick() {
	if(atoms >= 10) {
  	atoms -= 10;
    clickPower++;
    document.getElementById("atomCount").innerText = "Atoms: " + atoms;
    document.getElementById("clickPowerTracker").innerText = "Lab Power: " + clickPower;
  }
}

function changeScene(scene) {
  let tabs = document.getElementsByClassName("tab");
  for(i = 0; i < tabs.length; i++) {
  	tabs[i].style.display = "none";
  }
	switch(scene) {   
  	case "lab":
    document.getElementById("lab").style.display = "block";
    break;
    case "research":
    document.getElementById("research").style.display = "block";
  }
}

function updateResources() {
  RP += (researcherAmount * researcherPower); 
  updateText();
}

function buyResearcher() {
	if(atoms >= researcherCost) {
		researcherAmount++;
		atoms -= researcherCost;
		researcherCost *= 2;
		document.getElementById("researcherbtn").innerText = "Hire Researcher(" + researcherCost + " atoms)";
		updateText();
	}
}

function updateText() {
  document.getElementById("atomCount").innerText = "Atoms: " + atoms;
  document.getElementById("researchTotal").innerText = "You have " + RP + " Research Points";
  document.getElementById("researchTracker").innerText = researcherAmount + " Researchers making " + (researcherPower * researcherAmount) + " Research/sec";
}

function checkUnlocks() {
    if(totalatoms >= 1000 && !researchUnlocked) {
    researchUnlocked = true;
    document.getElementById("techIntro").style.display = "none";
    let unlocks = document.getElementsByClassName("researchinit");
    for(i = 0; i < unlocks.length; i++) {
    	unlocks[i].style.display = "block";
    }
  }
}

function startGame() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("game").style.display = "block";
}

setInterval(updateResources, 1000);
setInterval(checkUnlocks, 5000);
changeScene("lab");

let atoms = 100000000;
let totalatoms = 1000;
let clickPower = 1;
let researcherAmount = 0;
let researcherPower = 0;
let researcherCost = 1000;
let RP = 5000000;
let researchUnlocked = false;
let autoclickEnabled = false;
let autoupgradeEnabled = false;
let gas = [
	[0, 25000],
	[0, 25000],
	[0, 25000]
];
let gasmult = 1;
let duranium = 0;
let AE = [
	[0, 100000],
	[0, 50000]
];
let duraniumspeed = 0.1;
let entropy = 1;
let entropyspeed = 10;
let EP = 0;

function clickAtom() {
  atoms = Math.floor(atoms + clickPower * gasmult);
  totalatoms+=clickPower * gasmult;
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
	break;
	case "quantum":
	document.getElementById("quantum").style.display = "block";
	break;
  }
}

function updateResources() {
  RP += researcherPower; 
  duranium += duraniumspeed;
  entropy *= entropyspeed;
  updateText();
}

function resetEntropy() {
  if(entropy == Infinity) {
	entropy = 1;
	updateText();
	EP++;
	document.getElementById("EPcount").innerText = "You have " + EP + " Entropy Points";
  }
}

function buyResearcher() {
	if(atoms >= researcherCost) {
		researcherAmount++;
		if(researcherPower == 0) {
		researcherPower = 1;
		}
		else {
		researcherPower *= 2;
		}
		atoms -= researcherCost;
		researcherCost *= 2;
		document.getElementById("researcherbtn").innerText = "Hire Researcher(" + researcherCost + " atoms)";
		updateText();
	}
}

function upEntropy(u) {
	switch(u) {
		case "EP":
		if() {

		}
		break;
		case "DR":
		if() {

		}
		break;
	}
}

function unlockTech(tech) {
	switch(tech) {
		case "autoclick":
		if(RP >= 50) {
		RP -= 50;
		autoclickEnabled = true;
		document.getElementById(tech).style.display = "none";
		}
		break;
		case "autoupgrade":
		if(RP >= 100) {
		RP -= 100;
		autoupgradeEnabled = true;
		document.getElementById(tech).style.display = "none";
		}
		break;
		case "unlockgas":
		if(RP >= 500) {
		RP -= 500;
		gasUnlocked = true;
		document.getElementById(tech).style.display = "none";
		document.getElementById("gasbox").style.display = "block";
		}
		break;
		case "unlockduranium":
		if(RP >= 25000) {
		RP -= 25000;
		document.getElementById(tech).style.display = "none";
		document.getElementById("duraniumbox").style.display = "block";
		}
		break;
			
	}
}

function upAE(u) {
	switch(u) {
		case "atoms":
		if(atoms >= AE[0][1]) {
		atoms -= AE[0][1];
		AE[0][0]++;
		AE[0][1] = Math.floor(AE[0][1] * 1.5);
		document.getElementById('aeatoms').innerText = AE[0][1] + " atoms";
		duraniumspeed = Math.floor(duraniumspeed * 1.33 * 1000) / 1000;
		}
		break;
		case "RP":
		if(atoms >= AE[1][1]) {
		atoms -= AE[1][1];
		AE[1][0]++;
		AE[1][1] = Math.floor(AE[1][1] * 1.5);
		document.getElementById('aeRP').innerText = AE[1][1] + " RP";
		duraniumspeed = Math.floor(duraniumspeed * 1.33 * 1000) / 1000;
		}
		break;
	}
}

function upgradeGas(u) {
	switch(u) {
		case "tmp":
		if(atoms >= gas[0][1]) {
		atoms -= gas[0][1];
		gas[0][0]++;
		gas[0][1] *= 10;
		document.getElementById(u).innerText = "Raise Temperature(" + gas[0][1] + " atoms)";
		}
		break;
		case "vol":
		if(atoms >= gas[1][1]) {
		atoms -= gas[1][1];
		gas[1][0]++;
		gas[1][1] *= 10;
		document.getElementById(u).innerText = "Lower Volume(" + gas[1][1] + " atoms)";
		}
		break;
		case "mol":
		if(atoms >= gas[2][1]) {
		atoms -= gas[2][1];
		gas[2][0]++;
		gas[2][1] *= 10;
		document.getElementById(u).innerText = "Increase Moles(" + gas[2][1] + " atoms)";
		}
		break;
	}
	atmmult = ((Math.pow(2, gas[0][0])) * (Math.pow(2, gas[1][0])) * (Math.pow(2, gas[2][0])));
	gasmult = Math.log(atmmult) + 1;
	document.getElementById("atmcount").innerText = "Your Boostium is at " + atmmult + "atm";
	document.getElementById("multcount").innerText = "(X" + Math.floor(gasmult * 10) / 10 + " multiplier to atom gain)";

}

function updateText() { 
  document.getElementById("researchTotal").innerText = "You have " + RP + " Research Points";
  document.getElementById("researchTracker").innerText = researcherAmount + " Researchers making " + (researcherPower) + " Research/sec";
  document.getElementById("duraniumCount").innerText = "You have " + Math.floor(duranium) + " Duranium";
  document.getElementById("duraniumTracker").innerText = "At your activation energy, your particle collider can make " + Math.floor(duraniumspeed * 10) / 10 + " duranium/sec";
  document.getElementById('entropycount').innerHTML = "The system currently has " + entropy + " entropy. Reach infinity for an entropy point.";
}

function updateAtoms() {
 if(autoclickEnabled) {
 clickAtom();
 }
 if(autoupgradeEnabled) {
 upgradeClick();
 }
 document.getElementById("atomCount").innerText = "Atoms: " + atoms;
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
setInterval(updateAtoms, 100);
setInterval(checkUnlocks, 5000);
changeScene("lab");

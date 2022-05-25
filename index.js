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
let duranium = 10000000000;
let AE = [
	[0, 100000],
	[0, 50000]
];
let duraniumspeed = 0.1;
let entropyUnlocked = false;
let entropy = 1;
let entropyspeed = 10;
let EP = 0;
let voltaicUnlocked = false;
let joules = 0;
let charge = 100;
let maxCharge = 100;
let chargeSpeed = 10;
let electrons = 0;
let electroncost = 100;
let acidpower = 0;
let basepower = 0;


function clickAtom() {
  atoms = Math.floor(atoms + clickPower * gasmult);
  totalatoms+=clickPower * gasmult;
  document.getElementById("atomCount").innerText = "Atoms: " + format(atoms);
}

function upgradeClick() {
	if(atoms >= 10) {
  	atoms -= 10;
    clickPower++;
    document.getElementById("atomCount").innerText = "Atoms: " + format(atoms);
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
  if(entropyUnlocked) {
  entropy *= entropyspeed;
  }
  if(voltaicUnlocked && charge > 0) {
  joules += chargeSpeed;
  charge -= chargeSpeed;
  if(charge <= 0) {
 	 charge = 0;
    }
  }
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
		document.getElementById("researcherbtn").innerText = "Hire Researcher(" + format(researcherCost) + " atoms)";
		updateText();
		document.getElementById("atomCount").innerText = "Atoms: " + format(atoms); 
	}
}

let entropycosts = [1, 100];
function upEntropy(u) {
	switch(u) {
		case "EP":
		if(EP >= entropycosts[0]) {
		EP - entropycosts[0];
		entropyspeed *= 10;
		entropycosts[0] *= 2;
		document.getElementById('entropyEP').innerText = entropycosts[0] + "EP";
		}
		break;
		case "DR":
		if(duranium >= entropycosts[1]) {
		entropyspeed *= 10;
		entropycosts[1] *= 2;
		document.getElementById('entropyDR').innerText = entropycosts[1] + "DR";
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
		document.getElementById("drbox").style.display = "block";
		}
		break;
		case "unlockvoltaic":
		if(duranium >= 10000) {
		duranium -= 10000;
		document.getElementById(tech).style.display = "none";
		document.getElementById("voltaicbox").style.display = "block";
		voltaicUnlocked = true;
		}
		break;
		case "unlockelectron":
		if(duranium >= 100000) {
		duranium -= 100000;
		document.getElementById(tech).style.display = "none";
		document.getElementById("electronbox").style.display = "block";
		}
		break;
		case "unlockentropy":
		if(duranium >= 250) {
		duranium -= 250;
		document.getElementById(tech).style.display = "none";
		document.getElementById("entropybox").style.display = "block";
		document.getElementById("quantumintro").style.display = "none";
		entropyUnlocked = true;
		}
		break;
		case "unlockacidbase":
		if(RP >= 1000000) {
		RP -= 1000000;
		document.getElementById(tech).style.display = "none";
		document.getElementById("acidbasebox").style.display = "block";
		}
	}
}

function format(n) {
	if(n > 1000000000000000000000) {
	return Math.floor(n / 100000000000000000000) / 10 + "Sx";
	}
	if(n > 1000000000000000000) {
	return Math.floor(n / 100000000000000000) / 10 + "Qi";
	}
	if(n > 1000000000000000) {
	return Math.floor(n / 100000000000000) / 10 + "Qa";
	}
	if(n > 1000000000000) {
	return Math.floor(n / 100000000000) / 10 + "T";
	}
	if(n > 1000000000) {
	return Math.floor(n / 100000000) / 10 + "B";
	}
	if(n > 1000000) {
	return Math.floor(n / 100000) / 10 + "M";
	}
	if(n > 1000) {
	return Math.floor(n / 100) / 10 + "K";
	}
	else {
	return Math.floor(n);
	}
}

function upAE(u) {
	switch(u) {
		case "atoms":
		if(atoms >= AE[0][1]) {
		atoms -= AE[0][1];
		AE[0][0]++;
		AE[0][1] = Math.floor(AE[0][1] * 1.5);
		document.getElementById('aeatoms').innerText = format(AE[0][1]) + " atoms";
		duraniumspeed = Math.floor(duraniumspeed * 1.33 * 1000) / 1000;
		}
		break;
		case "RP":
		if(RP >= AE[1][1]) {
		RP -= AE[1][1];
		AE[1][0]++;
		AE[1][1] = Math.floor(AE[1][1] * 1.5);
		document.getElementById('aeRP').innerText = format(AE[1][1]) + " RP";
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
		document.getElementById(u).innerText = "Lower Volume(" + format(gas[1][1]) + " atoms)";
		}
		break;
		case "mol":
		if(atoms >= gas[2][1]) {
		atoms -= gas[2][1];
		gas[2][0]++;
		gas[2][1] *= 10;
		document.getElementById(u).innerText = "Increase Moles(" + format(gas[2][1]) + " atoms)";
		}
		break;
	}
	atmmult = ((Math.pow(2, gas[0][0])) * (Math.pow(2, gas[1][0])) * (Math.pow(2, gas[2][0])));
	gasmult = Math.log(atmmult) + 1;
	document.getElementById("atmcount").innerText = "Your Boostium is at " + atmmult + "atm";
	document.getElementById("multcount").innerText = "(X" + Math.floor(gasmult * 10) / 10 + " multiplier to atom gain)";

}

function updateText() { 
  document.getElementById("researchTotal").innerText = "You have " + format(RP) + " Research Points";
  document.getElementById("researchTracker").innerText = researcherAmount + " Researchers making " + (researcherPower) + " Research/sec";
  document.getElementById("duraniumCount").innerText = "You have " + format(Math.floor(duranium)) + " Duranium";
  document.getElementById("duraniumTracker").innerText = "At your activation energy, your particle collider can make " + Math.floor(duraniumspeed * 10) / 10 + " duranium/sec";
  document.getElementById('entropycount').innerHTML = "The system currently has " + Number.parseFloat(entropy).toExponential(0) + " entropy. Reach infinity for an entropy point.";
  document.getElementById('jouleCount').innerText = "You have " + format(joules) + " Joules";
  document.getElementById('voltaictracker').innerText = "Your voltaic cell is producing " + chargeSpeed + "J/s";
  document.getElementById('voltaictimer').innerText = "Full discharge in " + Math.floor(charge / chargeSpeed) + "s";
}

let voltaiccost = [4, 25000];
function upVoltaic(u) {
	switch(u) {
		case "EP":
		if(EP >= voltaiccost[0]) {
		chargeSpeed *= 2;
		EP -= voltaiccost[0];
		voltaiccost[1] *= 5;
		document.getElementById("voltaicspeed").innerText = "Increase Speed(" + voltaiccost[0] + "EP)";
		}
		break;
		case "DR":
		if(DR >= voltaiccost[1]) {
		maxCharge *= 2;
		DR -= voltaiccost[1];
		voltaiccost[1] *= 5;
		document.getElementById("voltaicduration").innerText = "Increase Charge(" + voltaiccost[1] + "DR)";
		}
		break;
	}
}

function electronClick() {
	if(joules >= electroncost) {
	joules -= electroncost;
	electrons++;
	electroncost *= 10;
	document.getElementById('electronCount').innerText = "You have " + electrons + " electrons";
	document.getElementById('latticeenergy').innerText = "Current lattice energy: " + electroncost;
	}
}

function recharge() {
	if(charge == 0) {
	charge = maxCharge;
	}
	updateText();
}

function prettify(n) {
	return Math.floor(n * 1000000000000) / 1000000000000;
}

function updateAtoms() {
 if(autoclickEnabled) {
 clickAtom();
 }
 if(autoupgradeEnabled) {
 upgradeClick();
 }
 document.getElementById("atomCount").innerText = "Atoms: " +format(atoms);
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

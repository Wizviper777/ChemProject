let atoms = 0;
let totalatoms = 0;
let clickPower = 1;
let researcherAmount = 0;
let researcherPower = 0;
let researcherCost = 1000;
let RP = 0;
let researchUnlocked = false;
let autoclickEnabled = false;
let autoupgradeEnabled = false;
let labSpeed = 1;
let gas = [
	[0, 25000],
	[0, 25000],
	[0, 25000]
];
let gasmult = 1;
let gasboost = false;
let duranium = 0;
let AE = [
	[0, 100000],
	[0, 50000]
];
let duraniumspeed = 0.1;
let entropyUnlocked = false;
let entropy = 1;
let entropyspeed = 10;
let EP = 0;
let EPboost = 1;
let EPmult = 1;
let autoentropy = false;
let voltaicUnlocked = false;
let joules = 0;
let jouleboost = false;
let charge = 100;
let chargeboost = false;
let maxCharge = 100;
let chargeSpeed = 10;
let autocharge = false;
let electrons = 0;
let electroncost = 100;
let electronpow = 0.20;
let atompow = 1;
let acidpower = 0;
let basepower = 0;
let gametime = 0;


function clickAtom() {
  atoms = Math.floor(atoms + Math.pow(EPboost * clickPower * gasmult, atompow));
  totalatoms+=clickPower * gasmult;
  document.getElementById("atomCount").innerText = "Atoms: " + format(atoms);
}

function upgradeClick() {
    if(atoms >= 10) {
    atoms -= 10;
    clickPower++;
    document.getElementById("atomCount").innerText = "Atoms: " + format(atoms);
    document.getElementById("clickPowerTracker").innerText = "Lab Power: " + format(clickPower);
  }
}

function changeScene(scene) {
  let tabs = document.getElementsByClassName("tab");
  for(i = 0; i < tabs.length; i++) {
  	tabs[i].style.display = "none";
  }
	switch(scene) {   
  	case "lab":
    	document.getElementById("lab").style.display = "flex";
    	break;
    	case "research":
    	document.getElementById("research").style.display = "block";
	break;
	case "quantum":
	document.getElementById("quantum").style.display = "flex";
	break;
  }
}

function updateResources() {
  RP += researcherPower; 
  duranium += duraniummult * duraniumspeed;
  if(voltaicUnlocked && charge > 0) {
  if(jouleboost && chargeboost) {
  joules += joulemult * chargeSpeed * (electrons + 1) * Math.sqrt(maxCharge);
  }
  else if(jouleboost) {
  joules += joulemult * chargeSpeed * (electrons + 1);
  }
  else {
  joules += chargeSpeed * joulemult;
  }
  charge -= chargeSpeed;
  if(charge <= 0) {
 	 charge = 0;
	 if(autocharge) {
	  recharge();
	 }
    }
  }
  gametime++;
  updateText();
}

function resetEntropy() {
  if(entropy == Infinity) {
	entropy = 1;
	updateText();
	EP += EPmult;
	document.getElementById("EPcount").innerText = "You have " + format(EP) + " Entropy Points";
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
		EP -= entropycosts[0];
		entropyspeed *= 10;
		entropycosts[0] *= 2;
		document.getElementById('entropyEP').innerText = "Increase Speed(" + format(entropycosts[0]) + "EP)";
 		document.getElementById("EPcount").innerText = "You have " + format(EP) + " Entropy Points";
		}
		break;
		case "DR":
		if(duranium >= entropycosts[1]) {
		entropyspeed *= 10;
		entropycosts[1] *= 2;
		document.getElementById('entropyDR').innerText = "Increase Speed(" + format(entropycosts[1]) + "DR)";
  		document.getElementById("EPcount").innerText = "You have " + format(EP) + " Entropy Points";
		}
		break;
	}
}

function end() {
	if(atoms >= 6e23) {
	document.getElementById("game").style.display = "none";
	document.getElementById("end").style.display = "flex";
	let mins = Math.floor(gametime / 60);
	let secs = gametime % 60;
	document.getElementById("completiontime").innerText = mins + "mins" + " " + secs + "secs"
	}
}

function unlockTech(tech) {
	switch(tech) {
		case "autoclick":
		if(RP >= 50) {
		RP -= 50;
		autoclickEnabled = true;
		document.getElementById(tech).style.display = "none";
		document.getElementById("autoupgrade").style.display = "flex";
		}
		break;
		case "autoupgrade":
		if(RP >= 100) {
		RP -= 100;
		autoupgradeEnabled = true;
		document.getElementById(tech).style.display = "none";
		document.getElementById("unlockgas").style.display = "flex";
    		document.getElementById("labspeed1").style.display = "flex";
		}
		break;
		case "unlockgas":
		if(RP >= 1000) {
		RP -= 1000;
		gasUnlocked = true;
		document.getElementById(tech).style.display = "none";
		document.getElementById("gasbox").style.display = "flex";
    		document.getElementById("unlockduranium").style.display = "flex";
    		document.getElementById("gasboost").style.display = "flex";
		}
		break;
		case "unlockduranium":
		if(RP >= 25000) {
		RP -= 25000;
		document.getElementById(tech).style.display = "none";
		document.getElementById("duraniumbox").style.display = "flex";
		document.getElementById("drbox").style.display = "flex";
		document.getElementById("unlockentropy").style.display = "flex";
		}
		break;
		case "unlockvoltaic":
		if(duranium >= 10000) {
		duranium -= 10000;
		document.getElementById(tech).style.display = "none";
		document.getElementById("voltaicbox").style.display = "flex";
		voltaicUnlocked = true;
		document.getElementById("unlockelectron").style.display = "flex";
		document.getElementById("autocharge").style.display = "flex";
    		document.getElementById("unlockacidbase").style.display = "flex";
		}
		break;
		case "unlockelectron":
		if(duranium >= 100000) {
		duranium -= 100000;
		document.getElementById(tech).style.display = "none";
		document.getElementById("electronbox").style.display = "flex";
		document.getElementById("electronboost").style.display = "flex";
		document.getElementById("jouleboost").style.display = "flex";
		}
		break;
		case "unlockentropy":
		if(duranium >= 250) {
		duranium -= 250;
		document.getElementById(tech).style.display = "none";
		document.getElementById("entropybox").style.display = "flex";
		document.getElementById("quantumintro").style.display = "none";
		document.getElementById("unlockvoltaic").style.display = "flex";
		document.getElementById("entropyhelper").style.display = "flex";
		document.getElementById("entropyspeed1").style.display = "flex";
    		document.getElementById("autoentropy").style.display = "flex";
		entropyUnlocked = true;
		}
		break;
		case "unlockacidbase":
		if(RP >= 1e10) {
		RP -= 1e10;
		document.getElementById(tech).style.display = "none";
		document.getElementById("acidbasebox").style.display = "flex";
		}
		break;
		case "autoentropy":
		if(RP >= 20000000) {
		RP -= 20000000;
		document.getElementById(tech).style.display = "none";
		autoentropy = true;
		}
		break;
		case "labspeed1": 
		if(RP >= 50000) {
		RP -= 50000;
		document.getElementById(tech).style.display = "none";
		labSpeed *= 5;
    		document.getElementById("labspeed2").style.display = "flex";
		}
		break;
		case "labspeed2":
		if(RP >= 10000000) {
		RP -= 10000000;
		document.getElementById(tech).style.display = "none";
		labSpeed *= 5;
		}
		break;
		case "autocharge":
		if(duranium >= 1000000) {
		duranium -= 1000000;
		document.getElementById(tech).style.display = "none";
		autocharge = true;
		}
		break;
		case "entropyspeed1":
		if(duranium >= 1e9) {
		duranium -= 1e9;
		document.getElementById(tech).style.display = "none";
		document.getElementById("entropyspeed2").style.display = "flex";
		EPmult *= 10;	
		}
		break;
		case "entropyspeed2":
		if(duranium >= 1e12) {
		duranium -= 1e12;
		document.getElementById(tech).style.display = "none";
		EPmult *= 10;
		}
		break;
		case "electronboost":
		if(duranium >= 1e12) {
		duranium -= 1e12;
		document.getElementById(tech).style.display = "none";
		electronpow = 0.3;
		atompow = Math.sqrt(electronpow * electrons + 1); 
		document.getElementById('electronCount').innerText = "You have " + electrons + " electrons, raising atom gain to the power of " + Math.floor(atompow * 10) / 10;
		}
		break;
		case "jouleboost":
		if(duranium >= 2.5e8) {
		duranium -= 2.5e8;
		document.getElementById(tech).style.display = "none";
		document.getElementById("chargeboost").style.display = "flex";
		jouleboost = true;
		}
		break;
		case "gasboost":
		if(RP >= 1e8) {
		RP -= 1e8;
		document.getElementById(tech).style.display = "none";
		gasboost = true;
		upgradeGas("");
		}
		break;
		case "chargeboost":
		if(duranium >= 5e9) {
		duranium -= 5e9;
		document.getElementById(tech).style.display = "none";
		chargeboost = true;
		}
		break;
		case "entropyhelper":
		if(EP >= 5) {
		EP -= 5;
		document.getElementById(tech).style.display = "none";
		EPboost *= 2;
		document.getElementById("entropyhelper2").style.display = "flex";
		}
		break;
		case "entropyhelper2":
		if(EP >= 25) {
		EP -= 25;
		document.getElementById(tech).style.display = "none";
		EPboost *= 2;
		}
		break;
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
	return Math.floor(n * 10) / 10;
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
		document.getElementById(u).innerText = "Raise Temperature(" + format(gas[0][1]) + " atoms)";
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
	if(gasboost) {
	gasmult = Math.sqrt(atmmult);
	}
	else {
	gasmult = Math.pow(atmmult, 0.4);
	}
	document.getElementById("atmcount").innerText = "Your Boostium is at " + format(atmmult) + "atm";
	document.getElementById("multcount").innerText = "(X" + format(Math.floor(gasmult * 10) / 10) + " multiplier to atom gain)";

}

function updateText() { 
  document.getElementById("researchTotal").innerText = "You have " + format(RP) + " Research Points";
  document.getElementById("researchTracker").innerText = researcherAmount + " Researchers making " + format(researcherPower) + " Research/sec";
  document.getElementById("duraniumCount").innerText = "You have " + format(Math.floor(duranium)) + " Duranium";
  document.getElementById("duraniumTracker").innerText = "At your activation energy, your particle collider can make " + format(duraniumspeed * duraniummult) + " duranium/sec";
  document.getElementById('jouleCount').innerText = "You have " + format(joules) + " Joules";
  if(jouleboost && chargeboost) {
  document.getElementById('voltaictracker').innerText = "Your voltaic cell is producing " + format(joulemult * chargeSpeed * (electrons + 1) * Math.sqrt(maxCharge)) + "J/s";
  }
  else if(jouleboost) {
  document.getElementById('voltaictracker').innerText = "Your voltaic cell is producing " + format(joulemult * chargeSpeed * (electrons + 1)) + "J/s";
  }
  else {
  document.getElementById('voltaictracker').innerText = "Your voltaic cell is producing " + format(chargeSpeed * joulemult) + "J/s";
  }
  document.getElementById('voltaictimer').innerText = "Full discharge in " + Math.floor(charge / chargeSpeed) + "s";
  document.getElementById("EPcount").innerText = "You have " + format(EP) + " Entropy Points";
}

let voltaiccost = [4, 25000];
function upVoltaic(u) {
	switch(u) {
		case "EP":
		if(EP >= voltaiccost[0]) {
		chargeSpeed *= 2;
		EP -= voltaiccost[0];
		voltaiccost[0] *= 5;
		document.getElementById("voltaicspeed").innerText = "Increase Speed(" + format(voltaiccost[0]) + "EP)";
		document.getElementById("EPcount").innerText = "You have " + format(EP) + " Entropy Points";
		}
		break;
		case "DR":
		if(duranium >= voltaiccost[1]) {
		maxCharge *= 2;
		duranium -= voltaiccost[1];
		voltaiccost[1] *= 5;
		document.getElementById("voltaicduration").innerText = "Increase Charge(" + format(voltaiccost[1]) + "DR)";
		document.getElementById("EPcount").innerText = "You have " + format(EP) + " Entropy Points";
		}
		break;
	}
}

function electronClick() {
	if(joules >= electroncost) {
	joules -= electroncost;
	electrons++;
	electroncost *= 10;
	atompow = Math.sqrt(electronpow * electrons + 1); 
	document.getElementById('electronCount').innerText = "You have " + electrons + " electrons, raising atom gain to the power of " + Math.floor(atompow*10) / 10;
	document.getElementById('latticeenergy').innerText = "Current lattice energy: " + format(electroncost) + " J";
	}
}

let acidcost = 1000000000;
let basecost = 1000000000;
let joulemult = 1;
let duraniummult = 1;

function buyAB(u) {
	switch(u) {
		case "acid":
		if(atoms >= acidcost) {
		atoms -= acidcost;
		acidcost *= 2;
		joulemult = Math.floor(joulemult * 1.5 * 100) / 100;
		document.getElementById('upgradeacid').innerText = "Upgrade Acid(" + format(acidcost) + " atoms)";
		document.getElementById('acidtracker').innerText = "Your acid power is multiplying Joule gain by " + format(joulemult);
		}
		break;
		case "base":
		if(atoms >= basecost) {
		atoms -= basecost;
		basecost *= 2;
		duraniummult = Math.floor(duraniummult * 1.5 * 100) / 100;
		document.getElementById('upgradebase').innerText = "Upgrade Base(" + format(basecost) + " atoms)";
		document.getElementById('basetracker').innerText = "Your base power is multiplying Duranium gain by " + format(duraniummult);
		}
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
 for(i=0;i<labSpeed;i++) {
 upgradeClick();
   }
 }
 document.getElementById("atomCount").innerText = "Atoms: " +format(atoms);
 if(entropyUnlocked) {
  entropy *= entropyspeed;
  	if(autoentropy) {
	resetEntropy();
	}
  }
  document.getElementById('entropycount').innerHTML = "The system currently has " + Number.parseFloat(entropy).toExponential(0) + " entropy. Reach infinity for an entropy point.";
}

function checkUnlocks() {
    if(totalatoms >= 1000 && !researchUnlocked) {
    researchUnlocked = true;
    document.getElementById("techIntro").style.display = "none";
    let unlocks = document.getElementsByClassName("researchinit");
    for(i = 0; i < unlocks.length; i++) {
	    	unlocks[i].style.display = "flex";
    }
    document.getElementById("autoclick").style.display = "flex";
  }
}

function startGame() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("game").style.display = "block";
}

setInterval(updateResources, 1000);
setInterval(updateAtoms, 100);
setInterval(checkUnlocks, 5000);
let h = document.getElementsByClassName("researchinit");
for(i=0;i<h.length;i++) {
h[i].style.display = "none";
}
changeScene("lab");
checkUnlocks();

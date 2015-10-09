function startgame(){
	document.getElementById("startpage").style.display = "none";
	
	infobar = document.createElement("div");
	infobar.id="infobar";
	document.body.appendChild(infobar);
	
	timer = document.createElement("div");
	timer.innerHTML = "60 sec";
	timer.id = "timer";
	infobar.appendChild(timer);
	
	pause = document.createElement("button");
	pause.innerHTML = "play";
	pause.id = "pause";
	infobar.appendChild(pause);
	
	score = document.createElement("div");
	score.innerHTML = "Score: 0";
	score.id = "score";
	infobar.appendChild(score);
	
}
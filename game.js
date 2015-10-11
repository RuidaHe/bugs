

function startgame(){
	time = 60;
	
	startpage = document.getElementById("startpage");
	startpage.style.display = "none";
	
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

	viewport = document.createElement("canvas");
	viewport.id = "viewport";
	document.body.appendChild(viewport);

	 times = setInterval(updateTime, 20);
	
	
}

function updateTime(){
	if(time>0){
		time--;
		timer.innerHTML = time + "sec";
	}
	else{
		if(confirm ("Try again!")){			
			time=60;
		}
		else {
			time=60;
			clearInterval(times);
			infobar.style.display = "none";
			viewport.style.display = "none";
			startpage.style.display = "block";

		}
		
	}
}
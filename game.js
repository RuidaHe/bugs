

function startgame(){
	time = 60;
	frame = 0;
	state = true;
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
	pause.innerHTML = "pause";
	pause.id = "pause";
	pause.onclick = function() {gamePlayPause()};
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
	frame++;
	if(frame%10 == 0 && time>0){
		time--; 
		timer.innerHTML = time + "sec";
	}
	else{
		if(time <= 0){			
			time=60;
			clearInterval(times);
			r = confirm("Try again!");
			if (r == true){
				timer.innerHTML = time + "sec";
			}
			else{
				infobar.style.display = "none";
				viewport.style.display = "none";
				startpage.style.display = "block";
			}			
		}
	}
}

function gamePlayPause(){
	if (state == true){
		state = false;
		pause.innerHTML = "play";
		clearInterval(times);
	}
	else if(state == false){
		state = true;
		pause.innerHTML = "pause";
		times = setInterval(updateTime, 20);

	}
}
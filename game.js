

function startgame(){
	time = 60;
	frame = 0;
	state = true;
	foodlist = new Array();
	foodlist[0] = new food((Math.random()*300), (Math.random()*280));
	foodlist[1] = new food((Math.random()*300), (Math.random()*280));
	foodlist[2] = new food((Math.random()*300), (Math.random()*280));
	foodlist[3] = new food((Math.random()*300), (Math.random()*280));
	foodlist[4] = new food((Math.random()*300), (Math.random()*280));

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
	ctx = viewport.getContext("2d");
	document.body.appendChild(viewport);

	
	times = setInterval(updateTime, 20);
	
	
}

// function showCoords(event) {
	
//     var x = event.clientX;
//     var y = event.clientY;
//     var coords = "X coords: " + x + ", Y coords: " + y;
//     alert(coords);
// }

function updateTime(){
	drawFood();
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

function food(x, y){
	this.x = x;
	this.y = y;
}

function drawFood(){
	var foodImg = new Image();
	foodImg.src = "http://pngimg.com/upload/apple_PNG4731.png";
	var i = 0;
	alert("a");
	while(foodlist[i]){
			alert("a");

		ctx.drawImage(foodImg, foodlist[i].x, foodlist[i].y, 10, 10);
		i++;
	}
}
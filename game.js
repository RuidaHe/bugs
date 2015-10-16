function startgame(){
	time = 60;
	frame = 0;
	state = true;
	gamescore = 0;

	foodlist = new Array();
	foodlist[0] = new food((20+Math.random()*360), (300+Math.random()*280));
	foodlist[1] = new food((20+Math.random()*360), (300+Math.random()*280));
	foodlist[2] = new food((20+Math.random()*360), (300+Math.random()*280));
	foodlist[3] = new food((20+Math.random()*360), (300+Math.random()*280));
	foodlist[4] = new food((20+Math.random()*360), (300+Math.random()*280));

	buglist = [];
	bugfadelist = [];

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

	canvas = document.createElement("canvas");
	canvas.width = "400";
	canvas.height = "600";
	canvas.id = "canvas";
	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);

	drawFood();
	
	times = setInterval(updateTime, 20);
}

function updateTime(){
	canvas.addEventListener("click", killbug);
	viewportUpdate();
	frame++;
	if(frame%50 == 0 && time>0){
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
				canvas.style.display = "none";
				startpage.style.display = "block";
			}			
		}
	}

	if (frame % (50 * (Math.floor(Math.random()*3) + 1)) == 0){
		buglist.push(new Bug());
	}

	drawBugs();
}

function viewportUpdate(){
	if(!foodlist.length){
		gameOver();
	}
	else{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawFood();
		drawBugs();
		
		  
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
	foodImg.src = 'orange.png';
	var i = 0;
	while(foodlist[i]){
		ctx.drawImage(foodImg, foodlist[i].x, foodlist[i].y, 20, 20);
		i++;
	}
}

function Bug(){

	var speciesNum = Math.floor(Math.random()*10) + 1;
	this.x = Math.floor(Math.random() * 381) + 10;
	this.y = 0;
	this.direction = direction;
	this.movement = movement;
	this.targetindex = 6;
	if (speciesNum <= 3){
		this.species = "black";
		this.speed1 = 150;
		this.speed2 = 200;
		this.score = 5;
		this.imgurl = "https://cdn2.iconfinder.com/data/icons/windows-8-metro-style/512/bug.png" 
	} 

	else if ((speciesNum >= 4)&&(speciesNum <= 6)){
		this.species = "red";
		this.speed1 = 75;
		this.speed2 = 100;
		this.score = 3;
		this.imgurl = "http://lifegoo.pluskid.org/wp-content/uploads/2008/05/bug.png"
	}

	else if (speciesNum >= 7){
		this.species = "orange";
		this.speed1 = 60;
		this.speed2 = 80;
		this.score = 1;
		this.imgurl = "http://icons.iconarchive.com/icons/umut-pulat/tulliana-2/128/bug-icon.png"
	}

	function direction(){
		var targetindex = 0;
		var targetdistance = Math.sqrt(400 * 400 + 600 * 600);
		var fooddistance = [];
		var theta = 0;
		var i = 0;
		while(foodlist[i]){
			fooddistance[i] = square (this.x - foodlist[i].x, this.y - foodlist[i].y);
			if (fooddistance[i] < targetdistance){
				targetdistance = fooddistance[i];
				targetindex = i;
			}
			i++;
		}
		this.targetindex = targetindex;
		if (foodlist[targetindex].y >= this.y){
			theta = Math.PI + Math.atan((this.x - foodlist[targetindex].x)/(foodlist[targetindex].y - this.y));
		}
		else{
			theta = Math.atan((foodlist[targetindex].x - this.x)/(this.y - foodlist[targetindex].y));
		}
		return theta;
	}

	function movement(){
		var speed = 0;
		if (level == 1){
			speed = this.speed1;
		}
		else{
			speed = this.speed2;
		}
		this.x = this.x + speed * 20 / 1000 * Math.sin(this.direction());
		this.y = this.y - speed * 20 / 1000 * Math.cos(this.direction());
	}

	function fade(){
		this.fadetime = time;
	}
}

function drawBugs(){
	var i = 0;
	while(buglist[i]){
	
		buglist[i].movement();
		var targetindex = buglist[i].targetindex;
		var targetdistance = square(foodlist[targetindex].x - buglist[i].x,foodlist[targetindex].y - buglist[i].y);

		if (targetdistance < 10 ){
			foodlist.splice(buglist[i].targetindex, 1);
		}
		var bugImg = new Image();
		bugImg.src = buglist[i].imgurl;
		ctx.translate(buglist[i].x+10,buglist[i].y+10);
		ctx.rotate(buglist[i].direction());
		ctx.drawImage(bugImg, 0, 0,20,20);
		ctx.rotate(-buglist[i].direction());
		ctx.translate(-(buglist[i].x+10),-(buglist[i].y+10));
		i++;
	}
}

function square(x, y){
	return Math.sqrt(x * x + y * y);
}

function killbug(event){
	var i = 0;

	while(buglist[i]){
		var leftborder = canvas.offsetleft;
		var topborder = canvas.offsettop;
		var clickdistance = square(buglist[i].x+10 - (event.pageX-leftborder), buglist[i].y+10 - (event.pageY-topborder));

		if (clickdistance<=30){
			gamescore = gamescore + buglist[i].score;
			score.innerHTML = "Score:" + gamescore;
			var length = bugfadelist.push(buglist[i]);
			buglist.splice(i,1);
			bugfadelist[length-1].fade();
		} 
		
		i++;
	}
}
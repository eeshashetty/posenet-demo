// global vars
let down = false;
let up = false;
let xc, yc, xcl, xcr;
let upc = 0;
let kick = false;
let radius = 45;
let progress = true;
let stroke, fill;
let s = true;
let start = new Audio('Audio files/Instructions/Great-Lets start.mp3');
let bump = new Audio('Audio files/Instructions/Gamebump.mp3');
// squat+jump
function Exercise(results) {
    let poses = results.poseLandmarks;

    if(s) {
        start.play()
        s = false;
      }

    if(upc == 0) {
        // take 30% of distance from the hip
        xcl = (0.7*poses[23].x);
        xcr = (poses[24].x + 0.3*poses[23].x);

        // y coordinate is y coordinate of hip
        yc = 1.1*poses[23].y*canvasHeight;

        upc++;
    }

    // generate circle for kick if in squat
    if(down)
    {   
        // generate circle on alternate sides
        xc = (count%2 == 0)? xcr : xcl;
        xc = xc*canvasWidth;

        ctx1.beginPath();
        ctx1.arc(xc, yc, radius, 0, 2 * Math.PI);
        stroke = "black";
        fill = "#e68214";

        // check if leg collides with circle
        // first - check if ankles are visible
        if(poses[31].visibility > 0.9 || poses[32].visibility > 0.9) {    
            // reduce circle coords to a scale of 0 to 1 for blazepose
            let xcc =  xc/canvasWidth;
            let ycc = yc/canvasHeight;

            let distr = Math.pow((xcc-poses[31].x),2) + Math.pow((ycc-poses[31].y),2); // check distance of right ankle from circle
            let distl = Math.pow((xcc-poses[32].x),2) + Math.pow((ycc-poses[32].y),2); // check distance of left ankle from circle
            
            // a point (x1,y1) is inside a circle if (x-x1)^2 + (y-y1)^2 <= radius^2
            let dist = (count%2==0) ? distr : distl;

            if(dist <= Math.pow(radius/canvasHeight, 2)) {
                bump.play();
                count++;
                play(count);
                down = false; // reset squat
                stroke = "#00ff00";
                fill = "#00ff00";
                upc = 0; // trigger kick as true for green circle
            } 
          } 

        // draw keypoints only for ankles
        drawLandmarks(
            ctx1, [poses[31], poses[32]],
            {color: '#e68214', fillColor: '#e68214', lineWidth: 4, radius: 15});

        ctx1.lineWidth = 8;
        ctx1.strokeStyle = stroke;
        ctx1.stroke();
        ctx1.globalAlpha = 0.6;
        ctx1.fillStyle = fill; // #e68214 if not kicked, green once kicked
        ctx1.fill();
        ctx1.closePath();

    } 
    
    // check squat
    let res = checkSquat(poses);
    up = (res[0] == undefined)?up:res[0];
    down = (res[1] == undefined)?down:res[1];
    progress = (res[2] == undefined)?down:res[2];
    let color = progress?"red":(up?"white":(down?"#00ff00":"red"));

    // draw keypoints
    draw(color, ctx1, poses);

    let size = (canvasWidth*80)/720;

    ctx2.beginPath();
    ctx2.globalAlpha = down?1:0.1;;
    ctx2.fillStyle = down?"#FFC107":"black";
    ctx2.font = Math.floor((canvasWidth*40)/720) + "px Algerian";
    ctx2.fillText("KICK", 0.74*canvasWidth, 0.4*canvasHeight);
    ctx2.closePath();

    let arrd = new Image();
    arrd.src = "Arrow icons/Arrow 8-down.png"
    
    ctx2.font = Math.floor((canvasWidth*40)/720) + "px Algerian";
    ctx2.globalAlpha = down?0.1:1;
    ctx2.fillStyle = down?"black":"#FFC107";
    ctx2.fillText("SQUAT", 0.74*canvasWidth, 0.53*canvasHeight);
    ctx2.drawImage(arrd, 0.77*canvasWidth, 0.54*canvasHeight, size, size);
    
    
}

function play(count) {
    let one = new Audio('Audio files/Count/1.mp3');
    let two = new Audio('Audio files/Count/2.mp3');
    let three = new Audio('Audio files/Count/3.mp3');
    let great = [
        new Audio('Audio files/Motivation/come on.mp3'),
        new Audio('Audio files/Motivation/Good Work.mp3'),
        new Audio('Audio files/Motivation/Great Going.mp3'),
        new Audio('Audio files/Motivation/Keep breathing.mp3'),
        new Audio('Audio files/Motivation/Keep Going.mp3'),
        new Audio('Audio files/Motivation/Keep Pushing.mp3'),
        new Audio('Audio files/Motivation/Very Good.mp3'),
        new Audio('Audio files/Motivation/Very nice.Keep going.mp3'),
        new Audio('Audio files/Motivation/Very Nice.mp3'),
        new Audio('Audio files/Motivation/you are doing good.mp3'),
    ]
    if(count == 1) {
        one.play();
    } else if (count == 2) {
        two.play();
    } else if (count == 3) {
        three.play();
    } else if(count % 3 == 0) {
        great[Math.floor(Math.random()*great.length)].play();
    } 
}  

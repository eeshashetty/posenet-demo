

// ==========================================================================================================
function inbox(landmark,bx,by,bh,bl){
    if (landmark.x>=bx && landmark.x<=bx+bl && landmark.y>=by && landmark.y<=by+bh){
        return true;
    }
    return false;
}









// Run main function
// ==========================================================================================================


const exercise=[{x:canvasWidth*50/600,y:350*canvasHeight/500,l:200*canvasWidth/600,h:100*canvasHeight/500},{x:200*canvasWidth/600,y:50*canvasHeight/500,l:200*canvasWidth/600,h:300*canvasHeight/500},{x:350*canvasWidth/600,y:200*canvasHeight/500,l:200*canvasWidth/600,h:250*canvasHeight/500}]
var i=0;

function Exercise(results) {


    var clr='blue';
    
        ctx2.beginPath();
        ctx2.strokeStyle='yellow';
        ctx2.lineWidth=5;
        ctx2.rect(exercise[i].x,exercise[i].y,exercise[i].l,exercise[i].h);
        ctx2.stroke();
        bx=exercise[i].x/canvasWidth;
        bl=exercise[i].l/canvasWidth;
        by=exercise[i].y/canvasHeight;
        bh=exercise[i].h/canvasHeight;

        if (i==0){
            instruct.innerHTML='Do pushup';
            if (inbox(results.poseLandmarks[11],bx,by,bh,bl) && inbox(results.poseLandmarks[12],bx,by,bh,bl)){
                i=(i+1)%3;
                count+=1;
                // countElement.innerHTML=count;
                
            }
        }
        else if(i==1){
            instruct.innerHTML='Jump';
            if (inbox(results.poseLandmarks[27],bx,by,bh,bl) && inbox(results.poseLandmarks[28],bx,by,bh,bl)){
                i=(i+1)%3;
                count+=1;
                // countElement.innerHTML=count;
                
            }
        }
        else{
            instruct.innerHTML='Squat';
            if (inbox(results.poseLandmarks[11],bx,by,bh,bl) && inbox(results.poseLandmarks[12],bx,by,bh,bl)){
                i=(i+1)%3;
                count+=1;
                // countElement.innerHTML=count;
                
            }
        }
        // drawLandmarks(ctx1, results.poseLandmarks,
        //           {color: clr, lineWidth: 2});
        // ctx2.beginPath();
        // ctx2.globalAlpha=0.6;
        // ctx2.fillStyle='black';
        // ctx2.fillRect(0,canvasHeight*0.9,canvasWidth,canvasHeight*0.2);

        // ctx2.globalAlpha=1;
        // ctx2.fillStyle='yellow';
        // ctx2.font = "900 "+canvasHeight*0.05+"px Arial";
        // ctx2.fillText('Score: '+count,0,canvasHeight*0.975);
       
    

  }
  
 
document.addEventListener("DOMContentLoaded",()=>{
    const bird=document.querySelector(".bird");
    const gameDisplay=document.querySelector(".game-container");
    const ground=document.querySelector(".ground")

    let birdLeft=220
    let birdBottom=100
    let gravity=3
    let isGameOver=false;
    let gap=430
    let score=0;

    function startGame(){
        birdBottom-=gravity
        bird.style.bottom=birdBottom+"px"
        bird.style.left=birdLeft+"px"
    }
    let gametimerId=setInterval(startGame,20)


    function control(e){
        if(e.keycode===32) jump()
    }

    function jump(){
        if(birdBottom <500) birdBottom+=50
        bird.style.bottom=birdBottom+"px"
    }
    document.addEventListener("keyup",jump);


    function generateObstacle(){
        let obstacleLeft=500
        let randomHeight=Math.random()*200
        let obstacleBottom=randomHeight
        const obstacle=document.createElement("div")
        const topObstacle=document.createElement("div")
        if(!isGameOver){ 
        obstacle.classList.add("obstacle")
        topObstacle.classList.add("topObstacle")
        score++;    
}  
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left=obstacleLeft+"px"
        topObstacle.style.left=obstacleLeft+"px"
        obstacle.style.bottom=obstacleBottom+"px"
        topObstacle.style.bottom=obstacleBottom+gap +"px"

        function moveObstacle(){
            obstacleLeft-=2
            obstacle.style.left=obstacleLeft+"px"
            topObstacle.style.left=obstacleLeft+"px"

            if(obstacleLeft===-60){
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }
            if(
                obstacleLeft>200 && obstacleLeft<280       && birdLeft===220 && (birdBottom<obstacleBottom+153 || birdBottom>obstacleBottom+gap-200)||
                birdBottom===0){
                gameOver()
                clearInterval(timerId)
            }
           
            
        }
        let timerId=setInterval(moveObstacle,20)
       if(!isGameOver) setTimeout(generateObstacle,3000)
    }
    generateObstacle()


    function gameOver(){
        clearInterval(gametimerId)
        console.log("gameOver")
       document.getElementById("demo").innerHTML="GAME<br> OVER"
       document.getElementById("score").innerHTML="Your Score<br>"+"  => "+score+"<br>"
        var btn=document.createElement("button");
        btn.innerHTML="START"  
        document.getElementById("score").appendChild(btn)
       btn.addEventListener("click",function(){
        location.reload()
       })
        isGameOver=true;  
        document.removeEventListener("keyup",control)
        
    }
})
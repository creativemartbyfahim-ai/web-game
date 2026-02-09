const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 360;
canvas.height = 600;

let player = { x:180, y:520, w:30, h:30 };
let bullets = [];
let enemies = [];
let score = 0;

document.addEventListener("touchstart", e => {
  bullets.push({ x: player.x+12, y: player.y });
});

function spawnEnemy(){
  enemies.push({
    x: Math.random()*330,
    y: -30,
    w:30, h:30
  });
}

setInterval(spawnEnemy, 1000);

function update(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // Player
  ctx.fillStyle="lime";
  ctx.fillRect(player.x,player.y,player.w,player.h);

  // Bullets
  bullets.forEach((b,i)=>{
    b.y -= 6;
    ctx.fillRect(b.x,b.y,5,10);
    if(b.y<0) bullets.splice(i,1);
  });

  // Enemies
  enemies.forEach((e,i)=>{
    e.y += 3;
    ctx.fillStyle="red";
    ctx.fillRect(e.x,e.y,e.w,e.h);

    bullets.forEach((b,bi)=>{
      if(b.x<e.x+e.w && b.x+5>e.x &&
         b.y<e.y+e.h && b.y+10>e.y){
        enemies.splice(i,1);
        bullets.splice(bi,1);
        score+=10;
      }
    });

    if(e.y>canvas.height){
      alert("Game Over\nScore: "+score);
      location.reload();
    }
  });

  ctx.fillStyle="#fff";
  ctx.fillText("Score: "+score,10,20);

  requestAnimationFrame(update);
}

update();

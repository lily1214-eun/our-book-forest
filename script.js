// ---------------------
// 참여 인원
// ---------------------

const people = 0;

document.getElementById("count").innerText = `${people} / 508`;


// ---------------------
// 페이지 전환
// ---------------------

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

function showPage1(){

    page1.classList.add("active");
    page2.classList.remove("active");

    setTimeout(showPage2,20000);

}

function showPage2(){

    page2.classList.add("active");
    page1.classList.remove("active");

createForest();

    setTimeout(showPage1,90000);

}

showPage1();

// --------------------------
// 나비
// --------------------------

const butterfly = document.getElementById("butterfly");

function flyButterfly(){

    butterfly.animate([

{
    transform:"translate(-180px,20px) rotate(-8deg) scale(.9)",
    opacity:0
},

{
    transform:"translate(150px,-15px) rotate(8deg) scale(1)",
    opacity:1,
    offset:.12
},

{
    transform:"translate(420px,20px) rotate(-8deg)",
    offset:.32
},

{
    transform:"translate(700px,-25px) rotate(8deg)",
    offset:.52
},

{
    transform:"translate(980px,18px) rotate(-8deg)",
    offset:.72
},

{
    transform:"translate(1280px,-12px) rotate(10deg)",
    opacity:1
},

{
    transform:"translate(1500px,10px)",
    opacity:0
}

],{

    duration:20000,
    easing:"ease-in-out",
    fill:"forwards"

});

}

setInterval(flyButterfly,35000);

flyButterfly();


// --------------------------
// 잠자리
// --------------------------

const dragonfly = document.getElementById("dragonfly");

function flyDragonfly(){

    dragonfly.animate([

{
    transform:"translate(180px,20px) rotate(-5deg)",
    opacity:0
},

{
    transform:"translate(-100px,10px) rotate(3deg)",
    opacity:1,
    offset:.12
},

{
    transform:"translate(-420px,-10px) rotate(-2deg)",
    offset:.32
},

{
    transform:"translate(-700px,-40px) rotate(4deg)",
    offset:.55
},

{
    transform:"translate(-980px,-70px) rotate(-3deg)",
    offset:.78
},

{
    transform:"translate(-980px,-70px)",
    opacity:1,
    offset:0.92
},

{
    transform:"translate(-1200px,-180px)",
    opacity:0
}

],{

    duration:22000,
    easing:"ease-in-out",
    fill:"forwards"

});

}

setInterval(flyDragonfly,50000);

setTimeout(flyDragonfly,2000);

// --------------------------
// 우리들의 책숲
// --------------------------

const leafArea = document.getElementById("leafArea");

const testMessages=[

"샌드아트가\n재미있었어요.",
"친구와 함께\n책을 읽었어요.",
"작가님을\n만나서 좋았어요.",
"도서관이\n즐거웠어요.",
"다음에도\n참여하고 싶어요."

];

// 사용할 위치 (20개)

const positions=[

{x:8,y:6},
{x:28,y:8},
{x:48,y:6},
{x:68,y:8},
{x:84,y:6},

{x:10,y:25},
{x:32,y:27},
{x:55,y:25},
{x:78,y:27},

{x:8,y:46},
{x:30,y:48},
{x:52,y:46},
{x:74,y:48},
{x:88,y:46},

{x:12,y:64},
{x:36,y:65},
{x:60,y:64},
{x:82,y:65},

{x:25,y:72},
{x:55,y:72}

];

function shuffle(array){

    return [...array].sort(()=>Math.random()-0.5);

}

function createForest(){

    leafArea.innerHTML="";

    const spots=shuffle(positions);

    for(let i=0;i<20;i++){

        const leaf=document.createElement("div");

        leaf.className="leaf";

        const size=235+Math.random()*35;

        leaf.style.width=size+"px";


        // 나뭇잎 종류

        const r=Math.random();

        let type=1;

        if(r<0.45){

            type=1;

        }else if(r<0.8){

            type=2;

        }else{

            type=3;

        }

        leaf.style.left=spots[i].x+"%";
        leaf.style.top=spots[i].y+"%";

        leaf.innerHTML=`

            <img src="images/leaf${type}.png">

            <div class="leafText">

            ${testMessages[Math.floor(Math.random()*testMessages.length)].replace(/\n/g,"<br>")}

            </div>

        `;

        leaf.style.animationDelay=(i*0.18)+"s";
        leaf.style.animation += ", leafSwing " + (5+Math.random()*3) + "s ease-in-out infinite";

        leafArea.appendChild(leaf);

    }

}
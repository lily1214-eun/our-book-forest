// ---------------------
// Google Form 응답
// ---------------------

const GOOGLE_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycby_VTVr97DQndMiBSB_HMbYKkPgHpj9EnviTMf8exnAcQVkClW8CyvUrjQtIewRYo/exec";

let responses = [];

async function loadResponses(){

    try{

        const response = await fetch(GOOGLE_SCRIPT_URL);

        const data = await response.json();

        responses = data.responses;

        document.getElementById("count").innerText =
            `${data.count} / 508`;

    }catch(error){

        console.log("응답을 불러오지 못했습니다.", error);

    }

}

// 처음 한 번 불러오기
loadResponses();

// 30초마다 새 응답 확인
setInterval(loadResponses,30000);


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


// --------------------------
// 나뭇잎 위치
// 총 18개
// --------------------------

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

    {x:25,y:72}

];


// --------------------------
// 나뭇잎 생성
// --------------------------

function createForest(){

    leafArea.innerHTML="";

    if(responses.length === 0){

        return;

    }


    // --------------------------------
    // 현재 보여줄 18개 응답 계산
    // --------------------------------

    const batchSize = 18;

    const totalBatches =
        Math.ceil(responses.length / batchSize);


    // 현재 몇 번째 묶음을 보여줄지 계산
    // 페이지가 새로 만들어질 때마다
    // 다음 묶음으로 넘어감

    if(typeof createForest.currentBatch === "undefined"){

        createForest.currentBatch = 0;

    }else{

        createForest.currentBatch++;

    }


    // 마지막 묶음까지 갔다면
    // 다시 첫 번째 묶음으로 돌아감

    if(createForest.currentBatch >= totalBatches){

        createForest.currentBatch = 0;

    }


    const startIndex =
        createForest.currentBatch * batchSize;


    const currentResponses =
        responses.slice(
            startIndex,
            startIndex + batchSize
        );


    // --------------------------
    // 나뭇잎 만들기
    // --------------------------

    for(let i=0; i<currentResponses.length; i++){

        const responseData =
            currentResponses[i];

        const leaf =
            document.createElement("div");

        leaf.className="leaf";


        // 기존 나뭇잎 크기 그대로 유지

        const size =
            235 + Math.random()*35;

        leaf.style.width =
            size+"px";


        // --------------------------
        // 나뭇잎 종류 랜덤
        // --------------------------

        const r=Math.random();

        let type=1;

        if(r<0.45){

            type=1;

        }else if(r<0.8){

            type=2;

        }else{

            type=3;

        }


        // --------------------------
        // 위치
        // --------------------------

        leaf.style.left =
            positions[i].x+"%";

        leaf.style.top =
            positions[i].y+"%";


        // --------------------------
        // 내용
        // --------------------------

        leaf.innerHTML=`

            <img src="images/leaf${type}.png">

            <div class="leafText">

                ${responseData.message.replace(/\n/g,"<br>")}

                <div class="studentInfo">

                    ${responseData.grade}
                    ${responseData.className}
                    ${responseData.name}

                </div>

            </div>

        `;


        // --------------------------
        // 등장 애니메이션
        // --------------------------

        leaf.style.animationDelay =
            (i*0.18)+"s";


        leaf.style.animation +=
            ", leafSwing " +
            (5+Math.random()*3) +
            "s ease-in-out infinite";


        leafArea.appendChild(leaf);

    }

}

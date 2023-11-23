document.addEventListener("DOMContentLoaded", function() {
    const gameContainer = document.getElementById("game-container");
    const tiles = {
        A: document.getElementById("tileA"),
        S: document.getElementById("tileS"),
        D: document.getElementById("tileD"),
        F: document.getElementById("tileF"),
    };
    let score = 0;
    let isKeyPressed = {
        A: false,
        S: false,
        D: false,
        F: false,
    };

    function getRandomPosition() {
        return Math.floor(Math.random() * (gameContainer.clientHeight - 200));
    }

    // 웹컬러를 자동생성 한다.
    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 5; i < 15; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // 초기 타일 설정
    Object.keys(tiles).forEach(function(key) {
        tiles[key].style.top = getRandomPosition() + "px";
        tiles[key].style.backgroundColor = getRandomColor();
    });

    let tileSpeeds = {
        A: Math.random() * 10 + 1,
        S: Math.random() * 10 + 1,
        D: Math.random() * 10 + 1,
        F: Math.random() * 10 + 1,
    };

    function updateTiles() {
        Object.keys(tiles).forEach(function(key) {
            tiles[key].style.top = tilePositions[key] + "px";


            if(isKeyPressed[key]) {
                //console.log("key = "+ key +">> 노량");
                tiles[key].style.backgroundColor = "#ff0";      // 노랑
            }else{
                //console.log("key = "+ key +">> 검정");
                tiles[key].style.backgroundColor = "#000";      // 검정
            }
        });
    }

    function handleKeyPress(event) {
        const key = event.key.toUpperCase();

        if(isKeyPressed[key]) {
            return; // 이미 키가 눌려있으면 무시
        }

        // 정해진 구역 밖에서 키가 눌렸을 때
        if(tiles[key] 
            && (tilePositions[key] < 300 || tilePositions[key] > 350)) {
            tiles[key].style.backgroundColor = "#f00"; // 빨간색으로 설정
        }

        if (tiles[key] 
            && tilePositions[key] >= 250 
            && tilePositions[key] <= 400) {
            
            // 점수를 할당
            isKeyPressed[key] = true;
            score++;
            userScore=document.getElementById('userScore');
            userScore.value = score;

            setTimeout(function() {
              // 타일 초기화 
              tilePositions[key] = 0;  
              isKeyPressed[key] = false; // 키를 누를 수 있도록 리셋
            }, 100);

        }
    }

    function gameLoop() {
        // ■ 게임 루프 내에서 필요한 로직 구현
        Object.keys(tiles).forEach(function(key) {
            tilePositions[key] += tileSpeeds[key]; // 랜덤한 속도로 타일이 아래로 내려가도록 변경

            if (tilePositions[key] > (gameContainer.clientHeight-100)) {
                // 정해진 구역에 도달하면 위치 초기화 및 랜덤한 속도 다시 설정
                tilePositions[key] = 0;
                tiles[key].style.backgroundColor = getRandomColor();
                tileSpeeds[key] = Math.random() * 10 + 1;
                isKeyPressed[key] = false; // 키를 누를 수 있도록 리셋
            }
        });

        updateTiles();
    }

    // ■ 키보드 이벤트 리스너 등록
    document.addEventListener("keydown", handleKeyPress);

    // ■ 초기 타일 위치 설정 및 게임 루프 시작
    let tilePositions = {
        A: 0,
        S: 0,
        D: 0,
        F: 0,
    };
    setInterval(gameLoop, 50); // 50ms마다 게임 루프 실행
});

const player = document.getElementById('player');
const obstaclesContainer = document.getElementById('obstacles');
const scoreDisplay = document.getElementById('score');
const quiz = document.getElementById('quiz');
const quizQuestion = document.getElementById('quizQuestion');
const quizAnswer = document.getElementById('quizAnswer');
const quizSubmit = document.getElementById('quizSubmit');

let playerY = 50; // プレイヤーのY座標
let gravity = 2; // 重力の強さ
let isJumping = false;
let score = 0;
let obstacleSpeed = 3; // 障害物の進む速度
let gameTime = 0; // ゲームの経過時間
let checkpointTime = 30; // チェックポイント時間
let gameInterval;
let obstacleInterval;
let obstacleSpawnTime = 10000; // 初期障害物出現間隔（10秒）

function startGame() {
    document.addEventListener('click', jump);
    gameInterval = setInterval(gameLoop, 20);
    obstacleInterval = setInterval(spawnObstacle, obstacleSpawnTime);
}

function jump() {

    isJumping = true;
    let jumpHeight = 0;
    
    const jumpInterval = setInterval(() => {
        if (jumpHeight < 100) { // 最大ジャンプ高さ
            playerY += 5;
            jumpHeight += 5;
            updatePlayerPosition();
        } else {
            clearInterval(jumpInterval);
            const fallInterval = setInterval(() => {
                if (playerY > 50) { // 地面に戻る
                    playerY -= 5;
                    updatePlayerPosition();
                } else {
                    clearInterval(fallInterval);
                    isJumping = false;
                }
            }, 20);
        }
    }, 20);
}

function updatePlayerPosition() {
    player.style.bottom = playerY + 'px';
}

function spawnObstacle() {
    const obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    const type = Math.floor(Math.random() * 3); // 障害物の種類をランダムに決定
    if (type === 0) {
        // シンプルな壁
        obstacle.style.width = '30px';
        obstacle.style.height = Math.random() * 100 + 50 + 'px'; // ランダムな高さ
    } else if (type === 1) {
        // 上下に動く玉
        obstacle.style.width = '30px';
        obstacle.style.height = '30px';
        obstacle.style.borderRadius = '50%'; // 丸い障害物
        obstacle.style.backgroundColor = '#FFD700'; // 玉の色
        moveBall(obstacle);
    } 
    obstacle.style.bottom = '0';
    obstacle.style.right = '-50px'; // 画面外からスタート
    obstaclesContainer.appendChild(obstacle);
    moveObstacle(obstacle);
}

function moveObstacle(obstacle) {
    const moveInterval = setInterval(() => {
        let rightPos = parseInt(obstacle.style.right);
        obstacle.style.right = (rightPos + obstacleSpeed) + 'px'; // 障害物を移動

        // 障害物が画面外に出たら削除
        if (rightPos > window.innerWidth) {
            clearInterval(moveInterval);
            obstaclesContainer.removeChild(obstacle);
        }

        // 衝突判定
        if (isColliding(obstacle)) {
            alert('ゲームオーバー! スコア: ' + score);
            clearInterval(gameInterval);
            clearInterval(obstacleInterval);
        }
    }, 20);
}

function moveBall(ball) {
    let direction = 1; // 動く方向
    const ballInterval = setInterval(() => {
        let bottomPos = parseInt(ball.style.bottom);
        if (bottomPos > 200 || bottomPos < 0) direction *= -1; // 上下の限界
        ball.style.bottom = (bottomPos + (direction * 2)) + 'px'; // 上下に動く

        // 衝突判定
        if (isColliding(ball)) {
            alert('ゲームオーバー! スコア: ' + score);
            clearInterval(gameInterval);
            clearInterval(obstacleInterval);
            clearInterval(ballInterval);
        }
    }, 20);
}

function isColliding(obstacle) {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    return !(playerRect.right < obstacleRect.left ||
             playerRect.left > obstacleRect.right ||
             playerRect.bottom < obstacleRect.top ||
             playerRect.top > obstacleRect.bottom);
}

function gameLoop() {
    gameTime += 0.02; // 秒数を増加

    // スコア計算
    score = Math.floor(gameTime * 100);
    scoreDisplay.innerText = 'スコア: ' + score;

    // 障害物の速度調整
    if (gameTime > 150) {
        obstacleSpeed = 4; // 速度アップ
        obstacleSpawnTime = 7000; // 7秒おきに出現
    }
    if (gameTime > 270) {
        obstacleSpeed = 4.5; // さらに速度アップ
        obstacleSpawnTime = 5000; // 5秒おきに出現
    }

    // チェックポイント
    // if (Math.floor(gameTime) % checkpointTime === 0 && gameTime > 0) {
    //     quiz.style.display = 'block';
    //     askQuiz();
    // }
}

function askQuiz() {
    const questions = [
        { question: "1 + 1は？", answer: "2" },
        { question: "3 + 5は？", answer: "8" },
        { question: "10 - 4は？", answer: "6" }
    ];
    const currentQuestion = questions[Math.floor(Math.random() * questions.length)];
    quizQuestion.innerText = currentQuestion.question;
    quizSubmit.onclick = () => {
        if (quizAnswer.value === currentQuestion.answer) {
            quiz.style.display = 'none';
            quizAnswer.value = '';
        } else {
            score -= 2400; // 減点
            alert('不正解です！スコアが2400減点されました。');
            quiz.style.display = 'none';
            quizAnswer.value = '';
        }
    }
}
startGame();
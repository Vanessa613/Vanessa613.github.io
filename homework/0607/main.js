        //宣告DOM
        const guessInput = document.getElementById('guess_input')
        const hintArea = document.querySelector('.hint')
        const guessBtn = document.getElementById('guess_btn')
        const restartBtn = document.getElementById('restart_btn')
        const showAnswerBtn = document.getElementById('show_answer_btn')

        //宣告變數max min
        let minNum, maxNum, answerNum, guessNum

        //Dom事件掛載
        showAnswerBtn.addEventListener('click',function(){
            alert(answerNum)
        })

        restartBtn.addEventListener('click', function(){
            init()
        })

        guessBtn.addEventListener('click', guess)

        window.onload = function(){
            init()
        }

        function guess(){
            const val = guessInput.value.trim()
            if(val === '' || isNaN(val) || val[0] === '0'){
                alert('請重新輸入')
                guessInput.value = ''
                return
            }

            guessNum = parseInt(val)

            if(guessNum < minNum || guessNum > maxNum){
                showHint()
                guessInput.value = ''
                alert('請確認輸入範圍')
                return
            }

            if(guessNum === answerNum){
                alert(`Boom! answer is ${answerNum}`)
                init()
                return
            }else if(guessNum < answerNum){
                minNum = guessNum
            }else if(guessNum > answerNum){
                maxNum = guessNum
            }
            guessInput.value = ''
            showHint()
        }

        function showHint(){
            hintArea.textContent = `請輸入${minNum}-${maxNum}之間的數字`
        }

        /**
        *預設值處理
        */
        function init() {
            guessInput.value = ''
            minNum = 1
            maxNum = 100
            answerNum = generateAnswer()
            showHint()
        }
        //產生遊戲開始的數字
        function generateAnswer() {
            return getRandomIntInclusive(minNum, maxNum)
        }

        function getRandomIntInclusive(min,max) {           
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random()*(max-min+1)+min);
        }
const paras = [
    "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
    "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    "You've gotta dance like there's nobody watching, Love like you'll never be hurt, Sing like there's nobody listening, And live like it's heaven on earth",
    "You know you're in love when you can't fall asleep because reality is finally better than your dreams."
]

const text = Math.floor(Math.random() * (paras.length - 0) + 0)
let currentIndex = 0
let startTime = null
let correctWordCount = 0

const showPara = document.getElementById('showPara')
// showPara.textContent = paras[text]

paras[text].split('').forEach((char) => {
    const span = document.createElement('span')
    span.innerText = char === ' '? ' ': char
    showPara.appendChild(span)
})

const handlekeydown = (event) => {

    if(!startTime){
        startTime = new Date()
    }
    const spans = document.querySelectorAll('span')

    if(event.key === 'Backspace' && currentIndex > 0){
        spans[currentIndex].classList.remove('current')
        currentIndex--
        spans[currentIndex].classList.remove('correct', 'incorrect')
        spans[currentIndex].classList.add('current')

        return
    }

    if(event.key.length > 1) return

    if(event.key === showPara.textContent[currentIndex]){
        spans[currentIndex].classList.add('correct')
        spans[currentIndex].classList.add('current')
    } else{
        spans[currentIndex].classList.add('incorrect')
    }

    spans[currentIndex].classList.remove('current')
    currentIndex++
    if(currentIndex < spans.length){
        spans[currentIndex].classList.add('current')
    }

    if(currentIndex >= showPara.textContent.length){
        document.removeEventListener('keydown', handlekeydown)

        const endTime = new Date()
        const timeElapsed = (endTime - startTime) / 1000 / 60

        const originalWords = paras[text].split(' ')
        const userWords = showPara.querySelectorAll('.correct')
        const typedWords = [...userWords].map(span => span.innerText).join('').split(' ')

        correctWordCount = originalWords.filter((word, index) => word === typedWords[index]).length

        const wpm = correctWordCount / timeElapsed

        const totalTypedCharacters = currentIndex
        const correctCharacters = document.querySelectorAll('.correct').length
        const accuracy = (correctCharacters / totalTypedCharacters) * 100
        document.getElementById('result').innerText = `Typing Speed : ${Math.round(wpm)} WPM \nAccuracy : ${accuracy.toFixed(2)}%`
    }
}

document.addEventListener('keydown', handlekeydown)
document.querySelectorAll('span')[0].classList.add('current')
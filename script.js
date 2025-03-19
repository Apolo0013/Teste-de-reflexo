function Contagem() {
    let index = 0
    let elements = null
    console.log(ListaVerde)
    let loop = setInterval(() => {
        elements = window.document.querySelectorAll(`.${ListaVerde[index]}`) // pegando as duas bolas
        console.log(elements[0])
        //Primeira bola
        elements[0].style.boxShadow = '0px 0px 15px 5px rgb(1, 138, 1)' // add style na primeira bola
        elements[0].style.background = 'var(--cor-verde)' // add style na primeiera bola
        //Segunda bola
        elements[1].style.boxShadow = '0px 0px 15px 5px rgb(1, 138, 1)' // add style na segunda bola
        elements[1].style.background = 'var(--cor-verde)' // add style na segunda bola
        index++
        if (index == 4) {
            clearInterval(loop)
            for (let elemento of document.querySelectorAll('.bolaVermelha')) {
                elemento.style.boxShadow = '0px 0px 15px 5px rgb(138, 1, 1)'
                elemento.style.background = 'var(--cor-vermelho)'
            }
            Contar()
        }
    }, 1250)
}

function Contar() {
    ClicaReflexo = true
    inicio = Date.now()
    let loop = setInterval(() => {
        let tempoAtual = Date.now() - inicio
        let formatado = (tempoAtual / 1000).toFixed(3)
        Contador.innerText = formatado
        if (!ContarMs) {
            ContarMs = true
            ClicaReflexo = false
            clearInterval(loop)
        }
    }, 1)
}


function ShowConteiner() {
    setTimeout(() => {
        botao.style.display = 'none'
        conteiner.style.display = 'flex'
        Contador.style.display = 'flex'
        conteiner.style.animation = 'Aparace 1s ease-in-out 1 forwards'
        setTimeout(() => {
            Contador.style.animation = 'Subir 1s ease-in-out 1 forwards'
            setTimeout(() => {
                Contador.style.opacity = 1
                Contagem()
            }, 1000)
        }, 1100)
    },1300)
}


function Começa() {
    //Botao style
    botao.style.color = 'black'
    botao.disabled = true
    setTimeout(() => {
        botao.style.animation = 'desa 1s ease-in-out 1 forwards'
        ShowConteiner()
    }, 500)
}

const botao = window.document.getElementById('botao')
//Lista do verde
let ListaVerde = ["bolaVcol1", "bolaVcol2", "bolaVcol3", "bolaVcol4"]

//Bola vermela
const bolasvermelha = window.document.querySelector('.bolaVermelha')
const conteiner = window.document.querySelector('.conteiner')
const Contador = window.document.querySelector('.Time')
//Variavel qua vai controlar o loop de conta os ms
let ContarMs = true
//Variavel que vai dizer se o evento do click do bady esta ativo. Como Assim?: Bom, pra o teste de reflexo, quando a luz fica vermelha temos que liberar um local pro usuario clica, certo? que sera o body, "Porque o Body" body é a pagina toda, entao ele pode clica em tudo, pra esse teste.
window.document.body.addEventListener('click', function () {
    if (ClicaReflexo) {
        ClicaReflexo = false
        ContarMs = false
        setTimeout(() => { // esperando 2s pra desligar as luzes
            let Bolas = window.document.querySelectorAll('.Bola')
            for (let element of Bolas) {
                element.style.boxShadow = 'none'
                element.style.background = 'var(--cor-luz-apagada)'
            }
            setTimeout(() => { // esperando 2s pra add animação do conteiner desaparecendo
                conteiner.style.animation = 'desaparece 1s ease-in-out 1 forwards'
                setTimeout(() => { // esperando 1.1s pra add animação do time decendo
                    Contador.style.animation = 'ShowTime 1.5s ease-in-out 1 forwards'
                    setTimeout(() => { // esperando 1.5s pra cria o elemento botao de tenta novamente
                        Contador.style.transform = 'translateY(200%)'
                        let botaotente = window.document.createElement('button') // criando um elemento button
                        botaotente.innerText = 'Testa Novamente' // text pra ele
                        botaotente.classList.add('Novamente') // add a class
                        window.document.querySelector('main').appendChild(botaotente) // add ele no elemento main
                        botaotente.style.animation = 'Subir 1s ease-in-out 1 forwards' //animação de chegar paeeeeeeeeeeeee
                        botaotente.addEventListener('click', function () {
                            Contador.style.animation = 'desaparece 1s ease-in-out 1 forwards'
                            setTimeout(() => {
                                Contador.style.opacity = 0
                                this.style.animation = 'desaparece 1s ease-in-out 1 forwards'
                                setTimeout(() => {
                                    setTimeout(() => {
                                        Contador.style.transform = 'none'
                                        Contador.innerText = '0.000'
                                        ShowConteiner()
                                        this.remove()
                                    }, 100)
                                }, 1000);
                            }, 1000)
                        })
                    }, 1500) 
                }, 1100);
            }, 2000);
        }, 2000)
    }
})

botao.addEventListener('click', Começa)
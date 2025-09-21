
const tarefa = document.getElementById('input-tarefa')
const TarefaParaIniciar = document.querySelector('#tarefa-para-iniciar')

window.onload = function(){
    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || []
    tarefasSalvas.forEach(texto =>criarTarefa(texto))
}

function adicionarTarefa(){
    const valorTarefa = tarefa.value.trim()
    if(valorTarefa == 0){
        alert('escreva algo para adicionar')
        return
    }

    criarTarefa(valorTarefa)

    salvarTarefa(valorTarefa)

    tarefa.value = ''
}

function criarTarefa(valorTarefa){
     const afazer = document.createElement('p')
    const card = document.createElement('div')
    const deletar = document.createElement('div')

    deletar.innerHTML = 'X'
    deletar.classList= 'delete'
    afazer.textContent = valorTarefa

    card.classList ='card-tarefa'
    card.draggable = 'true'

    card.appendChild(afazer)
    card.appendChild(deletar)
    TarefaParaIniciar.appendChild(card)


    card.addEventListener('dragstart', dragStart)
    card.addEventListener('drag', dragging)
    card.addEventListener('dragend',dragend )

    deletar.addEventListener('click', function(){
        deletarTarefa(card, valorTarefa)
    })
}

function salvarTarefa(texto){
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
    tarefas.push(texto)
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function deletarTarefa(card,texto){
    card.remove()
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
    tarefas = tarefas.filter(t => t !== texto)
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function dragStart(){
    this.classList.add('card-sendo-arrastado')
   
}
function dragend(){

    this.classList.remove('card-sendo-arrastado')
}

function dragging(){
    console.log('arrastando')
}


function allowDrop(event){
    event.preventDefault()
    const cardSendoArrastado = document.querySelector('.card-sendo-arrastado')
    event.currentTarget.appendChild(cardSendoArrastado)
}



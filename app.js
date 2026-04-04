// BANCO SIMULADO (localStorage)

let alunos = JSON.parse(localStorage.getItem("alunos")) || [
  {id:"1",nome:"Benedito de Oliveira Corrêa"},
  {id:"2",nome:"Arthur"},
  {id:"3",nome:"Camila"},
  {id:"4",nome:"Ana"}
]

let estoque = JSON.parse(localStorage.getItem("estoque")) || []
let presencas = JSON.parse(localStorage.getItem("presencas")) || []

function salvar(){
  localStorage.setItem("estoque",JSON.stringify(estoque))
  localStorage.setItem("presencas",JSON.stringify(presencas))
}

// LOGIN
function login(){
  document.getElementById("loginPage").classList.add("hidden")
  document.getElementById("system").classList.remove("hidden")
  atualizarDashboard()
}

// NAVEGAÇÃO
function navigate(page){
  document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"))
  document.getElementById(page).classList.remove("hidden")
}

// DASHBOARD
function atualizarDashboard(){
  document.getElementById("totalAlunos").innerText = alunos.length
  document.getElementById("alimentadosHoje").innerText = presencas.length
  document.getElementById("faltantes").innerText = alunos.length - presencas.length
  atualizarListaPresenca()
  atualizarEstoque()
}

// PRESENÇA (QR SIMULADO)
function registrarPresenca(){
  let id = document.getElementById("qrInput").value
  let aluno = alunos.find(a=>a.id===id)
  if(!aluno) return alert("Aluno não encontrado")

  presencas.push(aluno)
  salvar()
  atualizarDashboard()
}

// LISTA PRESENÇA
function atualizarListaPresenca(){
  let ul = document.getElementById("listaPresenca")
  ul.innerHTML=""
  presencas.forEach(a=>{
    ul.innerHTML+=`<li>${a.nome}</li>`
  })
}

// ESTOQUE
function addItem(){
  let nome=document.getElementById("novoItem").value
  let qtd=document.getElementById("qtdItem").value
  estoque.push({nome,qtd})
  salvar()
  atualizarEstoque()
}

function atualizarEstoque(){
  let ul=document.getElementById("listaEstoque")
  ul.innerHTML=""
  estoque.forEach(i=>{
    ul.innerHTML+=`<li>${i.nome} - ${i.qtd}</li>`
  })
}

// RELATÓRIO
function gerarRelatorio(){
  let box=document.getElementById("relatorioBox")
  box.innerHTML = `<p>Total refeições mês: ${presencas.length*22}</p>`
}

// LOGOUT
function logout(){location.reload()}
let scannerAtivo = false;

function iniciarScanner() {
  if (scannerAtivo) return;
  scannerAtivo = true;

  const html5QrCode = new Html5Qrcode("reader");

  html5QrCode.start(
    { facingMode: "environment" }, // câmera traseira celular
    {
      fps: 10,
      qrbox: 250
    },
    (decodedText) => {
      registrarPresencaQR(decodedText);
    },
    (errorMessage) => {}
  );
}

function registrarPresencaQR(id) {
  let aluno = alunos.find(a => a.id === id);
  if (!aluno) {
    alert("Aluno não encontrado");
    return;
  }

  // evitar duplicar refeição
  if (presencas.find(p => p.id === id)) {
    alert("Aluno já registrado hoje!");
    return;
  }

  presencas.push(aluno);
  salvar();
  atualizarDashboard();
  alert(aluno.nome + " registrado 🍽️");
}
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then(() => console.log("PWA pronto"))
}
function toggleMenu(){
  document.querySelector(".sidebar").classList.toggle("open")
}

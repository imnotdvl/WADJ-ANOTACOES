firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Notificação
if ("Notification" in window) {
  Notification.requestPermission();
}

function notificar(titulo, corpo) {
  if (Notification.permission === "granted") {
    new Notification(titulo, { body: corpo });
  }
}

function agendarNotificacao(tarefa, data, hora) {
  const dataHora = new Date(`${data}T${hora}`);
  const agora = new Date();
  const tempo = dataHora.getTime() - agora.getTime();

  if (tempo > 0) {
    setTimeout(() => {
      notificar("Hora da tarefa!", `${tarefa} está na hora!`);
    }, tempo);
  }
}

// LOGIN
function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  firebase.auth().signInWithEmailAndPassword(email, senha)
    .catch(e => alert(e.message));
}

function registrar() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  firebase.auth().createUserWithEmailAndPassword(email, senha)
    .catch(e => alert(e.message));
}

function logout() {
  firebase.auth().signOut();
}

// Controle de sessão
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    document.getElementById("loginDiv").style.display = "none";
    document.getElementById("appDiv").style.display = "block";
    carregarTarefas();
  } else {
    document.getElementById("loginDiv").style.display = "block";
    document.getElementById("appDiv").style.display = "none";
  }
});

// Tarefas
function adicionarTarefa() {
  const tarefa = document.getElementById("tarefa").value.trim();
  const data = document.getElementById("data").value;
  const hora = document.getElementById("horaTarefa").value;

  if (!tarefa || !data || !hora) return;

  db.ref("tarefas").push({
    tarefa,
    data,
    hora,
    timestamp: Date.now()
  });

  document.getElementById("tarefa").value = "";
  document.getElementById("data").value = "";
  document.getElementById("horaTarefa").value = "";
}

function carregarTarefas() {
  db.ref("tarefas").on("value", snapshot => {
    const lista = document.getElementById("listaTarefas");
    lista.innerHTML = "";

    const tarefas = [];

    snapshot.forEach(item => {
      tarefas.push({ key: item.key, ...item.val() });
    });

    tarefas.sort((a, b) =>
      new Date(`${a.data}T${a.hora}`) - new Date(`${b.data}T${b.hora}`)
    );

    tarefas.forEach(t => {
      const li = document.createElement("li");

      const texto = document.createElement("span");
      texto.textContent = `${t.tarefa} - ${formatar(t.data, t.hora)}`;

      const btn = document.createElement("button");
      btn.textContent = "Remover";
      btn.onclick = () => db.ref("tarefas/" + t.key).remove();

      li.appendChild(texto);
      li.appendChild(btn);
      lista.appendChild(li);

      agendarNotificacao(t.tarefa, t.data, t.hora);
    });
  });
}

function formatar(data, hora) {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes} às ${hora}`;
}
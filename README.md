# 🧠 WADJ - Controle de Tarefas

Aplicativo simples de organização de tarefas com data, hora e notificações, usando Firebase.

---

## 🚀 Funcionalidades

* Cadastro de tarefas com data e hora
* Notificação no horário exato
* Login com e-mail e senha
* Sincronização em tempo real (Firebase)
* Interface simples e responsiva

---

## 🔐 Segurança

Este projeto usa:

* Firebase Authentication (login obrigatório)
* Realtime Database com regras protegidas

**Obs:** As credenciais do Firebase não estão incluídas no repositório.

---

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
```

2. Crie o arquivo:

```bash
firebase-config.js
```

3. Adicione suas credenciais do Firebase:

```js
const firebaseConfig = {
  apiKey: "SUA_KEY",
  authDomain: "SEU_DOMINIO",
  databaseURL: "SUA_URL",
  projectId: "SEU_ID",
  storageBucket: "SEU_BUCKET",
  messagingSenderId: "SEU_ID",
  appId: "SEU_APP_ID"
};
```

4. Abra o `index.html` no navegador ou hospede no Netlify.

---

## 🛠 Tecnologias

* HTML, CSS, JavaScript
* Firebase (Auth + Realtime Database)

---

## 📌 Observações

* Notificações funcionam apenas com o app aberto no navegador
* Para versão APK com notificações em segundo plano, será necessário usar outra abordagem (ex: React Native ou Capacitor)

---

## 👤 Autor

Davi Quadros - Projeto pessoal desenvolvido para uso familiar.

import './style.css';

const container = document.getElementById('container');

function getID(): string | null {
  const idUrl = new URLSearchParams(window.location.search);
  return idUrl.get('id');
}

async function getData(id: any) {
  const paramsId = getID();
  if(!id) throw new Error('ID não encontrado!')

  const response = await fetch('./data.json')
  const data = await response.json()

  const selected = data.find((item: any) => item.id === id)

  console.log("Objeto correspondente:", selected);
}

function card() {
  if(!container) return;

  container.innerHTML = `
      <div class="profile-pic">
        <img src="" alt="Foto de perfil">
      </div>

      <div class="name">
        <h2></h2>
      </div>

      <div class="links">
        <ul>
          <li>
            <img src="" alt="Ícone blog">
            <a href="">Blog</a>
          </li>
          <li>
            <img src="" alt="Ícone gitlab">
            <a href="">GitLab</a>
          </li>
          <li>
            <img src="" alt="Ícone github">
            <a href="">GitHub</a>
          </li>
          <li>
            <img src="" alt="Ícone linkedin">
            <a href="">LinkedIn</a>
          </li>
          <li>
            <img src="" alt="Ícone instagram">
            <a href="">Instagram</a>
          </li>
          <li>
            <img src="" alt="Ícone email">
            <a href="">Enviar um e-mail</a>
          </li>
        </ul>
      </div>

      <div class="qr-code">
        <img src="" alt="QR-Code">
      </div>
    `;
}

card()
getData('123')
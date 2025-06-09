import './style.css';

const container = document.getElementById('container');

function getID(): string | null {
  const idUrl = new URLSearchParams(window.location.search);
  return idUrl.get('id');
}

function card(selected: any) {
  if (!container) return;

  container.innerHTML = `
    <div class="content" style="background: ${selected.background.valor};">
      <div class="profile-pic">
        <img src="${selected.fotoUrl}" alt="Foto de perfil">
      </div>

      <div class="name" style="color: ${selected.estilos.corTexto};">
        <h2>${selected.nome}</h2>
      </div>

      <div class="links">
        <ul>
          ${selected.links.map((link: any) => {
            return `
              <li class='social-media-link' 
              style="background-color: ${selected.estilos.corLink}; border-radius: ${selected.estilos.borderRadius};">
                <img src="/icons/${link.icone}" alt="Ícone ${link.texto}">
                <a style="color: ${selected.estilos.corTexto};" href="${link.url}">${link.texto}</a>
              </li>
            `;
          }).join('')}
        </ul>
      </div>

      <div class="qr-code">
        <img src="" alt="QR-Code">
      </div>
    </div>
  `;
}

async function getData() {
  const paramsId = getID();
  if(!paramsId) throw new Error('ID não encontrado!')

  const response = await fetch('/data.json')
  const data = await response.json()

  const selected = data.find((item: any) => item.id === paramsId)

  card(selected);

  console.log("Objeto correspondente:", selected);
}

getData()
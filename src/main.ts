import './style.css';

const container = document.getElementById('container');

function getID(): string | null {
  const idUrl = new URLSearchParams(window.location.search);
  return idUrl.get('id');
}

function card(selected: any) {
  if (!container) return;

  let backgroundStyle = '';
  if (selected.background.tipo === 'imagem') {
    backgroundStyle = `url('${selected.background.valor}') no-repeat center/cover`;
  } else {
    backgroundStyle = selected.background.valor;
  }

  container.style.background = backgroundStyle;
  container.style.setProperty('--link-color', selected.estilos.corLink);
  container.style.setProperty('--link-color-hover', selected.estilos.corLinkHover);
  container.style.setProperty('--hover-color', selected.estilos.corHover);
  container.style.setProperty('--text-color', selected.estilos.corTexto);
  container.style.setProperty('--border-radius', selected.estilos.borderRadius);
  container.style.setProperty('--link-bg', selected.estilos.background);
  container.style.setProperty('--border', selected.estilos.border);
  container.style.setProperty('--border-hover', selected.estilos.borderHover);

  container.innerHTML = `
      <div class="profile">
        <img src="${selected.fotoUrl}" alt="Foto usuário">
      </div>
      <div class="name" style="color: ${selected.estilos.corTexto}">
        <h2>${selected.nome}</h2>
      </div>
      <div class="links">
        <ul>
          ${selected.links.map((link: any) => `
            <li class='social-media-link'>
                <img src="/icons/${link.icone}-icon.png" alt="Ícone ${link.texto}">
                <a href="${link.url}">${link.texto}</a>
              </li>
          `).join('')}
        </ul>
      </div>
      <div class="qr-code">
        <img src="${selected.qrcode}" alt="QR-Code">
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
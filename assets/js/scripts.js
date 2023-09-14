let contadorFichajes = 1;
let fichajes = [];

function nuevoFichaje () {
  contadorFichajes++;

  const fichajeContainer = document.querySelector('.fichajes');
  const nuevoFichaje = fichajeContainer.cloneNode(true);

  nuevoFichaje.querySelector('label').textContent = `Fichaje numero ${contadorFichajes.toString().padStart(2, '0')}`

  nuevoFichaje.querySelector('input').value = '';

  nuevoFichaje.querySelector('button').addEventListener('click', () => {
    eliminarFichaje(nuevoFichaje)
  });

  fichajeContainer.parentNode.appendChild(nuevoFichaje);
}

function eliminarFichaje (fichaje) {
  contadorFichajes--;

  fichaje.parentNode.removeChild(fichaje);
}

function calcularHoras () {
  let totalHoras = 0;
  let totalMinutos = 0;
  const inputsFichajes = document.querySelectorAll('input[id="fichaje"]');

  const listaFichajesElement = document.getElementById('listaFichajes');
  listaFichajesElement.innerHTML = '';

  inputsFichajes.forEach(input => {
    const horario = input.value;
    fichajes.push(horario);

    const horasTrabajadas = calcularHorasTrabajadas(horario);
    totalHoras += horasTrabajadas[0];
    totalMinutos += horasTrabajadas[1];

    const fichajeElement = document.createElement('li');
    fichajeElement.classList.add('itemHora');

    const spanHorario = document.createElement('span');
    spanHorario.classList.add('itemHorario');
    spanHorario.textContent = `${horario} `;

    const spanSeparador = document.createElement('span');
    spanSeparador.classList.add('itemSeparador');
    spanSeparador.textContent = '---------';

    const spanHorasMinutos = document.createElement('span');
    spanHorasMinutos.textContent = ` ${horasTrabajadas[0]} hora${horasTrabajadas[0] !== 1 ? 's' : ''}${horasTrabajadas[1] > 0 ? ` y ${horasTrabajadas[1]} minuto${horasTrabajadas[1] !== 1 ? 's' : ''}` : ''}.`;

    fichajeElement.appendChild(spanHorario);
    fichajeElement.appendChild(spanSeparador);
    fichajeElement.appendChild(spanHorasMinutos);

    listaFichajesElement.appendChild(fichajeElement);
  });

  totalHoras += Math.floor(totalMinutos / 60);
  totalMinutos %= 60;

  const calculoHorasElement = document.getElementById('calculoHoras');
  const totalHorasElement = document.getElementById('totalHoras');

  totalHorasElement.textContent = `${totalHoras} hora${totalHoras !== 1 ? 's' : ''}${totalMinutos > 0 ? ` y ${totalMinutos} minuto${totalMinutos !== 1 ? 's' : ''}` : ''}.`;

  calculoHorasElement.classList.remove('boxHidden');
}

function calcularHorasTrabajadas (horario) {
  const [horaInicio, horaFin] = horario.split('//');
  const [inicioHoras, inicioMinutos] = horaInicio.split(':').map(Number);
  const [finHoras, finMinutos] = horaFin.split(':').map(Number);

  let horasTrabajadas;
  let minutosTrabajados;

  if (finHoras > inicioHoras || (finHoras === inicioHoras && finMinutos >= inicioMinutos)) {
    horasTrabajadas = finHoras - inicioHoras;
    minutosTrabajados = finMinutos - inicioMinutos;
  } else {
    horasTrabajadas = 24 - inicioHoras + finHoras;
    minutosTrabajados = finMinutos - inicioMinutos;

    if (minutosTrabajados < 0) {
      minutosTrabajados += 60;
      horasTrabajadas--;
    }
  }

  return [horasTrabajadas, minutosTrabajados];
}

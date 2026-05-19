const attendanceSelect = document.getElementById('attendance');
const guestFields = document.getElementById('guestFields');

attendanceSelect.addEventListener('change', () => {

  if (attendanceSelect.value === 'Sí asistiré') {
    guestFields.classList.add('active');
  } else {
    guestFields.classList.remove('active');
  }

});

const form = document.getElementById('rsvpForm');
const formMessage = document.getElementById('formMessage');

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxHUP_h3ZQ8_luiWrfxzojApABFFWWI_TvTvy5ROcQbjqUmKq-JS4UoPcX1aoalQJkL-A/exec';

form.addEventListener('submit', async (e) => {

  e.preventDefault();

  const submitButton = document.querySelector('.submit-btn');

  submitButton.disabled = true;
  submitButton.innerText = 'Enviando...';

  const formData = {
    name: document.getElementById('name').value,
    attendance: document.getElementById('attendance').value,
    guests: document.getElementById('guests').value,
    phone: document.getElementById('phone').value
  };

  try {

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (data.status === 'success') {

      if (formData.attendance === 'Sí asistiré') {

        formMessage.innerText =
          '¡Perfecto! Tu lugar a bordo ha sido reservado ⚓💖';

      } else {

        formMessage.innerText =
          'Gracias por responder. Te extrañaremos en esta celebración 💖';

      }

      form.reset();
      guestFields.classList.remove('active');

    } else {

      formMessage.innerText =
        'Ocurrió un error. Intenta nuevamente.';

    }

  } catch (error) {

    formMessage.innerText =
      'No se pudo enviar el formulario.';

    console.error(error);

  }

  submitButton.disabled = false;
  submitButton.innerText = 'Confirmar asistencia ⚓';

});
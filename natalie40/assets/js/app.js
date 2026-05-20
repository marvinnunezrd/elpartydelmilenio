const attendanceSelect = document.getElementById('attendance');
const phoneField = document.getElementById('phoneField');
const form = document.getElementById('rsvpForm');
const formMessage = document.getElementById('formMessage');

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxHUP_h3ZQ8_luiWrfxzojApABFFWWI_TvTvy5ROcQbjqUmKq-JS4UoPcX1aoalQJkL-A/exec';

attendanceSelect.addEventListener('change', () => {
  if (attendanceSelect.value === 'Sí asistiré') {
    phoneField.style.display = 'block';
  } else {
    phoneField.style.display = 'none';
    document.getElementById('phone').value = '';
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitButton = document.querySelector('.submit-btn');
  const name = document.getElementById('name').value.trim();
  const attendance = document.getElementById('attendance').value;
  const phone = document.getElementById('phone').value.trim();

  submitButton.disabled = true;
  submitButton.innerText = 'Enviando...';

  const formData = {
    name,
    attendance,
    phone: attendance === 'Sí asistiré' ? phone : '',
    totalConfirmado: attendance === 'Sí asistiré' ? 1 : 0
  };

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (data.status === 'success') {
      if (attendance === 'Sí asistiré') {
        formMessage.innerText =
          '¡Perfecto! Tu lugar a bordo ha sido reservado ⚓💖';
      } else {
        formMessage.innerText =
          'Gracias por responder. Te extrañaremos en esta celebración 💖';
      }

      form.reset();
      phoneField.style.display = 'none';
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
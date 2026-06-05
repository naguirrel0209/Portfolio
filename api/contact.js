import { Resend } from 'resend';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value) {
  return String(value ?? '').trim();
}

function escapeHtml(value) {
  return sanitize(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function validatePayload(payload) {
  const fields = {
    name: sanitize(payload.name),
    email: sanitize(payload.email),
    subject: sanitize(payload.subject),
    message: sanitize(payload.message),
  };

  const errors = {};

  if (!fields.name) {
    errors.name = 'Ingresa tu nombre.';
  }

  if (!fields.email) {
    errors.email = 'Ingresa tu correo.';
  } else if (!emailRegex.test(fields.email)) {
    errors.email = 'Ingresa un correo válido.';
  }

  if (!fields.subject) {
    errors.subject = 'Ingresa un asunto.';
  }

  if (!fields.message) {
    errors.message = 'Escribe tu mensaje.';
  }

  return { fields, errors };
}

function parseBody(request) {
  if (typeof request.body === 'string') {
    return JSON.parse(request.body);
  }

  return request.body;
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    console.warn(`[contact] Método no permitido: ${request.method}`);
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ message: 'Método no permitido.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('[contact] Falta configurar RESEND_API_KEY.');
    return response.status(500).json({ message: 'La configuración de correo no está lista.' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  let body;

  try {
    body = parseBody(request);
  } catch (error) {
    console.error('[contact] Error al leer el body JSON.', error);
    return response.status(400).json({ message: 'No fue posible leer los datos enviados.' });
  }

  const { fields, errors } = validatePayload(body ?? {});

  if (Object.keys(errors).length > 0) {
    console.warn('[contact] Validación fallida.', {
      fields: Object.keys(errors),
    });
    return response.status(400).json({
      message: 'Revisa los campos marcados.',
      errors,
    });
  }

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">Nuevo mensaje desde el portafolio</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(fields.name)}</p>
      <p><strong>Correo:</strong> ${escapeHtml(fields.email)}</p>
      <p><strong>Asunto:</strong> ${escapeHtml(fields.subject)}</p>
      <div style="margin-top: 20px;">
        <strong>Mensaje:</strong>
        <p style="white-space: pre-line;">${escapeHtml(fields.message)}</p>
      </div>
    </div>
  `;

  const text = [
    'Nuevo mensaje desde el portafolio',
    '',
    `Nombre: ${fields.name}`,
    `Correo: ${fields.email}`,
    `Asunto: ${fields.subject}`,
    '',
    'Mensaje:',
    fields.message,
  ].join('\n');

  try {
    const { error } = await resend.emails.send({
      from: 'Portafolio Norman <onboarding@resend.dev>',
      to: ['normanjraguirre@gmail.com'],
      subject: 'Nuevo mensaje desde el portafolio',
      html,
      text,
      replyTo: fields.email,
    });

    if (error) {
      console.error('[contact] Resend rechazó el envío.', error);
      return response.status(500).json({ message: 'No fue posible enviar el mensaje.' });
    }
  } catch (error) {
    console.error('[contact] Error inesperado al enviar con Resend.', error);
    return response.status(500).json({ message: 'No fue posible enviar el mensaje.' });
  }

  console.info('[contact] Mensaje enviado correctamente.');

  return response.status(200).json({ message: 'Mensaje enviado correctamente.' });
}

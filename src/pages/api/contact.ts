import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend('re_YOUR_API_KEY');

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const subject = data.get('subject');
    const message = data.get('message');

    await resend.emails.send({
      from: 'contato@aulasdelatim.com.br',
      to: 'contato@aulasdelatim.com.br',
      subject: `Novo contato: ${subject}`,
      html: `
        <h2>Novo contato do site</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${subject}</p>
        <p><strong>Mensagem:</strong> ${message}</p>
      `
    });

    return new Response(JSON.stringify({
      message: 'Email enviado com sucesso!'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      message: 'Erro ao enviar email'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
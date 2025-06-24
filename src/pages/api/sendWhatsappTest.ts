import type { APIRoute } from 'astro';
import twilio from 'twilio';

const accountSid = import.meta.env.accountSid;
const authToken = import.meta.env.authToken;
const whatsappNumber = 'whatsapp:+1555799155';

const client = twilio(accountSid, authToken);

console.log(accountSid);
console.log(authToken);

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json(); // 👈 Aquí puede lanzar el error si body está vacío

        const { to, message } = data;

        if (!to || !message) {
            return new Response(
                JSON.stringify({ error: 'Número o mensaje faltante' }),
                { status: 400 }
            );
        }
        const msg = await client.messages.create({
            from: whatsappNumber,
            to: `whatsapp:${to.replace(/^whatsapp:/, '')}`, // por si el front lo manda así
            body: message,
        });

        return new Response(JSON.stringify({ sid: msg.sid }), {
            status: 200,
        });
    } catch (err: any) {
        console.error('Error al procesar la solicitud:', err);
        return new Response(JSON.stringify({
            error: 'Error interno del servidor',
            details: err.message || err.code || err
        }), {
            status: 500
        });
    }
};
export const prerender = false;

import twilio from 'twilio';
const { Twilio } = twilio;

//const accountSid =
//const authToken =

const client = new Twilio(accountSid, authToken);

export async function POST({ request }) {
    const raw = await request.text();
    let to, code;

    try {
        const data = JSON.parse(raw);
        to = data.to;
        code = data.code;

        if (!to || !code) {
            return new Response(
                JSON.stringify({ error: "Faltan parámetros: 'to' o 'code'" }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

    } catch (err) {
        return new Response(
            JSON.stringify({ error: "Cuerpo JSON inválido" }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        const message = await client.messages.create({
            from: 'whatsapp:+15557991557', // Tu número habilitado por Meta
            to: `whatsapp:${to}`,           // Número destino
            template: {
                name: 'verifications_2fa_template_hxac885d902c966d9cda3a577188a89fff', // Nombre de la plantilla en Meta
                components: [
                    {
                        type: 'body',
                        parameters: [
                            { type: 'text', text: code } // Valor para {{1}}
                        ]
                    }
                ]
            }
        });

        return new Response(
            JSON.stringify({ sid: message.sid }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (err) {
        console.error('Error al enviar WhatsApp:', err);
        return new Response(
            JSON.stringify({ error: err.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

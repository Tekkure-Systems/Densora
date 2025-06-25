export const prerender = false;

import twilio from 'twilio';
const { Twilio } = twilio;

//const accountSid =
//const authToken =

const client = new Twilio(accountSid, authToken);

export async function POST({ request }) {
    const raw = await request.text();
    console.log("CUERPO RAW:", raw);

    let to, code;
    try {
        const data = JSON.parse(raw);
        to = data.to;
        code = data.code;
    } catch (err) {
        return new Response(
            JSON.stringify({ error: "JSON inválido" }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }
    try {
        const message = await client.messages.create({
            from: 'whatsapp:+15557991557',
            to: `whatsapp:${to}`,
            contentSid: 'HXac885d902c966d9cda3a577188a89fff',
            contentVariables: JSON.stringify({ "1": code })
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
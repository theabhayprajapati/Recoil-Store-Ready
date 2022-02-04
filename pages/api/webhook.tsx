const { buffer, text, json } = require('micro')
import * as admin from 'firebase-admin';


const serviceAccount = require('../../permissions.json')
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app()


console.log('WEBHOOK ENTRY 🔃⛔');


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_SIGNIN_KEY

const fulfillOrder = async (session) => {
    console.log('Filling Order ⏳', session)
    return app
        .firestore()
        .collection('users')
        .doc(session.metadata.email)
        .collection('orders')
        .doc(session.id)
        .set({
            title: (session.metadata.productname),
            // ! unnesscary items was add which was creating error in the codebase.
            amount: session.amount_total / 100,
            amount_shipping: session.total_details.amount_shipping / 100,
            images: JSON.parse(session.metadata.images),
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            console.log('SUCCESS ✅✅✅✅✅✅✅ ADD TO FIRESTORE');
        }).catch(err => { console.log(`Error: ❌❌❌❌❌❌❌${err}`) })

}




// @ts-ignore
export default async (req, res) => {
    console.log('STRIPE ENTRY 💳');

    if (req.method === 'POST') {
        const requestBuffer = await buffer(req)
        const payload = requestBuffer.toString()
        const sig = req.headers['stripe-signature']


        let event;


        // * verify event came from the webhook

        try {
            console.log('TRY ENTRY 💪');

            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
        } catch (err) {
            console.log('Stripe ERROE❌❌❌❌❌❌ 💥', err);

            console.log('❌ ❌❌❌❌❌❌❌❌❌❌❌❌Error: ', err.message)
            return res.status(400).send(`WEBHOOK ERROR:`, err.message)
        }

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            console.log('CHEKCOUT SESION ENTRY 🛫')


            // * calling fulfill order
            return fulfillOrder(session).then(() => res.status(200)).catch((err) => res.status(400).send(`WEBHOOK ERROE ❌❌❌❌❌❌❌❌❌❌❌❌❌❌ ${err.message}`))
        }
        // * hadnd
        console.log(`Webhook received: 💳👍✅${event.type}`)
    }
}
export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    }
}
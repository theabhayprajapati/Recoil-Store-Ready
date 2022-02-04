const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async (req: Request, res: Response) => {
    // @ts-ignore
    const { items, email } = req.body
    console.log('Items:', items);
    console.log('Email:', email);

    const transformedItems = items?.map(item => ({
        description: item.description,
        quantity: 1,
        price_data: {
            currency: 'usd',
            // * problem was with price and as they accept the pennies so we had to add *100
            // * work fine
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                images: [item.image]
            },

        },

    }))
    // ? communitatino with  stripe
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_rates: ['shr_1KNZaXKvwmobunjY1YZj45x7'],
        shipping_address_collection: {
            allowed_countries: ['US', 'CA', 'GB', 'IN'],
        },
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.HOST}/Success`,
        cancel_url: `${process.env.HOST}/Cancel`,
        metadata: {
            productname: items.map(item => item.title).toString(),
            email,
            images: JSON.stringify(items?.map((item => item.image)))
        }

    })
    console.log('All good till here  Response Status 200 ✅✅')
    console.log('first price ✅', items.length);
    res.status(200).json({ id: session.id })
    console.log('json id session 🐍');
}

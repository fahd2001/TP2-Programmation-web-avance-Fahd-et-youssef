const Stripe = require("stripe");

exports.createCheckoutSession = async (req, res) => {
  const { items } = req.body || {};

  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('XXXXXXXX')) {
    console.error('STRIPE_SECRET_KEY manquante ou placeholder detecté dans .env');
    return res.status(500).json({ message: 'Clé Stripe non configurée sur le serveur.' });
  }

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Panier vide ou items invalides.' });
    }

    // Convertir les items en format Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: "cad",
        product_data: {
          name: item.titre,
        },
        unit_amount: Math.round(Number(item.prix) * 100), // en cents
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/paiement/success`,
      cancel_url: `${process.env.CLIENT_URL}/paiement/cancel`,
    });

    res.json({ url: session.url });

  } catch (error) {
    console.error('Erreur création session Stripe:', error);
    // Renvoyer le message d'erreur pour faciliter le debug (sans divulguer de secrets)
    const message = error?.message || 'Erreur Stripe inconnue.';
    res.status(500).json({ message: `Erreur Stripe: ${message}` });
  }
};

import { env } from "@/lib/env";

type MercadoPagoPreferenceInput = {
  purchaseId: string;
  planId: string;
  planName: string;
  amount: number;
  payer: {
    name: string;
    email: string;
    document: string;
  };
};

type MercadoPagoPaymentDetails = {
  id: number;
  status: string;
  external_reference?: string;
};

function ensureMercadoPagoReady() {
  return Boolean(env.mercadoPagoAccessToken && env.mercadoPagoPublicKey);
}

export function isMercadoPagoReady() {
  return ensureMercadoPagoReady();
}

function parseCurrencyToNumber(price: string) {
  const normalized = price.replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", ".");
  const value = Number(normalized);
  return Number.isFinite(value) ? value : 0;
}

export function getNumericPlanAmount(priceLabel: string) {
  return parseCurrencyToNumber(priceLabel);
}

export async function createMercadoPagoPreference(input: MercadoPagoPreferenceInput) {
  if (!ensureMercadoPagoReady()) {
    return null;
  }

  const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.mercadoPagoAccessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          id: input.planId,
          title: input.planName,
          quantity: 1,
          currency_id: "BRL",
          unit_price: input.amount,
        },
      ],
      payer: {
        name: input.payer.name,
        email: input.payer.email,
        identification: {
          type: "CPF",
          number: input.payer.document,
        },
      },
      external_reference: input.purchaseId,
      back_urls: {
        success: `${env.appUrl}/checkout/success`,
        pending: `${env.appUrl}/checkout/pendente`,
        failure: `${env.appUrl}/checkout/pendente`,
      },
      auto_return: "approved",
      notification_url: `${env.appUrl}/api/payments/webhook`,
      payment_methods: {
        installments: 12,
      },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as {
    id?: string;
    init_point?: string;
    sandbox_init_point?: string;
  };

  return data;
}

export async function getMercadoPagoPaymentById(paymentId: string) {
  if (!env.mercadoPagoAccessToken) {
    return null;
  }

  const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${env.mercadoPagoAccessToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as MercadoPagoPaymentDetails;
}

/** Update GOOGLE_BUSINESS_URL after your GBP is live. */
export const SITE = {
  brand: "Apna Kitchen",
  tagline: "Homestyle Halal Pakistani Food · Frisco Pickup",
  phoneDisplay: "+1 (469) 891-1406",
  phoneE164: "14698911406",
  whatsappBase: "https://wa.me/14698911406",
  email: "",
  /** Paste your Google Business Profile share link here when ready */
  googleBusinessUrl: "#google-business",
  addressLine: "Sherbrooke Drive area",
  city: "Frisco",
  state: "TX",
  zip: "75035",
  serviceNote: "Pickup only · Order one day in advance · WhatsApp only",
  hoursNote: "Orders prepared by appointment for next-day pickup",
};

export function waLink(message = "Assalamu Alaikum, I would like to place an order from Apna Kitchen.") {
  return `${SITE.whatsappBase}?text=${encodeURIComponent(message)}`;
}

// How customers reach HTours. Fill these in to show the "Request" buttons on
// the VIP page; while both are empty the buttons stay hidden.
export const CONTACT = {
  // Shown as written in the footer, dialled via tel:.
  phone: "+374 44 074308",
  // International format, digits only, e.g. "37499123456".
  whatsapp: "37444074308",
  email: "",
};

// Full profile URLs, e.g. "https://instagram.com/harabia". Each icon in the
// footer appears once its link is filled in.
export const SOCIAL = {
  instagram: "https://www.instagram.com/harabia.am/",
  facebook: "https://www.facebook.com/harabia.am/",
};

export function whatsappLink(message: string): string | undefined {
  if (!CONTACT.whatsapp) return undefined;
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function emailLink(subject: string): string | undefined {
  if (!CONTACT.email) return undefined;
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;
}

export function phoneLink(): string | undefined {
  if (!CONTACT.phone) return undefined;
  return `tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`;
}

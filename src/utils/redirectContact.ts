export function RedirectContact(
  number = "5585989734951",
  messageWhatsApp?: string,
) {
  window.open(
    `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(messageWhatsApp ?? "")}`, "_blank"
  );
}

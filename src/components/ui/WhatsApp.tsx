const WhatsAppLink = ({
  phoneNumber,
  text,
}: {
  phoneNumber: string;
  text: string;
}) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );
};

export default WhatsAppLink;

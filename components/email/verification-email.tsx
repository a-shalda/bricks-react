interface VerificationEmailProps {
  link: string,
  text: string
}

export const VerificationEmail: React.FC<Readonly<VerificationEmailProps>> = ({
  link, text
}) =>
 (
  <div>
    <p>{text} <a href={link}>{link}</a></p>
  </div>
);
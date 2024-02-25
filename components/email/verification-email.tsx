interface VerificationEmailProps {
  link: string,
  text: string,
  textLink: string
}

export const VerificationEmail: React.FC<Readonly<VerificationEmailProps>> = ({
  link, text, textLink
}) =>
 (
  <div>
    <p>{text}<a href={link}>{textLink}</a></p>
  </div>
);
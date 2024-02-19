interface EmailTemplateProps {
  order: any;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  order,
}) => (
  <div>
    <p>{order.order}</p>
  </div>
);
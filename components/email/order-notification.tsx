interface OrderNotificationProps {
  order: any;
}

export const OrderNotification: React.FC<Readonly<OrderNotificationProps>> = ({
  order,
}) => (
  <div>
    <p>{order.order}</p>
  </div>
);
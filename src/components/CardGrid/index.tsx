import { Card } from "../Card";

export function CardGrid() {
  const cards = [
    {
      icon: '/assets/icons/local-icon.svg',
      title: 'Localização',
      description: 'Veja onde seu pet está a qualquer momento.',
    },
    {
      icon: '/assets/icons/heart-icon.svg',
      title: 'Saúde',
      description: 'Monitore a saúde do seu pet.',
    },
    {
      icon: '/assets/icons/bone-icon.svg',
      title: 'Alimentação',
      description: 'Acompanhe a alimentação em tempo real.',
    },
    {
      icon: '/assets/icons/notify-icon.svg',
      title: 'Notificações',
      description: 'Receba notificações sobre o pet.',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-start p-6">
      {cards.map((card, index) => (
        <Card
          key={index}
          icon={card.icon}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
}
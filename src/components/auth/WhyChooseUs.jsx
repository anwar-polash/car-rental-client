import { FaCar, FaDollarSign, FaMousePointer, FaHeadset } from 'react-icons/fa';
const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaCar className="text-4xl text-blue-500" />,
      title: 'Wide Variety of Cars',
      description: 'From budget-friendly options to luxury vehicles.',
    },
    {
      icon: <FaDollarSign className="text-4xl text-green-500" />,
      title: 'Affordable Prices',
      description: 'Competitive daily rates you can count on.',
    },
    {
      icon: <FaMousePointer className="text-4xl text-purple-500" />,
      title: 'Easy Booking Process',
      description: 'Seamlessly book your ride in just a few clicks.',
    },
    {
      icon: <FaHeadset className="text-4xl text-yellow-500" />,
      title: 'Customer Support',
      description: '24/7 assistance for all your queries.',
    },
  ];
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              {feature.icon}
              <h3 className="mt-4 text-xl font-semibold text-gray-700">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

import React from 'react';
import { motion } from 'framer-motion';

const SpecialOffers = () => {
  const offers = [
    {
      title: 'Get 15% off for weekend rentals!',
      description: 'Plan your weekend getaway with our special discounts.',
      buttonText: 'Learn More',
      bgColor: 'bg-blue-500',
    },
    {
      title: 'Luxury cars at $99/day this holiday season!',
      description: 'Experience luxury at an affordable price this season.',
      buttonText: 'Book Now',
      bgColor: 'bg-green-500',
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Special Offers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              className={`rounded-lg shadow-lg p-6 text-white ${offer.bgColor}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}>
              <h3 className="text-2xl font-semibold mb-4">{offer.title}</h3>
              <p className="text-lg mb-6">{offer.description}</p>
              <button className="bg-white text-gray-800 font-medium px-4 py-2 rounded-lg shadow hover:bg-gray-200 transition">
                {offer.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;

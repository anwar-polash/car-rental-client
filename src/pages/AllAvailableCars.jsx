import CarDisplay from '../components/CarDisplay';

const AllAvailableCars = () => {
  return (
    <section className="min-h-screen">
      <h2 className="text-2xl font-bold text-center my-20">
        All Available Cars
      </h2>
      <CarDisplay />
    </section>
  );
};

export default AllAvailableCars;

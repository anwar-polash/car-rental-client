import RecentListings from '../components/RecentListings';
import SpecialOffers from '../components/SpecialOffers';
import WhyChooseUs from '../components/WhyChooseUs';
import Header from './../components/Header';

const HomePage = () => {
  document.title = 'Home | Chill Gamer';
  return (
    <>
      <Header />
      <RecentListings />
      <WhyChooseUs />
      <SpecialOffers />
    </>
  );
};

export default HomePage;

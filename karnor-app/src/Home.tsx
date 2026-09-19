import HeroComponent from './components/HeroComponent';
import FeatureComponent from './components/FeatureComponent';
import FooterComponent from './components/FooterComponent';
import ShopTeaser from './shop/ShopTeaser';

function Home() {

  return (
    <>
    <HeroComponent />
    <ShopTeaser />
    <FeatureComponent />
    <FooterComponent />
    </>
  );
}

export default Home;

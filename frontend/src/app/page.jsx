
import './page.module.css';
import Nav from './components/Nav';
import Top from './components/Top';
import Recomended from './components/Recomended';

import Cart from './components/Cart';
import Footer from './components/Footer';

function Home()
{




  return (
    <>
      <Cart />
      <Nav />
      <Top />
      <Recomended />
      <Footer />
    </>
  );

}




export default Home;

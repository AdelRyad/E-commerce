
import './page.module.css';
import Nav from './components/Nav';
import Top from './components/Top';
import Recomended from './components/Recomended';
import Footer from './components/footer';
import Cart from './components/Cart';

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

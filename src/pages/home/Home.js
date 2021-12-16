import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import img1 from '../../assets/img1.jpg';

const Home = () => {
  return (
    <div>
      <Header />

      <div className="bg-light rounded-lg img-wrapper">
        <img src={img1} alt="Image1" id="home-img" className="img-fluid" />
        <div className="img-content">
          <h2 className="animate__animated animate__backInLeft">
            <strong>The Online Library</strong>
          </h2>
          <p className="animate__animated animate__backInRight">Opening the door to knowledge.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;

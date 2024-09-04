import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import "./Offer.css";
import Footer from "../Footer/Footer";

const Offers = () => {
  const [offerImages, setOfferImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate(); 

  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  useEffect(() => {
    fetch('https://appsail-50022032157.development.catalystappsail.in/offers')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const shuffledData = shuffleArray(data);
        setOfferImages(shuffledData);
      })
      .catch(error => console.error('Error fetching offer images:', error));
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = offerImages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(offerImages.length / itemsPerPage);

  return (
    <>
      <br />
      <br />
      <br />
      <div className="design-shoba"></div>
      <div className='MainOffers'>
        <h2>Special Offers</h2>
        {currentItems.map((offer) => (
          <Link 
            key={offer.id}
            to={`/offer-details/${offer.offerCategory}`}
          >
            <img 
              src={offer.imageName} 
              alt={`Offer ${offer.id}`} 
            />
          </Link>
        ))}
      </div>
      
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      
      <br />
      <br />
      <hr />
      <Footer/>
    </>
  );
}

export default Offers;

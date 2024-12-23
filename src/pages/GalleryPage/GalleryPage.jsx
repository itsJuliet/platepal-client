import React, { useState, useEffect } from 'react';
import { fetchPlatings } from '../../api';
import { Link, useLocation } from 'react-router-dom';
import ImageCard from '../../components/ImageCard/ImageCard';
import './GalleryPage.scss'

function GalleryPage() {
  useEffect(() => {
    document.title = "Gallery - PlatePal";
  }, []);

  const [platings, setPlatings] = useState([]);
  const location = useLocation(); 

  useEffect(() => {
    const getPlatings = async () => {
      const data = await fetchPlatings();
      const savedPlatings = data.filter(plating => plating.local_image_path);
      setPlatings(savedPlatings);
    };

    getPlatings();

  }, [location.state?.refresh]);

  return (
    <div>
      <h1 className='gallery__header'>A Gallery of Culinary Creations – Yours to Explore</h1>
      <div className="gallery__image-container">
        {platings.length === 0 ? (
          <p>No images saved to the gallery yet.</p>
        ) : (
          platings.map(plating => (
            <Link to={`/gallery/${plating.id}`} key={plating.id}>
              <ImageCard plating={plating} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default GalleryPage;
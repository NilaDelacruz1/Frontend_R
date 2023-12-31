import React, { useEffect, useState } from 'react'
import { Route, Routes, useParams } from 'react-router-dom';
import './styles/ProfileUser.css'
import { FavoritesUser } from './routes_profile/FavoritesUser';
import { Overview } from './routes_profile/Overview';
import { SocialUser } from './routes_profile/SocialUser';

export const ProfileUser = ({userId,idImage}) => {
    const { name } = useParams();
    const [selectedNavItem, setSelectedNavItem] = useState('overview');
    const bannerSrc = localStorage.getItem('userBanner');
    
    useEffect(() => {
      // Recuperar el estado del elemento de navegación desde localStorage
      const storedNavItem = localStorage.getItem('selectedNavItem');
      if (storedNavItem) {
        setSelectedNavItem(storedNavItem);
      }
    }, []); // Se ejecuta solo una vez al montar el componente
    useEffect(() => {
        // Limpiar el valor almacenado en localStorage cuando el componente se desmonta
        return () => {
          localStorage.removeItem('selectedNavItem');
        };
      }, []);
    const handleNavItemClick = (navItem) => {
      setSelectedNavItem(navItem);
      // Almacenar el estado del elemento de navegación en localStorage
      localStorage.setItem('selectedNavItem', navItem);
    };
  return (
    <div className='Page_Content'>
        <div className='header_wrap'>
            <div className='banner'
            style={{ backgroundImage: bannerSrc!=='null' ? `url(http://localhost:8080/usuarios/`+userId+`/banner_picture)` : 'none' }}
            >
                <div className='shadow'></div>
                <div className='container'>
                    <div className='banner_container'>
                        <img src={idImage !== 'null' ? 'http://localhost:8080/usuarios/'+userId+'/profile_picture': require('../../images/profile/profile.png')} className='avatar' alt="profile" />
                        <div className='name_perfil'>{name}</div>
                        <div className='actions'></div>
                    </div>
                </div>
            </div>

            <div className='nav_wrap'>
                <div className='nav_container'>
                  <a
                    href={`/user/${name}/`}
                    className={`link ${selectedNavItem === 'overview' ? 'active' : ''}`}
                    onClick={() => handleNavItemClick('overview')}
                  >
                  Overview
                  </a>
                  <a
                    href={`/user/${name}/favorites`}
                    className={`link ${selectedNavItem === 'favorites' ? 'active' : ''}`}
                    onClick={() => handleNavItemClick('favorites')}
                  >
                    Favorites
                  </a>
                  <a
                    href={`/user/${name}/social`}
                    className={`link ${selectedNavItem === 'social' ? 'active' : ''}`}
                    onClick={() => handleNavItemClick('social')}
                  >
                    Social
                  </a>
                </div>
            </div>
        </div>
        <div className='container_page'>
            <Routes>
                <Route path="/" element={<Overview userId={userId} name={name} />} />
                <Route path="/favorites" element={<FavoritesUser userId={userId} name={name} />} />
                <Route path="/social" element={<SocialUser userId={userId} name={name} />} />
            </Routes>
        </div>
    </div>
  )
}

import '../assets/css/detailannonce.css';
import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart, FaPhoneSquare } from 'react-icons/fa';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FiMessageCircle } from 'react-icons/fi';

export default function DetailAnnonce() {
    let navigate = useNavigate();
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const userId = JSON.parse(user);
    const [detailannonce, setDetailAnnonce] = useState({
        annonce: {
            idAnnonce: 0,
            description: '',
            proprietaire: {
                id: 0,
                nom: '',
                email: '',
                password: '',
                photoProfil: null,
            },
            modele: {
                idModele: 0,
                marque: {
                    nom: '',
                },
                nom: '',
            },
            carburant: {
                idCarburant: 0,
                nom: '',
            },
            boite: '',
            kilometrage: 0,
            date: [],
            prix: 0,
        },
        liked: false,
        photos: []
    });
    const { id } = useParams();

    useEffect(() => {
        loadDetailAnnonce();
    }, [id]);

    useEffect(() => {
        const carGallery = document.querySelector('.dcar-gallery');
        const mainImage = document.querySelector('.dmain-image');
        if (carGallery && mainImage) {
            carGallery.addEventListener('click', (event) => {
                if (event.target.classList.contains('dcar-image')) {
                    mainImage.src = event.target.src;
                    mainImage.alt = event.target.alt;
                }
            });
        }
        // console.log(detailannonce);
        // loadCategorie();
    }, [detailannonce]);

    const loadDetailAnnonce = async () => {
        try {
            const idToUse = userId.id;
            const response = await axios.get(`http://localhost:8080/auth/annonces/details/${id}?idUser=` + idToUse, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setDetailAnnonce(response.data);
            setLiked(response.data.liked)

        } catch (error) {
            console.error('Error fetching details:', error);
        }
    };

    const months = [
        "Jan", "Feb", "Mar", "Apr", "Mai", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // const [categorie, setCategorie] = useState([]);
    // const loadCategorie = async () => {
    //     const result = await axios.get("http://localhost:8080/auth/modele/categories/" + detailannonce.annonce.modele.idModele, {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     });
    //     setCategorie(result.data);
    // }
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => setCurrentSlide(next),
        customPaging: (i) => (
            <div
                style={{
                    marginTop: '10px',
                    width: '12px',
                    height: '12px',
                    backgroundColor: i === currentSlide ? '#000' : '#ccc',
                    borderRadius: '50%',
                }}
            />
        ),
    };

    const [liked, setLiked] = useState(detailannonce.liked);

    const handleLike = () => {
        if (liked) {
            unlike();
        }
        else {
            like();
        }
        setLiked(!liked);
    };

    const unlike = async () => {
        console.log("unliked");
        try {
            const params = new URLSearchParams();
            params.append("idAnnonce", detailannonce.annonce.idAnnonce);
            params.append("idUser", userId.id);
            await axios.delete("http://localhost:8080/annoncefavoris/unlike", {
                params,
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch (error) {
            navigate("/login");
        }
    };

    const like = async () => {
        console.log("liked");
        try {
            const params = new URLSearchParams();
            params.append("idAnnonce", detailannonce.annonce.idAnnonce);
            params.append("idUser", userId.id);
            await axios.post("http://localhost:8080/annoncefavoris", params, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch (error) {
            navigate("/login");
        }
    };

    return (
        <>
            <body>
                <div class="dcar-details-page">
                    <div class="downer-info">
                        <img class="downer-avatar" src={detailannonce.annonce.proprietaire.photoProfil} alt="Avatar" />
                        <div>
                            <div class="downer-name">{detailannonce.annonce.proprietaire.nom}</div>
                            <div class="downer-timestamp">{detailannonce.annonce.date[2]} {months[detailannonce.annonce.date[1] - 1]} {detailannonce.annonce.date[0]} {detailannonce.annonce.date[3]}:{detailannonce.annonce.date[4]}</div>
                        </div>
                    </div>
                    <Slider {...settings}>
                        {detailannonce.photos.map((photo, index) => (
                            <div key={index} className='dcar-image'>
                                <img src={photo.lienPhoto} alt={`Slide ${index}`} />
                            </div>
                        ))}
                    </Slider>

                    <div className="dannonceButtons">
                        <div onClick={handleLike} style={{ cursor: 'pointer', color: liked ? 'red' : 'inherit' }}>
                            {liked ? <FaHeart size={26} /> : <FaRegHeart size={22} />}
                        </div>
                        <div className="button-contact"><FiMessageCircle  size={24} />Contacter</div>

                    </div>



                    <div class="dcar-details">
                        {detailannonce.annonce.status == 0 ? (
                            <></>
                        ) : (
                            <p className="dstatusvendu">  Vendu </p>
                        )}
                        <div className='marque'>{detailannonce.annonce.modele.marque.nom} {detailannonce.annonce.modele.nom}</div>

                        <div class="description">
                            <p>{detailannonce.annonce.description}</p>
                        </div>
                        <p class="prix">{detailannonce.annonce.prix.toLocaleString('en-US')} MGA</p>

                        {detailannonce.annonce.status == 0 && detailannonce.annonce.proprietaire.id !== userId?.id ? (
                            <a class="dbuy-button">Acheter</a>
                        ) : (
                            <p></p>
                        )}
                        {/* <div class="dcategory-list">
                            {
                                categorie.map((cat) => (
                                    <div class="dcategory-item">{cat.categorie.nom}</div>
                                ))
                            }
                        </div> */}
                    </div>

                    <div class="dadditional-details">
                        <div class="ddetails-section">
                            <div className='details-name'>Source d'energie</div>
                            <div className='details-value'>{detailannonce.annonce.carburant.nom}</div>
                        </div>
                        <div class="ddetails-section">
                            <div className='details-name'>Boite de vitesse</div>
                            <div className='details-value'>{detailannonce.annonce.boite}</div>
                        </div>
                        <div class="ddetails-section">
                            <div className='details-name'>Kilometrage</div>
                            <div className='details-value'>{detailannonce.annonce.kilometrage} km </div>
                        </div>
                        <div class="ddetails-section">
                            <div className='details-name'>Histoire d'entretien</div>
                            <ul>
                                <li className='details-value'>Entretien régulier effectué chez le concessionnaire</li>
                                <li className='details-value'>Aucun accident signalé</li>
                            </ul>

                        </div>
                        <div class="ddetails-section">
                            <div className='details-name'>Contact</div>
                            <div className='details-value'>{detailannonce.annonce.contact}</div>
                        </div>
                    </div>

                </div>

            </body>
        </>
    )
}

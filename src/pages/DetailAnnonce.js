import '../assets/css/detailannonce.css';
import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart, FaPhoneSquare } from 'react-icons/fa';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
        console.log(detailannonce);
        // loadCategorie();
    }, [detailannonce]);

    const loadDetailAnnonce = async () => {
        try {
            const idToUse = userId ? userId.id : 0;
            const response = await axios.get(`http://localhost:8080/auth/annonces/details/${id}?idUser=` + idToUse, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setDetailAnnonce(response.data);
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
    const onClickLiked = async (e, idAnnonce) => {
        e.preventDefault();
        console.log("liked");
        try {
            const params = new URLSearchParams();
            params.append("idAnnonce", idAnnonce);
            params.append("idUser", userId.id);
            await axios.delete("http://localhost:8080/annoncefavoris/unlike", {
                params,
                headers: { 'Authorization': `Bearer ${token}` }
            });
            window.location.reload();
        } catch (error) {
            navigate("/login");
        }
    };
    const onClickDislike = async (e, idAnnonce) => {
        e.preventDefault();
        console.log("disliked");
        try {
            const params = new URLSearchParams();
            params.append("idAnnonce", idAnnonce);
            params.append("idUser", userId.id);
            await axios.post("http://localhost:8080/annoncefavoris", params, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            window.location.reload();
        } catch (error) {
            navigate("/login");
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <>
            <body>
                <div class="dcar-details-page">

                    {/* <div class="dmain-image-container">
                        <img class="dmain-image" src="https://i.pinimg.com/564x/39/79/2b/39792bd2ceca6eef9004c1a989d651e1.jpg" alt="Voiture principale" />
                    </div> */}

                    {/* <div class="dcar-gallery">

                        {detailannonce.photos.map((photo) => (
                            <img class="dcar-image" src={photo.lienPhoto} alt="Voiture 2" />

                        ))}
                    </div> */}

                    <Slider {...settings}>
                        {detailannonce.photos.map((photo, index) => (
                            <div key={index} className='dcar-image'>
                                <img src={photo.lienPhoto} alt={`Slide ${index}`} />
                            </div>
                        ))}
                    </Slider>

                    <div class="dcar-details">
                        {detailannonce.annonce.status == 0 ? (
                            <p className="dstatusenvente">  En vente </p>
                        ) : (
                            <p className="dstatusvendu">  Vendu </p>
                        )}
                        <h1>{detailannonce.annonce.modele.marque.nom} {detailannonce.annonce.modele.nom}</h1>
                        <div class="downer-info">
                            <img class="downer-avatar" src={detailannonce.annonce.proprietaire.photoProfil} alt="Avatar" />
                            <div>
                                <p class="downer-name">{detailannonce.annonce.proprietaire.nom}</p>
                                <p class="downer-timestamp">{detailannonce.annonce.date[2]} {months[detailannonce.annonce.date[1] - 1]} {detailannonce.annonce.date[0]} {detailannonce.annonce.date[3]}:{detailannonce.annonce.date[4]}</p>
                            </div>
                        </div>
                        <div class="dcar-description">
                            <p>{detailannonce.annonce.description}</p>
                        </div>
                        <p class="dcar-price">Prix: {detailannonce.annonce.prix.toLocaleString('en-US')} MGA</p>

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
                            <h2>Source d'energie</h2>
                            <p>{detailannonce.annonce.carburant.nom}</p>
                        </div>
                        <div class="ddetails-section">
                            <h2>Boite de vitesse</h2>
                            <p>{detailannonce.annonce.boite}</p>
                        </div>
                        <div class="ddetails-section">
                            <h2>Kilometrage</h2>
                            <p>{detailannonce.annonce.kilometrage} km </p>
                        </div>
                        <div class="ddetails-section">
                            <h2>Histoire d'entretien</h2>
                            <p>Entretien régulier effectué chez le concessionnaire</p>
                            <p>Aucun accident signalé</p>
                        </div>
                        <div class="ddetails-section">
                            <h2>Contact</h2>
                            <p>{detailannonce.annonce.contact}</p>
                        </div>
                    </div>
                    <div className="dbutton-container">
                        <button className="dcontacter-button"><FaPhoneSquare /> Contacter</button>
                        {detailannonce.liked.toString() === 'true' ? (
                            <button className="dfavoris-button"
                                onClick={(e) => onClickLiked(e, detailannonce.annonce.idAnnonce)}
                            ><FaHeart /> Supprimer favoris</button>
                        ) : (
                            <button className="dfavoris-button"
                                onClick={(e) => onClickDislike(e, detailannonce.annonce.idAnnonce)}
                            ><FaHeart /> Ajouter favoris</button>
                        )}
                    </div>
                </div>

            </body>
        </>
    )
}

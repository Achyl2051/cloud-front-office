import '../assets/css/annonce.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaPhoneSquare } from 'react-icons/fa';
import axios from 'axios';

export default function Home() {
    let navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [annoncesEnVente, setAnnoncesEnVente] = useState([]);

    useEffect(() => {
        loadAnnonceEnVente();
    }, []);

    const loadAnnonceEnVente = async () => {
        const result = await axios.get("https://cloudwebservice-production-7ad7.up.railway.app/auth/annonces/envente", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setAnnoncesEnVente(result.data);
    };

    const redirectToDetailPage = (idAnnonce) => {
        navigate(`/detailannonce/${idAnnonce}`);
    };

    const months = [
        "Jan", "Feb", "Mar", "Apr", "Mai", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    return (
        <>
            <body>
                <div className="grid-container">
                    {annoncesEnVente.map((annonce, index) => (
                        <div className="car-card" key={index}>
                            <div className="car-owner">
                                <img className="owner-avatar" src={annonce.annonce.proprietaire.photoProfil} alt="PDP" />
                                <div className="owner-info">
                                    <p className="owner-name">{annonce.annonce.proprietaire.nom}</p>
                                    <p className="owner-timestamp"> {annonce.annonce.date[2]} {months[annonce.annonce.date[1]-1]} {annonce.annonce.date[0]} {annonce.annonce.date[3]}:{annonce.annonce.date[4]}</p>
                                </div>
                            </div>
                            <img className="car-image" src="https://i.pinimg.com/564x/39/79/2b/39792bd2ceca6eef9004c1a989d651e1.jpg" alt="imageCAR" />
                            <div className="car-details">
                                <h2>{annonce.annonce.modele.marque.nom} {annonce.annonce.modele.nom}</h2>
                                <p>{annonce.annonce.description}</p>
                                <br />
                                <b>Prix: {annonce.annonce.prix.toLocaleString('en-US')} MGA</b>
                            </div>
                            <div className="car-actions">
                                <div>
                                    {annonce.annonce.liked ? (
                                        <span style={{ fontSize: '1.5em' }}> <FaRegHeart className="nav-icons" /> </span>
                                    ) : (
                                        <span style={{ fontSize: '1.5em' }}> <FaHeart className="nav-icons" style={{ color: 'red' }} /> </span>
                                    )}
                                    <span style={{ fontSize: '1.5em' }}> <FaPhoneSquare className="nav-icons" /> </span>
                                </div>
                                <button className="details-button" onClick={() => redirectToDetailPage(annonce.annonce.idAnnonce)}>Détails</button>
                            </div>
                        </div>
                    ))}
                </div>
            </body>
        </>
    );
}

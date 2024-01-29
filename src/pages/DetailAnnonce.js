import '../assets/css/detailannonce.css';
import React, { useEffect, useState } from 'react';
import {FaHeart,FaRegHeart,FaPhoneSquare } from 'react-icons/fa';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function DetailAnnonce(idAnnonce) {
    const token = localStorage.getItem("token");
    const [detailannonce, setDetailAnnonce] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        loadDetailAnnonce();
    }, [id]);

    const loadDetailAnnonce = async () => {
        try {
            const result = await axios.get(`https://cloudwebservice-production-7ad7.up.railway.app/auth/annonces/details/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDetailAnnonce(result.data);
            console.log(result.data);
            console.log(detailannonce);
        } catch (error) {
            console.error("Erreur lors du chargement des détails de l'annonce :", error);
        }
    };

    const months = [
        "Jan", "Feb", "Mar", "Apr", "Mai", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // useEffect(() => {
    //     const carGallery = document.querySelector('.dcar-gallery');
    //     const mainImage = document.querySelector('.dmain-image');
    //     carGallery.addEventListener('click', (event) => {
    //         if (event.target.classLidst.contains('dcar-image')) {
    //             mainImage.src = event.target.src;
    //             mainImage.alt = event.target.alt;
    //         }
    //     });
    // }, []);

  return (
    <>
    <body>

    {/* <div class="dcar-details-page">
        <div class="dmain-image-container">
            <img class="dmain-image" src="https://i.pinimg.com/564x/39/79/2b/39792bd2ceca6eef9004c1a989d651e1.jpg" alt="Voiture principale" />
        </div>

        <div class="dcar-gallery">
            <img class="dcar-image" src="https://i.pinimg.com/564x/39/79/2b/39792bd2ceca6eef9004c1a989d651e1.jpg" alt="Voiture 1" />
            <img class="dcar-image" src="https://i.pinimg.com/564x/39/79/2b/39792bd2ceca6eef9004c1a989d651e1.jpg" alt="Voiture 2" />
            <img class="dcar-image" src="https://i.pinimg.com/564x/39/79/2b/39792bd2ceca6eef9004c1a989d651e1.jpg" alt="Voiture 3" />
        </div>
        
        <div class="dcar-details">
            <h1>{detailannonce.annonce.modele.marque.nom} {detailannonce.annonce.modele.nom}</h1>
            <div class="downer-info">
                <img class="downer-avatar" src="https://i.pinimg.com/564x/39/79/2b/39792bd2ceca6eef9004c1a989d651e1.jpg" alt="Avatar" />
                <div>
                    <p class="downer-name">{detailannonce.annonce.proprietaire.nom}</p>
                    <p class="downer-timestamp">{detailannonce.annonce.date[2]} {months[detailannonce.annonce.date[1]-1]} {detailannonce.annonce.date[0]} {detailannonce.annonce.date[3]}:{detailannonce.annonce.date[4]}</p>
                </div>
            </div>
            <div class="dcar-description">
                <p>{detailannonce.annonce.description}</p>
            </div>
            <p class="dcar-price">Prix: {detailannonce.annonce.prix.toLocaleString('en-US')} MGA</p>
            <a href="#" class="dbuy-button">Acheter</a>

            <div class="dcategory-list">
                <div class="dcategory-item">Sportive</div>
                <div class="dcategory-item">Berline</div>
                <div class="dcategory-item">4x4</div>
            </div>
        </div>

        <div class="dadditional-details">
            <div class="ddetails-section">
                <h2>Source d'energie</h2>
                <p>{detailannonce.annonce.carburant}</p>
            </div>

            <div class="ddetails-section">
                <h2>Options</h2>
                <p>Système de divertissement haut de gamme</p>
                <p>Sièges sport en cuir</p>
                <p>Jantes en alliage léger</p>
            </div>

            <div class="ddetails-section">
                <h2>Histoire d'entretien</h2>
                <p>Entretien régulier effectué chez le concessionnaire</p>
                <p>Aucun accident signalé</p>
            </div>
        </div>

    </div> */}

    </body>
    </>
  )
}

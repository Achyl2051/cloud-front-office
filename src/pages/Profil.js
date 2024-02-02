import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaPhoneSquare } from 'react-icons/fa';
import axios from 'axios';

export default function Profil() {
    let navigate = useNavigate();
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const userId = JSON.parse(user);
    const [annoncesEnVente, setAnnoncesEnVente] = useState([]);

    useEffect(() => {
        loadAnnonceEnVente();
    }, []);

    const loadAnnonceEnVente = async () => {
        try{
            const result = await axios.get("http://localhost:8080/annonces/users/"+userId.id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAnnoncesEnVente(result.data);
        }catch(error){
            console.log(error);
            navigate('/login');    
        }
    };

    const redirectToDetailPage = (idAnnonce) => {
        navigate(`/detailannonce/${idAnnonce}`);
    };

    const months = [
        "Jan", "Feb", "Mar", "Apr", "Mai", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const onClick = async (e,idAnnonce) => {
        e.preventDefault();
        try{
            if (e.target.name === "liked"){
                const params = new URLSearchParams();
                params.append("idAnnonce", idAnnonce);
                params.append("idUser", userId.id);
                await axios.delete("http://localhost:8080/annoncefavoris/unlike", params, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            }
            else if (e.target.name === "disliked"){
                const params = new URLSearchParams();
                params.append("idAnnonce", idAnnonce);
                params.append("idUser", userId.id);
                await axios.post("http://localhost:8080/annoncefavoris", params, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            }
        }catch(error){
            navigate("/login");
        }
    };
    
    return (
        <>
        <h1 style={{textAlign:'center',marginTop:'5px'}}> Historique de mes annonces: </h1>
            <body>
                <div className="grid-container">
                    {annoncesEnVente.map((annonce, index) => (
                        <div className="car-card" key={index}>
                        {annonce.annonce.status==0?(
                        <div className="for-sale-badge-envente">
                            <span className="badge-text-envente">En vente</span>
                        </div>
                        ):(
                        <div className="for-sale-badge-vendu">
                            <span className="badge-text-vendu">Vendu</span>
                        </div>
                        )}
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
                                    {annonce.liked.toString() === 'true' ? (
                                        <span style={{ fontSize: '1.5em' }}> <FaHeart className="nav-icons" style={{ color: 'red' }}  name="liked" onClick={(e) => onClick(e,annonce.annonce.idAnnonce)} /> </span>
                                        ) : (
                                        <span style={{ fontSize: '1.5em' }}> <FaRegHeart className="nav-icons"  name="disliked" onClick={(e) => onClick(e,annonce.annonce.idAnnonce)}  /> </span>
                                    )}
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

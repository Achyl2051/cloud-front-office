import '../assets/css/annonce.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaPhoneSquare } from 'react-icons/fa';
import { MdInsertPhoto } from "react-icons/md";
import axios from 'axios';
import { FiMessageCircle } from 'react-icons/fi';

export default function Home() {
    let navigate = useNavigate();
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const userId = JSON.parse(user);
    const [annoncesEnVente, setAnnoncesEnVente] = useState([]);
    const [allAnnonces, setAllAnnonces] = useState([]);
    const [searchDescription, setSearchDescription] = useState("");
    const [searchMarque, setSearchMarque] = useState("");
    const [searchModel, setSearchModel] = useState("");
    const [searchMinPrice, setSearchMinPrice] = useState("");
    const [searchMaxPrice, setSearchMaxPrice] = useState("");
    const [searchMinDate, setSearchMinDate] = useState("");
    const [searchMaxDate, setSearchMaxDate] = useState("");

    useEffect(() => {
        loadAnnonceEnVente();
        const intervalId = setInterval(() => {
            loadAnnonceEnVente();
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);

    const loadAnnonceEnVente = async () => {
        const idToUse = userId ? userId.id : 0;
        const result = await axios.get(`http://localhost:8080/auth/annonces/envente?idUser=${idToUse}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setAllAnnonces(result.data);
        setAnnoncesEnVente(result.data);
        console.log(result.data);
    };


    const redirectToDetailPage = (idAnnonce) => {
        navigate(`/detailannonce/${idAnnonce}`);
    };

    const months = [
        "Jan", "Feb", "Mar", "Apr", "Mai", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const filterAnnonces = () => {
        let filtered = allAnnonces.filter(annonce => {
            return (
                annonce.annonce.description.toLowerCase().includes(searchDescription.toLowerCase()) &&
                (searchMinPrice === "" || annonce.annonce.prix >= parseFloat(searchMinPrice)) &&
                (searchMaxPrice === "" || annonce.annonce.prix <= parseFloat(searchMaxPrice)) &&
                (searchMinDate === "" || new Date(annonce.annonce.date) >= new Date(searchMinDate)) &&
                (searchMaxDate === "" || new Date(annonce.annonce.date) <= new Date(searchMaxDate)) &&
                (searchModel === "" || annonce.annonce.modele.nom.toLowerCase().includes(searchModel.toLowerCase())) &&
                (searchMarque === "" || annonce.annonce.modele.marque.nom.toLowerCase().includes(searchMarque.toLowerCase()))
            );
        });

        setAnnoncesEnVente(filtered);
    };

    useEffect(() => {
        filterAnnonces();
    }, [searchDescription, searchMinPrice, searchMaxPrice, searchMinDate, searchMaxDate, searchModel, searchMarque]);


    // --
    const Annonce = ({ annonce }) => {
        const [liked, setLiked] = useState(annonce.liked);
        const [nombrePhotos, setNombrePhotos] = useState(annonce.photos.length);

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
            // e.preventDefault();
            console.log("liked");
            try {
                const params = new URLSearchParams();
                params.append("idAnnonce", annonce.annonce.idAnnonce);
                params.append("idUser", userId.id);
                await axios.delete("http://localhost:8080/annoncefavoris/unlike", {
                    params,
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                // window.location.reload();
            } catch (error) {
                navigate("/login");
            }
        };

        const like = async () => {
            // e.preventDefault();
            console.log("disliked");
            try {
                const params = new URLSearchParams();
                params.append("idAnnonce", annonce.annonce.idAnnonce);
                params.append("idUser", userId.id);
                await axios.post("http://localhost:8080/annoncefavoris", params, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                // window.location.reload();
            } catch (error) {
                navigate("/login");
            }
        };

        return (
            <div className="car-card">
                {/* {annonce.annonce.status==0?(
            <div className="for-sale-badge-envente">
                <span className="badge-text-envente">En vente</span>
            </div>
            ):(
            <div className="for-sale-badge-vendu">
                <span className="badge-text-vendu">Vendu</span>
            </div>
            )} */}
                <div className="car-owner">
                    <img className="owner-avatar" src={annonce.annonce.proprietaire.photoProfil} alt="PDP" />
                    <div className="owner-info">
                        <p className="owner-name">{annonce.annonce.proprietaire.nom}</p>
                    </div>
                </div>
                <div className='imageContainer'>
                    <img className="car-image" src={annonce.photos[0].lienPhoto} onClick={() => redirectToDetailPage(annonce.annonce.idAnnonce)} alt="imageCAR" />

                    <div className='nombrePhotos'>
                        <span style={global.nombrePhotosNombre}>+{nombrePhotos}</span>
                        <MdInsertPhoto size={18} color="white" />
                    </div>
                </div>


                <div className="car-actions">
                    <div className='annonceButtons'>
                        <div onClick={handleLike} style={{ cursor: 'pointer', color: liked ? 'red' : 'inherit' }}>
                            {liked ? <FaHeart size={22} /> : <FaRegHeart size={22} />}
                        </div>

                        {userId && userId.id ? (
                            (annonce.annonce.proprietaire.id === userId.id ? (
                                <></>
                            ) : (
                                <div> <FiMessageCircle size={24} /> </div>
                            ))
                        ) : (
                            <></>
                        )}
                        <div className="annonceDate"> {annonce.annonce.date[2]} {months[annonce.annonce.date[1] - 1]} {annonce.annonce.date[0]} {annonce.annonce.date[3]}:{annonce.annonce.date[4]}</div>

                    </div>
                    {/* <button className="details-button" onClick={() => redirectToDetailPage(annonce.annonce.idAnnonce)}>Détails</button> */}
                </div>
                <div className="car-details">
                    <div className='marque'>{annonce.annonce.modele.marque.nom} {annonce.annonce.modele.nom}</div>
                    <div className='description'>{annonce.annonce.description}</div>
                    <div className='prix'>{annonce.annonce.prix.toLocaleString('en-US')} MGA</div>
                </div>
            </div>
        );
    };



    // --

    return (
        <div className='home'>
            <div className='threeSpaces'>
                <div className='left'>
                    <div className='recommandations'>
                        filtre
                    </div>
                </div>

                {/* <div className="search-bar">
                    <form onSubmit={e => e.preventDefault()}>
                        <label htmlFor="searchDescription">Description :</label>
                        <input
                            type="text"
                            id="searchDescription"
                            value={searchDescription}
                            onChange={e => setSearchDescription(e.target.value)}
                        />

                        <label htmlFor="searchMarque">Marque :</label>
                        <select
                            id="searchMarque"
                            value={searchMarque}
                            onChange={e => setSearchMarque(e.target.value)}
                        >
                            <option value="">Toutes les marques</option>
                        </select>

                        <label htmlFor="searchModel">Modèle :</label>
                        <select
                            id="searchModel"
                            value={searchModel}
                            onChange={e => setSearchModel(e.target.value)}
                        >
                            <option value="">Tous les modèles</option>
                        </select>

                        <label htmlFor="searchMinPrice">Prix min :</label>
                        <input
                            type="number"
                            id="searchMinPrice"
                            value={searchMinPrice}
                            onChange={e => setSearchMinPrice(e.target.value)}
                        />

                        <label htmlFor="searchMaxPrice">Prix max :</label>
                        <input
                            type="number"
                            id="searchMaxPrice"
                            value={searchMaxPrice}
                            onChange={e => setSearchMaxPrice(e.target.value)}
                        />

                        <label htmlFor="searchMinDate">Date min :</label>
                        <input
                            type="date"
                            id="searchMinDate"
                            value={searchMinDate}
                            onChange={e => setSearchMinDate(e.target.value)}
                        />

                        <label htmlFor="searchMaxDate">Date max :</label>
                        <input
                            type="date"
                            id="searchMaxDate"
                            value={searchMaxDate}
                            onChange={e => setSearchMaxDate(e.target.value)}
                        />

                        <button onClick={() => filterAnnonces()}>Rechercher</button>
                    </form>
                </div> */}
                <div className="middle annonces">
                    {annoncesEnVente.map((annonce, index) => (
                        <Annonce annonce={annonce} />
                    ))}
                </div>
                <div className='right'>
                    <div className='messages'>
messages
                    </div>
                </div>

            </div>
        </div>
    );
}

import { Button } from '@mui/material';
import React from 'react';
import axios from 'axios'

const AddButton = ({ artistName, songId, ranking, usuario }) => {
  const handleClick = async () => {
    const url = 'http://localhost:5000/api/musica/favoritos/'
    let selectedSongs = localStorage.getItem('favorites');
    if(!selectedSongs) selectedSongs = [];
    else selectedSongs = JSON.parse(selectedSongs);
    selectedSongs.push({artistName:artistName,songId:songId,ranking:ranking,usuario:usuario});
    const res = await axios.post(url, {
      artista: artistName,
      cancionId: songId, 
      usuario,
      ranking 
    })
    console.log(res)
    localStorage.setItem('favorites', JSON.stringify(selectedSongs));
  }

  return (
    <Button variant="contained" onClick={handleClick}>Agregar</Button>
  );
}

export default AddButton;
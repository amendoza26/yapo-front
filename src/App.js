import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Paper } from '@mui/material';
import AddButton from './components/AddButton';


function App() {

  const [artista, setArtista] = useState('')
  const [data, setData] = useState([])

  // useEffect(() => {
    
  // }, [data])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:5000/api/musica/'
      const response = await axios.post(url, {
        artista: artista
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      await setData(response.data.data.canciones)
    } catch (error) {
      console.error('error', error)
    }
    
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>Artista</label>
        <input type="text" placeholder="radiohead" value={artista} name="artista" onChange={e => setArtista(e.target.value)} />
        <Button type='submit' variant="contained">Buscar</Button>
      </form>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre Cancion</TableCell>
            <TableCell align="right">Nombre Album</TableCell>
            <TableCell align="right">Url preview</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Fecha de lanzamiento</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.trackId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.trackName}
              </TableCell>
              <TableCell align="right">{row.collectionName}</TableCell>
              <TableCell align="right">{row.previewUrl}</TableCell>
              <TableCell align="right">USD ${row.trackPrice}</TableCell>
              <TableCell align="right">{row.releaseDate}</TableCell>
              <TableCell align="right"><AddButton artistName={row.artistName} songId={row.trackId} ranking="5/5" usuario="userName">Favoritos</AddButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default App;


import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'phosphor-react';

import axios from 'axios';

// http://demo.subsonic.org/rest/getAlbumList2?type=newest&u=guest&p=guest&v=1.12.0&c=myapp&f=json
function App() {

  const [albumList, setAlbumsList] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [albumsSongs, setAlbumSongs] = useState();

  const handleGetAlbumsDetails = useCallback(async (id) => {
    const result = await axios.get(`http://demo.subsonic.org/rest/getAlbum?type=newest&u=guest&p=guest&v=1.12.0&c=myapp&f=json&id=${id}`)
    let songs = result.data["subsonic-response"].album?.song
    setAlbumSongs(songs)
  }, [])

  const fetchData = async () => {
    const result = await axios.get("http://demo.subsonic.org/rest/getAlbumList2?type=newest&u=guest&p=guest&v=1.12.0&c=myapp&f=json")

    let albumsList = result.data["subsonic-response"].albumList2.album;
    setAlbumsList(albumsList)
  }

  
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSelectedItem(0)
  }, [])

  useEffect(() => {
    if(albumList?.length){
      handleGetAlbumsDetails(albumList[0].id)
    }
  }, [albumList, handleGetAlbumsDetails])

const handleSelectItem = (item) => {
  setSelectedItem(item)
  handleGetAlbumsDetails(item)
}

const handlePreviousItem = () => {
  if(selectedItem === 0){
    setSelectedItem(albumList.length - 1);
    handleGetAlbumsDetails(selectedItem);
    return;
  }
  setSelectedItem(selectedItem - 1) 
  handleGetAlbumsDetails(selectedItem);

}

const handleNextItem = () => {
  if(selectedItem === albumList.length - 1){
    setSelectedItem(0)
    handleGetAlbumsDetails(selectedItem);

    return;
  }
  setSelectedItem(selectedItem + 1)  
  handleGetAlbumsDetails(selectedItem);

}

  return (
    <div className="container">
      <div className='albunsList'>
        <button>
        <ArrowLeft size={32} onClick={handlePreviousItem}/>
        </button>

        <div className="albums">
          {albumList?.map((album, index) => {
            return (
              <div key={album.id} className={`albumItem ${selectedItem === index && "selected"}`} onClick={() => handleSelectItem(index)}>
              <span>{album.name}</span>
            </div>
            )
          })
        }
        </div>

        <button>
         <ArrowRight size={32} onClick={handleNextItem}/>
        </button>
      </div>

      <div className='songsDetails'>
       <h2>
        {albumList && albumList[selectedItem]?.name}
       </h2>

       <table border={2} width="100%">
        <thead>
          <tr>
            <th>#</th>
            <th>Track</th>
          </tr>
        </thead>

        <tbody>
          {albumsSongs?.map((song, index) => (
            <tr key={song.id}>
              <td>{index}</td>
              <td>{song.title}</td>
            </tr>
          ))}
        </tbody>
       </table>
      </div>
    </div>
  );
}

export default App;

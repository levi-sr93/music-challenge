
import './App.css';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'phosphor-react';

import axios from 'axios';

// http://demo.subsonic.org/rest/getAlbumList2?type=newest&u=guest&p=guest&v=1.12.0&c=myapp&f=json
function App() {

  const [albumList, setAlbumsList] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const fetchData = async () => {
    const result = await axios.get("http://demo.subsonic.org/rest/getAlbumList2?type=newest&u=guest&p=guest&v=1.12.0&c=myapp&f=json")

    let albumsList = result.data["subsonic-response"].albumList2.album;
    setAlbumsList(albumsList)
  }

  useEffect(() => {
    fetchData();
  }, [])

const handleSelectItem = (item) => {
  setSelectedItem(item)
}

const handlePreviousItem = () => {
  if(selectedItem === 0){
    setSelectedItem(albumList.length - 1)
    return;
  }
  setSelectedItem(selectedItem - 1) 
  
}

const handleNextItem = () => {
  if(selectedItem === albumList.length - 1){
    setSelectedItem(0)
    return;
  }
  setSelectedItem(selectedItem + 1)  

}

  return (
    <div className="container">
      <div className='albunsList'>
        <button>
        <ArrowLeft size={32} onClick={handlePreviousItem}/>
        </button>
        {console.log(albumList)}
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
    </div>
  );
}

export default App;

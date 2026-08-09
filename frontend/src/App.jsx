import React ,{useState} from 'react'
import FaceDetection from './components/FacialDetection'
import Moodsongs from './components/Moodsongs'

const App = () => {
  const [songs, setsongs] = useState([
    
    
  ]);
  return (
    <>
    <FaceDetection setsongs={setsongs}/>
    <Moodsongs songs={songs}/>
    </>
  )
}

export default App

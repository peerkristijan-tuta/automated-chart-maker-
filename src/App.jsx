import Introduction from './components/Introduction.jsx'
import FormManager from './components/FormManager.jsx'
import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [clicked, setClicked] = useState({ active: false, source: null });
  const handleClick = (value) => setClicked(value);
  const[formData, setFormData] = useState({ worm: {}, segment: {} });
  const updateWormData = (newData) => setFormData({ ...formData, worm: {...formData.worm, ...newData} });
  const updateSegmentData = (newData) => setFormData({...formData, segment: {...formData.segment, ...newData}});
  const [renderData, setRenderData] = useState({ active: false, source: null });
  useEffect(() => {
    if (clicked.active) {
      setRenderData({ active: true, source: clicked.source });
    }
  }, [clicked]);
  return (
    <main style={{display: "flex", height: "100vh"}}>
      <section ariaLabel="Input prompt and collection" style={{width: "35vw", height: "100vh", left: 0, top: 0, backgroundColor: "#087e8b", display: "grid", gridTemplateColumns: "1fr", gridTemplateRows: "1fr 4.5fr", height: "100%"}}>
        <header>
          <Introduction />
        </header>
        <form style={{padding: "10px"}}>
          <FormManager updateWormData={updateWormData} updateSegmentData={updateSegmentData} formData={formData} handleClick={handleClick} clicked={clicked}/>
        </form>
      </section>
      <section ariaLabel="Chart frame" style={{display: "flex", justifyContent: "center", alignItems: "center", width: "65vw", height: "100vh", right: 0, top: 0, backgroundColor: "#ff5a5f"}}>
          <section ariaLabel="Chart display box" style={{width: "90%", height: "90%", backgroundColor: "#3C3C3C", border: "8px solid #C1839F"}}>
            {/* {renderData.active && formData[renderData.source] && Object.entries(formData[renderData.source]).map(([key, value]) => (<p key={key}>{key}: {value}</p>))} */}
          </section>
      </section>
    </main>
  );
}

export default App;
import { useState } from 'react'
import SegmentForm from './SegmentForm.jsx'
import WormForm from './WormForm.jsx'

export default function FormManager({ updateWormData, updateSegmentData, formData, handleClick, clicked }) {
    const [preset, setPreset] = useState(0);
    const changePreset = (input) => {
        setPreset(input);
    };
    return (
        <>
            <div style={{textAlign: "center"}}>
            <label htmlFor="presetSelecton">Select chart type: </label>
            <select name="presetSelection" id="presetSelection" defaultValue="" onChange={(e) => changePreset(e.target.value)}>
                <option value="">-- Click to see options --</option>
                <option value="1">Preset A</option>
                <option value="2">Preset B</option>
            </select>
            </div>
            {preset == 1 && <SegmentForm updateSegmentData={updateSegmentData} segmentData={formData.segment} handleClick={handleClick} clicked={clicked}/>}
            {preset == 2 && <WormForm updateWormData={updateWormData} wormData={formData.worm} handleClick={handleClick} clicked={clicked}/>}
        </>
    );
}
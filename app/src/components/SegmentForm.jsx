import SegmentExample from './SegmentExample.jsx'
import { useState, useRef, useEffect } from 'react'

export default function SegmentForm({ updateSegmentData, segmentData, handleClick, clicked }) {
    const handleChange = (e) => {
        updateSegmentData({ [e.target.id]: e.target.value });
    };
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);
    const mouseDownTime = useRef(null);
    const [focusStatus, setFocusStatus] = useState({ active: false, field: null });
    const handleFocus = (e) => setFocusStatus({ active: true, field: e.target.id });
    const handleBlur = () => setFocusStatus({ active: false, field: null });

    useEffect(() => {
        const handleMouseUp = () => setPressed(false);
        window.addEventListener('mouseup', handleMouseUp);
        return () => window.removeEventListener('mouseup', handleMouseUp);
    }, []);

    return (
        <> 
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", paddingTop: "10px"}}>
                <label style={{textAlign: "center"}} htmlFor="Title">Title: </label>
                <label style={{textAlign: "center"}} htmlFor="Label">Label: </label>
                <input onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} id="title" type="text" style={{width: "75%", justifySelf: "center"}}/>
                <input onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} id="label" type="text" style={{width: "75%", justifySelf: "center"}}/>
            </div>

            <div style={{paddingTop: "10px"}}>
            {[1,2,3,4,5].map((n) => (
                <div key={n} style={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
                    <label style={{textAlign: "center"}}>Indicator {n}: <input onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} id={`indicator${n}`} type="text" style={{width: "40%"}}/></label>
                    <label style={{textAlign: "center"}}>Measurement {n}: <input onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} id={`measurement${n}`} type="text" style={{width: "20%"}}/></label>
                    <br/>
                </div>
            ))}
            </div>

            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", rowGap: "5px"}}>
                <div style={{display: "grid", gridTemplateRows: "1fr 1fr"}}>
                    <label style={{textAlign: "center"}} htmlFor="category">Category: </label>
                    <input onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} type="text" id="category" style={{height: "50%", width: "75%", justifySelf: "center"}}/>
                </div>
                <div style={{display: "grid", gridTemplateRows: "1fr 1fr"}}>
                    <label style={{textAlign: "center"}} htmlFor="number">Number: </label>
                    <input onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} type="text" id="number" style={{height: "50%", width: "75%", justifySelf: "center"}}/>
                </div>
                <div style={{display: "grid", gridTemplateRows: "1fr 1fr"}}>
                    <label style={{textAlign: "center"}} htmlFor="unit">Unit: </label>
                    <input onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} type="text" id="unit" style={{height: "50%", width: "75%", justifySelf: "center"}}/>
                </div>
                <div style={{position: "relative", display: "grid", gridTemplateRows: "1fr"}}>
                    <div style={{position: "absolute", border: clicked ? "1px solid #F5F5F5" : hovered ? "1px solid #087e8b" : "1px solid #F5F5F5", marginLeft: "24px", marginTop: "7px", width: "197px", height: "40px"}}></div>
                    <button onMouseDown={(e) => { if (e.button !== 0) return; setPressed(true); mouseDownTime.current = Date.now(); }} onClick={() => { if (Date.now() - mouseDownTime.current >= 1000) return; handleClick({ active: true, source: "segment" }); setTimeout(() => handleClick({ active: false, source: null }), 0); }} type="button" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{position: "absolute", top: pressed ? "14px" : "7px", fontSize: "16px", border: "1px solid #F5F5F5", display: "flex", justifyContent: "center", alignItems: "center", alignSelf: "end", justifySelf: "center", height: pressed ? "70%" : "100%", width: pressed ? "74%" : "80%", backgroundColor: "#F5F5F5"}}>
                        <p style={{fontSize: pressed ? "0.8em" : "0.9em", color: "#087e8b"}}>Generate</p>
                    </button>
                </div>
            </div>

            <SegmentExample focusStatus={focusStatus}/>
        </>
    );
}
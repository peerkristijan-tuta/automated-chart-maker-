import React from 'react'
import WormExample from './WormExample.jsx'
import { useState, useRef } from 'react'

export default function WormForm({ updateWormData, wormData, handleClick, clicked}) {
    const[hovered, setHovered] = useState(false);
    const[pressed, setPressed] = useState(false);
    const mouseDownTime = useRef(null);
    const handleChange = (e) => {
        updateWormData({ [e.target.id]: e.target.value });
    };
    const[focusStatus, setFocusStatus] = useState({ active: false, field: null });
    const handleFocus = (e) => setFocusStatus({ active: true, field: e.target.id });
    const handleBlur = () => setFocusStatus({ active: false, field: null });

    return (
        <>  
            <div style={{display: "grid", gridTemplateColumns: "1fr 5fr", gridTemplateRows: "1fr 1fr", paddingTop: "10px", alignItems: "center"}}>
                <label style={{textAlign: "right"}} htmlFor="title">Title: </label>
                <input onFocus={handleFocus} onBlur={handleBlur}  onChange={handleChange} type="text" id="title" style={{height: "50%", width: "75%", justifySelf: "center"}}/>
                <label style={{textAlign: "right"}} htmlFor="label">Label: </label>
                <input onFocus={handleFocus} onBlur={handleBlur}  onChange={handleChange} type="text" id="label" style={{height: "50%", width: "75%", justifySelf: "center"}}/>
            </div>

            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", paddingTop: "10px"}}>
                <div style={{display: "grid", gridTemplateRows: "1fr 1fr"}}>
                    <label style={{textAlign: "center"}} htmlFor="unit">Unit: </label>
                    <input onFocus={handleFocus} onBlur={handleBlur}  onChange={handleChange} type="text" id="unit" style={{height: "50%", width: "75%", justifySelf: "center"}}/>
                </div>
                <div style={{display: "grid", gridTemplateRows: "1fr 1fr"}}>
                    <label style={{textAlign: "center"}} htmlFor="earlierYear">Earlier year: </label>
                    <input onFocus={handleFocus} onBlur={handleBlur}  onChange={handleChange} type="text" id="earlierYear" style={{height: "50%", width: "75%", justifySelf: "center"}}/>
                </div>
                <div style={{display: "grid", gridTemplateRows: "1fr 1fr"}}>
                    <label style={{textAlign: "center"}} htmlFor="laterYear">Later year: </label>
                    <input onFocus={handleFocus} onBlur={handleBlur}  onChange={handleChange} type="text" id="laterYear" style={{height: "50%", width: "75%", justifySelf: "center"}}/>
                </div>
            </div>

            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", paddingTop: "1px"}}>
                {[1,2,3,4,5].map((n) => (
                    <React.Fragment key={n}>
                        <div key={`ind${n}`} style={{display: "grid", gridTemplateRows: "1fr 1fr"}}>
                            <label style={{textAlign: "center"}} htmlFor={`indicator${n}`}>Indicator {n}: </label>
                            <input onFocus={handleFocus} onBlur={handleBlur}  onChange={handleChange} type="text" id={`indicator${n}`} style={{height: "50%", width: "75%", justifySelf: "center"}}/>
                        </div>
                        <div key={`maA${n}`} style={{display: "grid", gridTemplateRows: "1fr 1fr"}}>
                            <label style={{textAlign: "center"}} htmlFor={`measurement${n}A`}>Measurement: </label>
                            <input onFocus={handleFocus} onBlur={handleBlur}  onChange={handleChange} type="text" id={`measurement${n}A`} style={{height: "50%", width: "75%", justifySelf: "center"}}/>
                        </div>
                        <div key={`mB${n}`} style={{display: "grid", gridTemplateRows: "1fr 1fr"}}>
                            <label style={{textAlign: "center"}} htmlFor={`measurement${n}B`}>Measurement: </label>
                            <input onFocus={handleFocus} onBlur={handleBlur}  onChange={handleChange} type="text" id={`measurement${n}B`} style={{height: "50%", width: "75%", justifySelf: "center"}}/>
                        </div>
                    </React.Fragment>
                ))}
            </div>

            <WormExample focusStatus={focusStatus}/>

            <button onMouseUp={() => {setPressed(false);}} onMouseDown={() => { setPressed(true); mouseDownTime.current = Date.now(); }} onClick={() => { if (Date.now() - mouseDownTime.current >= 1000) return; handleClick({ active: true, source: "worm" }); setTimeout(() => handleClick({ active: false, source: null }), 25);}} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} type="button" style={{margin: "20px auto", fontSize: "16px", border: pressed ? "1px solid #F5F5F5" : clicked.active ? "1px solid #F5F5F5" : "1px solid transparent", display: "flex", justifyContent: "center", color: "black", alignItems: "center", alignSelf: "end", justifySelf: "center", height: "6%", width: "91%", backgroundColor: pressed ? "#087e8b" : clicked.active ? "#087e8b" : hovered ? "#EBEBEB" : "#F5F5F5"}}>
                <p style={{color: pressed ? "#F5F5F5" : clicked.active ? "#F5F5F5" : "#087e8b"}}>Generate</p>
            </button>
        </>
    );
}
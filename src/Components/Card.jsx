import React, { useState, useEffect } from 'react'
import dividerMobile from '../assets/pattern-divider-mobile.svg'
import dividerDesktop from '../assets/pattern-divider-desktop.svg'
import dice from '../assets/icon-dice.svg'
import axios from 'axios'

function Card() {
    // useState variables
    const [isMobile, setIsMobile] = useState(false);
    const [isActive, setIsActive] = useState(false)
    const [quote, setQuote] = useState("")
    const [quoteNum, setQuoteNum] = useState("")

    // This method is used to fetch quotes from an api
    const fetchAdvice = () => {
        axios.get("https://api.adviceslip.com/advice")
            .then((res) => {
                setQuote(res.data.slip.advice)
                setQuoteNum(res.data.slip.id)
                console.log(res.data.slip)
                setIsActive(true)
            }).catch((e) => {
                console.log(e)
            })
    }

    // This state is used to switch between mobile and desktop queries
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        setIsMobile(mediaQuery.matches);

        const handleChange = (e) => {
            setIsMobile(e.matches);
        };

        mediaQuery.addListener(handleChange);

        return () => {
            mediaQuery.removeListener(handleChange);
        };
    }, []);

    return (
        <div className='card-container'>
            <div className="card">
                <div className="card-head">
                    <p>ADVICE #{isActive ? <span>{quoteNum}</span> : <span>0</span>}</p>
                </div>
                <div className="card-body">
                    {isActive ? <h1>"{quote}"</h1> : <h1>Generate a Random Quote</h1>}
                    {/* <h1>"It is easy to sit up and take notice, what's difficult is getting up and taking action"</h1> */}

                    {isMobile ? <img src={dividerMobile} alt="" /> : <img src={dividerDesktop} alt="" />}
                </div>
                <div className="card-footer">
                    <button onClick={fetchAdvice} className='dice'><img src={dice} id='dice-img'></img></button>
                </div>
            </div>
        </div>
    )
}

export default Card
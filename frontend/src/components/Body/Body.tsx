'use client'


import './Body.css'
import { useState } from 'react';
import RegisterModal from '@/components/Modal/RegisterModal/RegisterModal';
import { createPortal } from 'react-dom';

export default function Body(){
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    
    return (<>
        <div className="content">
            <div className="left">
                <div className="title">Welcome to UTSC</div>
            </div>
            <div className="right">
                <div className="blob">
                    <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <radialGradient id="b" r="100%" cx="50%" cy="50%"><stop offset="0%" stopColor="#21D4FD"/><stop offset="100%" stopColor="#B721FF"/></radialGradient>
                        </defs>
                        <path fill="url(#b)">
                            <animate attributeName='d'
                            dur={"10s"}
                            repeatCount={"indefinite"}
                            values="M868 678.5q-84 178.5-271 197t-348.5-79Q87 699 147 529t168-268.5q108-98.5 249-58t264.5 169Q952 500 868 678.5Z;
                            M793 648q-57 148-224.5 216.5t-244-87.5q-76.5-156-144-309.5t84-244.5q151.5-91 324-70.5t217 184Q850 500 793 648Z;
                            M761 604q-95 104-222.5 194.5t-232.5-32Q201 644 192 496t115.5-221.5q124.5-73.5 292-91t212 149.5Q856 500 761 604Z;
                            M868 678.5q-84 178.5-271 197t-348.5-79Q87 699 147 529t168-268.5q108-98.5 249-58t264.5 169Q952 500 868 678.5Z"/>
                        </path>    
                    </svg>
                </div>
                <div className="text">Explore the community</div>
            </div>
        </div>
    </>)
}

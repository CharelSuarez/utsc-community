"use client";
import Link from 'next/link';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import LoginModal from '@/components/LoginModal/LoginModal';
import './Taskbar.css';
import RegisterModal from '../RegisterModal/RegisterModal';
import { logout } from '@/api/auth';

export default function Taskbar(){
    const [showLoginModal, setLoginShowModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    return (
        <div className='taskbar'>
            <h1>joe's website</h1>
            <div className="links">
                <Link href="/dashboard">
                    <button>Dashboard</button>
                </Link>
                <Link href="/map">
                    <button>Map</button>
                </Link>
                <Link href="/social">
                    <button>Social</button>
                </Link>
                <button onClick={(event) => setLoginShowModal(true)}>
                Login
                </button>
                {showLoginModal && createPortal(
                    <LoginModal onClose={() => setLoginShowModal(false)} />,
                    document.body
                )}
                <button onClick={(event) => setShowRegisterModal(true)}>
                Register
                </button>
                {showRegisterModal && createPortal(
                    <RegisterModal onClose={() => setShowRegisterModal(false)} />,
                    document.body
                )}
                <button onClick={(event) => logout()}>
                Logout
                </button>
            </div>
        </div>
    )
}
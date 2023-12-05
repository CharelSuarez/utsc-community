import { useRef } from "react";
import Modal from "@/components/Modal/Modal";
import { MouseEventHandler } from "react";
import { login } from "@/api/auth";

interface LoginModalProps {
    onClose: () => void;
}

function getModalChildren({onClose}: LoginModalProps) {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const onClickLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!usernameRef.current || !passwordRef.current) {
            return;
        }
    
        const username = usernameRef.current.value == null ? '' : usernameRef.current.value;
        const password = passwordRef.current.value == null ? '' : passwordRef.current.value;
    
        login(username, password).then((response) => {
            if (!response) {
                return;
            }
            onClose();
            window.location.href = '/social';
        });

        usernameRef.current.value = '';
        passwordRef.current.value = '';
    };

    return (
        <>
            <h1>Login</h1>
            <div className='modal-form'>
                <input ref={usernameRef} type='text' placeholder='Username' autoComplete="off"/>
                <input ref={passwordRef} type='password' placeholder='Password' autoComplete="off"/>
                <button className="button active submit" onClick={onClickLogin}>Log In</button>
            </div>
        </>
    )
}

export default function LoginModal({ onClose }: LoginModalProps) {
    return (
        <>
            <Modal children={getModalChildren({onClose})} onClose={onClose} type='modal'/>
        </>
    );
}

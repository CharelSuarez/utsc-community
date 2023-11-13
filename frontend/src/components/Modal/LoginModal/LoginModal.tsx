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
            // window.location.href = '/dashboard';
        });

        usernameRef.current.value = '';
        passwordRef.current.value = '';
    };

    return (
        <>
            <h1>Login</h1>

            <script src='https://accounts.google.com/gsi/client' async></script>
            <div id='g_id_onload'
                data-client_id='YOUR_GOOGLE_CLIENT_ID'
                data-login_uri='https://your.domain/your_login_endpoint'
                data-auto_prompt='false'>
            </div>
            <div className='g_id_signin'
                data-type='standard'
                data-size='large'
                data-theme='outline'
                data-text='sign_in_with'
                data-shape='rectangular'
                data-logo_alignment='left'>
            </div>

            <div className='modal-form'>
                <input ref={usernameRef} type='text' placeholder='Username' autoComplete="off"/>
                <input ref={passwordRef} type='password' placeholder='Password' autoComplete="off"/>
                <button onClick={onClickLogin}>Log In</button>
            </div>
        </>
    )
}

export default function LoginModal({ onClose }: LoginModalProps) {
    return (
        <>
            <Modal children={getModalChildren({onClose})} onClose={onClose}/>
        </>
    );
}

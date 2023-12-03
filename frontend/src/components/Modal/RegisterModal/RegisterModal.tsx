import { useRef } from 'react';
import Modal from "@/components/Modal/Modal";
import { register } from '@/api/auth';

interface RegisterModalProps {
    onClose: () => void;
}

function getModalChildren({onClose}: RegisterModalProps) {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const onClickRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!usernameRef.current || !passwordRef.current) {
            return;
        }
    
        const username = !usernameRef.current?.value ? '' : usernameRef.current.value;
        const password = !passwordRef.current?.value ? '' : passwordRef.current.value;
        const picture = !fileRef.current?.files ? null : fileRef.current.files[0];
    
        register(username, password, picture).then((response) => {
            if (!response) {
                return;
            }
            onClose();
            window.location.href = '/social';
        });

        usernameRef.current.value = '';
        passwordRef.current.value = '';
        if (fileRef.current) {
            fileRef.current.value = '';
        }
    };

    return (
        <>
            <h1>Register</h1>

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
                <input ref={fileRef} type='file' placeholder='File' autoComplete="off"/>
                <button onClick={onClickRegister}>Register</button>
            </div>
        </>
    )
}

export default function RegisterModal({ onClose }: RegisterModalProps) {
    return (
        <Modal children={getModalChildren({onClose})} onClose={onClose} type='modal'/>
    );
}

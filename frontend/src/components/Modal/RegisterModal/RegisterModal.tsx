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
            <div className='modal-form'>
                <input ref={usernameRef} type='text' placeholder='Username' autoComplete="off"/>
                <input ref={passwordRef} type='password' placeholder='Password' autoComplete="off"/>
                <label htmlFor="files" className='button active'>Select Avatar Image (Optional)</label>
                <input id="files" ref={fileRef} type='file' placeholder='File' autoComplete="off" style={{visibility: 'hidden', display: 'none'}}/>
                <button className='button active submit red' onClick={onClickRegister}>Register</button>
            </div>
        </>
    )
}

export default function RegisterModal({ onClose }: RegisterModalProps) {
    return (
        <Modal children={getModalChildren({onClose})} onClose={onClose} type='modal'/>
    );
}

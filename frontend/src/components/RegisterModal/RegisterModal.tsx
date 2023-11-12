import Modal from '../Modal/Modal';

interface RegisterModalProps {
    onClose: () => void;
}

function getModalChildren() {
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
                <input id='username' type='text' placeholder='Username' />
                <input id='password' type='password' placeholder='Password' />
                <button>Register</button>
            </div>
        </>
    )
}

export default function RegisterModal({ onClose }: RegisterModalProps) {
    return (
        <Modal children={getModalChildren()} onClose={onClose}/>
    );
}

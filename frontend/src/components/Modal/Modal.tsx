import './Modal.css';
interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
    return (
        <>
            <div className='modal'>
                <img className='close-button' src='https://i.imgur.com/O3YBoxX.png' alt='close' onClick={onClose} />
                {children}
            </div>
        </>
    );
}

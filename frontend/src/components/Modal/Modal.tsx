import './Modal.css';
interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
    type: string;
}

export default function Modal({ onClose, children, type }: ModalProps) {
    return (
        <>
            <div className={'modal ' + type}>
                <img className='close-button' src='https://i.imgur.com/O3YBoxX.png' alt='close' onClick={onClose} />
                {children}
            </div>
        </>
    );
}

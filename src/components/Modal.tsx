import {useState, useEffect} from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children : React.ReactNode
}

function Modal({isOpen, onClose, children}:ModalProps){
    const [modalVisible, setModalVisible] = useState(isOpen);

    const closeModal = () => {
        setModalVisible(()=>false);
        onClose();
    };

    useEffect(() => {
        setModalVisible(isOpen)
    }, [isOpen])
    console.log(modalVisible)

    return (
        <>
            {modalVisible && (
              <dialog className='modal' open={modalVisible}>
                <div className="modal-box w-fit ">
                    <div className={`modal-content`} >
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>closeModal()}>✕</button>
                        <div className='mt-3 w-fit'>
                          {children}
                        </div>
                    </div>
                </div>
                <div className='modal-backdrop' onClick={()=>closeModal()}>
                  <button>Close</button>
                </div>
              </dialog>
            )}
        </>
    );
};

export default Modal;
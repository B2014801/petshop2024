import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Modal1 } from '~/components/modals';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import style from './search.module.scss';

const cx = classNames.bind(style);
function Micro({ sendValue }) {
    const navigate = useNavigate();
    const [state, setState] = useState({
        isListening: true,
        isShowModal: false,
        isEnableMicro: true,
        recognition: null,
        response: '',
    });
    const openModal = () => {
        setState((prev) => ({ ...prev, isShowModal: true }));
        startRecognition();
    };
    const closeModal = () => {
        setState((prev) => ({ ...prev, isShowModal: false }));
        state.recognition.stop();
    };

    const handleEnableMicro = (e) => {
        e.preventDefault();
        setState((prev) => ({ ...prev, isEnableMicro: !prev.isEnableMicro }));
        if (state.isEnableMicro === true) {
            state.recognition.stop();
        } else {
            startRecognition();
        }
    };
    const startRecognition = () => {
        if ('webkitSpeechRecognition' in window) {
            let recognitions = new window.webkitSpeechRecognition();
            setState((prev) => ({ ...prev, recognition: recognitions }));
            const recognition = recognitions;

            recognition.lang = 'vi-VN'; // Set the language to Vietnamese

            recognition.onstart = () => {
                setState((prev) => ({ ...prev, response: '', isListening: true, isEnableMicro: true }));
            };

            recognition.onend = () => {
                setState((prev) => ({
                    ...prev,
                    response: 'Mi-crô đang tắt. Mời bạn nói lại.',
                    isListening: false,
                    isEnableMicro: false,
                }));
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript.toLowerCase();
                sendValue(transcript);
                navigate(`/search?key=${transcript}`);
                closeModal();
            };

            recognition.start();
        } else {
            alert('Speech recognition is not supported in your browser.');
        }
    };
    return (
        <div>
            <FontAwesomeIcon icon={faMicrophone} onClick={openModal} />
            <Modal1 show={state.isShowModal} isClosed={closeModal}>
                <div className={cx('microphone-model-container')}>
                    <div className={cx('microphone-close-model')}>
                        <FontAwesomeIcon icon={faTimes} onClick={closeModal} />
                    </div>

                    {state.isListening === true && (
                        <div className={cx('microphone-model-title-event')}>Đang nghe...</div>
                    )}

                    <div v-if="!isEnableMicro" className={cx('microphone-model-title-event')}>
                        {state.response}
                    </div>
                    <div className={cx('container')}>
                        <button
                            id="speech"
                            className={cx('micro-btn-animation')}
                            onClick={handleEnableMicro}
                            style={{ background: state.isEnableMicro ? '#c00' : 'rgba(0, 0, 0, 0.5)' }}
                        >
                            <div
                                className={cx('', {
                                    'pulse-ring': state.isEnableMicro,
                                })}
                            ></div>
                            <FontAwesomeIcon icon={faMicrophone} />
                        </button>
                    </div>
                </div>
            </Modal1>
        </div>
    );
}

export default Micro;

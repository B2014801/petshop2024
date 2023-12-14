import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faMessage, faLocationDot } from '@fortawesome/free-solid-svg-icons';

// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { decrement, increment } from '~/stores/auth.store';

function Footer() {
    // const count = useSelector((state) => state.counter.value);
    // const dispatch = useDispatch();
    return (
        <footer>
            <p class="text-center text-white">© Copyright by student of ctu</p>
            <div class="text-center">
                <a href="https://www.facebook.com/profile.php?viewas=100000686899395&id=100027472571183">
                    <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
                </a>
                <a href="#">
                    <FontAwesomeIcon icon={faMessage}></FontAwesomeIcon>
                </a>

                <a href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+C%E1%BA%A7n+Th%C6%A1/@10.029939,105.7684266,17z/data=!3m1!4b1!4m6!3m5!1s0x31a0895a51d60719:0x9d76b0035f6d53d0!8m2!3d10.0299337!4d105.7706153!16s%2Fm%2F02r6wmy?hl=vi-VN">
                    <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                </a>
            </div>
            {/* <Model :showVoucherModal="isShowModelFooter" @closeModel="closeModel()">
            <div>
                <img :src="img.zalo" class="w-100" alt="" />
            </div>
        </Model> */}
            {/* <div>
                <div>
                    <button aria-label="Increment value" onClick={() => dispatch(increment())}>
                        Increment
                    </button>
                    <span>{count}</span>
                    <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
                        Decrement
                    </button>
                </div>
            </div> */}
        </footer>
    );
}

export default Footer;

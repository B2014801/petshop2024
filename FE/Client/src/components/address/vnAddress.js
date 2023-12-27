import React, { useEffect, useState } from 'react';
import VietNamAddress from '~/services/another_service/vietnamaddress.service';

function VnAddress({ isClickSubmit, user_address = null, sendAddressData, sendIsValid = () => {} }) {
    const [selectedTown, setSelectedTown] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [address, setAddress] = useState([]);

    const onTownChange = (e) => {
        setSelectedTown(e.target.value);
        const districts = selectedTownDistricts();
        setSelectedDistrict('');
        // console.log(selectedTownDistricts());
        setSelectedWard('');
    };

    const onDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
        setSelectedWard('');
    };

    const onWardChange = (e) => {
        setSelectedWard(e.target.value);
    };

    const getVietNamAddress = async () => {
        try {
            let address = await VietNamAddress.getVietNamAddress();
            setAddress(address);
        } catch (error) {
            console.log(error);
        }
    };

    const emitAddressData = () => {
        if (isChosenAddress()) {
            const data = { address: selectedWard + ', ' + selectedDistrict + ', ' + selectedTown };

            sendAddressData(data);
        }
    };

    const selectedTownDistricts = () => {
        if (selectedTown) {
            const selectedTownData = address.find((item) => item.name === selectedTown);
            return selectedTownData ? selectedTownData.districts : [];
        }
        return [];
    };

    const selectedDistrictWards = () => {
        if (selectedDistrict) {
            const selectedDistrictData = selectedTownDistricts().find((item) => item.name === selectedDistrict);
            return selectedDistrictData ? selectedDistrictData.wards : [];
        }
        return [];
    };
    const isChosenAddress = () => {
        return selectedTown !== '' && selectedDistrict !== '' && selectedWard !== '';
    };

    const isShowNotChosenAddressWhenSubmit = () => {
        return !isChosenAddress() && isClickSubmit;
    };

    // useEffect(() => {
    //     emitAddressData();
    //     // sendIsChosenAddress(isChosenAddress());
    // }, [selectedWard]);

    // useEffect(() => {
    //     sendIsChosenAddress(isChosenAddress());
    // }, [selectedDistrict]);

    useEffect(() => {
        emitAddressData();

        sendIsValid(isChosenAddress());
    }, [selectedWard]);

    useEffect(() => {
        getVietNamAddress();

        if (user_address) {
            let address = user_address.split(',');
            setSelectedTown(address[2].trim());
            setSelectedDistrict(address[1].trim());
            setSelectedWard(address[0].trim());
            // emitAddressData();
        }
    }, [user_address]);

    return (
        <div className="form-group font-weight-bold mt-2" style={{ display: address.length !== 0 ? 'block' : 'none' }}>
            <label>
                Địa chỉ <strong className="text-danger">(*)</strong>{' '}
            </label>
            <div className="input-group border register-address-selection">
                <select value={selectedTown} onChange={onTownChange}>
                    <option value="">Tỉnh</option>
                    {address.map((item, index) => (
                        <option key={'tinh' + index} value={item.name}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <select value={selectedDistrict} onChange={onDistrictChange}>
                    <option value="">Huyện</option>
                    {selectedTownDistricts().map((item, index) => (
                        <option key={'quan' + index} value={item.name}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <select value={selectedWard} onChange={onWardChange}>
                    <option value="">Xã</option>
                    {selectedDistrictWards().map((item, index) => (
                        <option key={'phuong' + index} value={item.name}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
            {isShowNotChosenAddressWhenSubmit() && <span className="text-danger">Vui lòng chọn địa chỉ</span>}
        </div>
    );
}

export default VnAddress;

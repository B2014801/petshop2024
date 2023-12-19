import { useState, useEffect } from 'react';

function useDebounce(value, delaytime) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handleDebounce = setTimeout(() => setDebouncedValue(value), delaytime);

        return () => {
            clearTimeout(handleDebounce);
        };
    }, [value]);

    return debouncedValue;
}

export default useDebounce;

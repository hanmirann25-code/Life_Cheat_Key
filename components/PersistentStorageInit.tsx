'use client';

import { useEffect } from 'react';

export default function PersistentStorageInit() {
    useEffect(() => {
        async function initPersistence() {
            if (typeof window !== 'undefined' && navigator.storage && navigator.storage.persist) {
                try {
                    const isPersisted = await navigator.storage.persisted();
                    if (!isPersisted) {
                        const result = await navigator.storage.persist();
                        console.log(`Persistent storage granted: ${result}`);
                    }
                } catch (error) {
                    console.error('Persistent storage request failed:', error);
                }
            }
        }
        initPersistence();
    }, []);

    return null;
}

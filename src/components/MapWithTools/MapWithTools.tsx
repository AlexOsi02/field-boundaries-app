import { useState, useRef, FC } from 'react';
import { YMaps, Map, Polygon, GeolocationControl, ZoomControl } from '@pbe/react-yandex-maps';
import styles from './MapWithTools.module.scss';

const MapWithTools: FC = () => {
    const [coordinates, setCoordinates] = useState<number[][]>([]);
    const mapRef = useRef<any>(null);

    const handleMapClick = (event: any) => {
        const coords = event.get('coords');
        setCoordinates((prev) => [...prev, coords]);
    };

    const handleClosePolygon = () => {
        if (coordinates.length > 2) {
            setCoordinates([...coordinates, coordinates[0]]); // Замыкаем контур
        }
    };

    return (
        <div className={styles.mapContainer}>
            <YMaps>
                <Map
                    instanceRef={mapRef}
                    defaultState={{
                        center: [55.751244, 37.618423], // Москва
                        zoom: 9,
                    }}
                    width="100%"
                    height="500px"
                    onClick={handleMapClick}
                >
                    <GeolocationControl />
                    <ZoomControl />
                    {coordinates.length > 1 && <Polygon geometry={[coordinates]} />}
                </Map>
            </YMaps>
            <div className={styles.controls}>
                <button onClick={handleClosePolygon} disabled={coordinates.length < 3}>
                    Замкнуть контур
                </button>
                <button onClick={() => setCoordinates([])}>Сбросить</button>
            </div>
        </div>
    );
};

export default MapWithTools;
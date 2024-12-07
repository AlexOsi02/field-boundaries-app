import { FC } from "react";
import MapWithTools from './components/MapWithTools/MapWithTools';
import './styles/global.scss';

const App: FC = () => {
    return (
        <div>
            <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Интерактивная карта</h1>
            <MapWithTools />
        </div>
    );
};

export default App;
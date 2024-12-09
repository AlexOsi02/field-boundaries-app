import { useState, useRef, FC, useEffect, SetStateAction } from "react";
import { Map, Polygon, ZoomControl } from "@pbe/react-yandex-maps";
import { area } from "@turf/area";
import { polygon } from "@turf/helpers";
import length from "@turf/length";
import classNames from "classnames";
import { checkPointInsidePolygon } from "../../utils/checkPointInsidePolygon.ts";
import returnIcon from "../../assets/return.png";
import { handleSaveData } from "../../utils/saveData.ts";
import { handleLoadData } from "../../utils/loadData.ts";
import { FileInput } from "../FileInput/FileInput.tsx";
import Button from "../Button/Button.tsx";
import { Input } from "../Input/Input.tsx";
import styles from "./MapWithTools.module.scss";

export const MapWithTools: FC = () => {
  const [coordinates, setCoordinates] = useState<number[][]>([]);
  const [returnedCoordinates, setReturnedCoordinates] = useState<number[][]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [calculatedValue, setCalculatedValue] = useState<{ square: number; perimeter: number } | null>(null);
  const mapRef = useRef<any>(null);
  const polygonRef = useRef<any>(null);

  const handleMapClick = (event: any) => {
    if (!isDrawing) return;

    const coords = event.get("coords");
    setCoordinates((prev) => [...prev, coords]);
  };

  const handleToggleDrawing = () => {
    setIsDrawing(!isDrawing);
  };

  const handleReset = () => {
    setCoordinates([]);
    setReturnedCoordinates([]);
    setIsDrawing(false);
  };

  const handleReturn = () => {
    const newCoordinates = [...coordinates];
    const lastValue = newCoordinates.pop();
    setCoordinates(newCoordinates);
    setReturnedCoordinates(((prevState) => [...prevState, lastValue]) as SetStateAction<number[][]>);
  };

  const handleCancelReturn = () => {
    const newReturnedCoordinates = [...returnedCoordinates];
    const lastValue = newReturnedCoordinates.pop();
    setReturnedCoordinates(newReturnedCoordinates);
    setCoordinates(((prevState) => [...prevState, lastValue]) as SetStateAction<number[][]>);
  };

  const calculateArea = () => {
    const turfPolygon = polygon([[...coordinates, coordinates[0]]]);
    const computedArea = area(turfPolygon);
    const perimeter = length(turfPolygon, { units: "meters" });
    const newCalculatedValue = { square: computedArea / 10000, perimeter };
    setCalculatedValue(newCalculatedValue);
  };

  const handleCheckPointInsidePolygon = () => {
    const point = inputValue.split(",").map((val) => parseFloat(val.trim()));

    if (point.length !== 2 || point.some((val) => isNaN(val))) {
      alert("Введите корректные координаты (например: 55.75, 37.61)");
      return false;
    }

    if (checkPointInsidePolygon(coordinates, point)) {
      return alert("Внутри");
    }

    return alert("Не внутри");
  };

  useEffect(() => {
    coordinates.length > 2 && calculateArea();
  }, [coordinates]);

  return (
    <main className={styles.main}>
      <div className={styles.mapContainer}>
        <Map
          instanceRef={mapRef}
          defaultState={{
            center: [55.751244, 37.618423], // Москва
            zoom: 9,
          }}
          onClick={handleMapClick}
          className={styles.map}
        >
          <ZoomControl />
          {coordinates.length > 1 && (
            <Polygon
              geometry={[coordinates]}
              instanceRef={polygonRef}
              options={{
                fillColor: "#00FF0044",
                strokeColor: "#0000FF",
                strokeWidth: 2,
              }}
            />
          )}
        </Map>
        <div className={styles.returnButtons}>
          <button onClick={handleReturn} disabled={!coordinates.length}>
            <img src={returnIcon} className={styles.img} alt={"return button"} />
          </button>

          <button onClick={handleCancelReturn} disabled={!returnedCoordinates.length}>
            <img
              src={returnIcon}
              className={classNames(styles.img, styles.img__reflect)}
              alt={"cancel return button"}
            />
          </button>
        </div>
      </div>

      <div className={styles.tools}>
        <div className={styles.alignContainer}>
          <div className={styles.controls}>
            <Button onClick={handleToggleDrawing} active={isDrawing}>
              {isDrawing ? "Завершить рисование" : "Начать рисование"}
            </Button>
            <Button onClick={handleReset} variant={"red"} disabled={!coordinates.length}>
              Сбросить
            </Button>
          </div>

          <div className={styles.controls}>
            <Button onClick={() => handleSaveData(coordinates)} disabled={isDrawing || coordinates.length < 2}>
              Скачать
            </Button>
            <FileInput onChange={(event) => handleLoadData(event, setCoordinates as (data: unknown) => void)} />
          </div>
        </div>
        {coordinates.length > 2 && (
          <>
            <div className={styles.calculatedInfo}>
              {calculatedValue !== null && (
                <>
                  <p>
                    <strong>Площадь поля:</strong> {calculatedValue.square.toFixed(2)} га
                  </p>
                  <p>
                    <strong>Периметр поля:</strong> {calculatedValue.perimeter.toFixed(2)} м
                  </p>
                </>
              )}
            </div>
            <div>
              Координаты вершин полигона:
              <ul className={styles.list}>
                {coordinates.map((coord, index) => (
                  <ol key={index}>
                    {index + 1}. [ {coord[0].toFixed(6)}, {coord[1].toFixed(6)} ]
                  </ol>
                ))}
              </ul>
            </div>
            <div>
              <Input
                type="text"
                placeholder="Введите координаты (например: 55.75, 37.61)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={styles.input}
              />
              <button onClick={handleCheckPointInsidePolygon} disabled={!inputValue} style={{ padding: "10px" }}>
                Проверить точку
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

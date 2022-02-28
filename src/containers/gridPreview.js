import { useState, useEffect } from "react";
import { Text } from "../components";

export default function GridImage({ images }) {
    const [Rows, setRows] = useState([]);

    useEffect(() => {
        const getRowColumn = () => {
            if (images.length <= 2) return [1, images.length];
            else if (images.length >= 3) return [2, 2];
        };

        let [numRow, numColumn] = getRowColumn();
        let Rows = [];
        for (let i = 0; i < numRow; i++) {
            let columnItems = images.slice(
                i * numColumn,
                i * numColumn + numColumn
            );
            Rows.push(
                <div className="grid_preview__row"
                    style={{
                        display: `flex`,
                        gap: `5px`,
                        height: `50%`,
                    }}>
                    {columnItems.map((item, index) => {
                        return (
                            <div
                                key={Math.floor(Math.random() * 16777215).toString(16)}
                                className={
                                    i == 1 && index == 1
                                        ? `grid_preview__imgLeft`
                                        : `grid_preview__item`
                                }
                                style={{
                                    flex: `${100 / columnItems.length}%`,
                                    marginTop: `5px`,
                                    verticalAlign: `middle`,
                                    height: `100%`,
                                }}
                            >
                                {i == 1 && index == 1 ? (
                                    <Text.CenterLine>
                                        ` + ${images.length - 3}`
                                    </Text.CenterLine>
                                ) : (
                                    <img src={item.picture.medium}
                                        styles={{
                                            marginTop: `5px`,
                                            verticalAlign: `middle`,
                                            height: `100%`,
                                        }} ></img>
                                )}
                            </div>
                        );
                    })}
                </div>
            );
        }
        setRows([...Rows]);
    }, []);

    return (
        <div
            className="grid_preview__container"
            style={{
                display: `flex`,
                flexDirection: `column`,
                width: `300px`,
                height: `300px`,
            }}
        >
            {Rows.map((row) => row)}
        </div>
    );
}

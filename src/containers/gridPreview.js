import React, { useState, useEffect, useRef } from "react";
import { Text, ContainerComponent, ButtonComponent } from "../components";


export default function GridPreview({ files }) {
    const [Rows, setRows] = useState([]);
    console.log(files)

    const Images = useRef(files.filter((file) => file.fileType.includes('image')))
    const otherFiles = useRef(files.some((file) => !file.fileFormat.includes(`image`)))

    // images = ['linkImage']
    const getRowColumn = () => {
        if (Images.current.length <= 2) return [1, Images.current.length];
        else if (Images.current.length >= 3) return [2, 2];
    };

    useEffect(() => {

        let [numRow, numColumn] = getRowColumn();
        let rows = [];
        if (Images.current.length > 0) for (let i = 0; i < numRow; i++) {
            let columnItems = Images.current.slice(
                i * numColumn,
                i * numColumn + numColumn
            );

            rows.push(
                <div className="grid_preview__row"
                    key={i + 1}
                    style={{
                        display: `flex`,
                        gap: `5px`,
                        height: numRow > 1 ? `50%` : `100%`,
                    }}>
                    {columnItems.map((item, index) => {
                        return (
                            <div key={index + 1}
                                className={
                                    i === 1 && index === 1
                                        ? `grid_preview__imgLeft`
                                        : `grid_preview__item`
                                }
                                style={{
                                    flex: `${100 / columnItems.length}%`,
                                    verticalAlign: `middle`,
                                    border: '1px solid #000',
                                    position: 'relative',
                                    filter: 'contrast(50%)',
                                }}>
                                {i === 1 && index === 1 ? (
                                    <Text.AbsoluteMiddle>
                                        <Text.CenterLine>
                                            {`+ ${Images.current.length - 3}`}
                                        </Text.CenterLine>
                                    </Text.AbsoluteMiddle>
                                ) : (
                                    <img src={`${item.image}`}
                                        alt={'post'}
                                        style={{
                                            height: `100%`,
                                        }} />
                                )}
                            </div>
                        );
                    })}
                </div>
            );
        }
        setRows([...rows]);
    }, []);

    return (
        <div className="post_review__container" style={{
            margin: `0 auto`,
            display: `flex`,
            flexDirection: `column`,
            width: `100%`,
            alignContent: `center`
        }}>
            {Rows.length > 0 && <ContainerComponent.Pane
                className="grid_preview__container"
                style={{
                    display: `flex`,
                    flexDirection: `column`,
                    margin: '5px 0',
                    gap: '5px',
                    width: `100%`,
                    height: otherFiles.current ? `250px` : `100%`
                }}
            >
                {Rows.map((row) => row)}

            </ContainerComponent.Pane>}
            {otherFiles.current && <ButtonComponent.Upload className="upload_file" style={{
                width: `100%`, height: `50px`, textAlign: `center`,
                verticalAlign: `middle`, border: '1px dashed #000', position: 'relative'
            }}>
                <Text.AbsoluteMiddle>
                    Uploaded File
                </Text.AbsoluteMiddle>
            </ButtonComponent.Upload>}
        </div>
    );
}

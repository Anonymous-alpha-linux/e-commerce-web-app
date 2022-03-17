import React, { useState, useEffect, useRef } from "react";
import { Text, ContainerComponent, ButtonComponent, Preview } from "../components";


export default function GridPreview({ files }) {
    const [rawDoc, setRawDoc] = useState(false);
    const [data, setData] = useState(files);

    function validateFiles(files) {
        let imageRegex = /(gif|jpe?g|tiff?|png|webp|bmp)/i;
        return files.map(file => {
            let isImage = imageRegex.test(file.fileFormat);
            if (isImage) return file;
            setRawDoc(true);
            return null;
        }).filter(file => file);
    }
    useEffect(() => {
        setData(validateFiles(files));
    }, [files]);

    return (
        <>
            <ContainerComponent.Flex className="post_review__container" style={{ padding: '10px 0' }}>
                {data.slice(0, 4).map((file, index) => {
                    return <ContainerComponent.Item key={file._id} style={{ flexBasis: '50%', flexGrow: '1', maxHeight: '240px', position: 'relative' }}>
                        <ContainerComponent.Pane style={{ overflow: 'hidden', border: '1px soli #333' }}>
                            <Preview.Images image={file.image} alt={"Preview Image"}></Preview.Images>
                            {index > 2 && <ContainerComponent.Inner style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '100%', height: '100%', background: '#999', opacity: '0.6', color: '#fff', fontWeight: '500', fontSize: '3em' }}>
                                <Text.AbsoluteMiddle><Text.Center>{data.length - 3}+</Text.Center></Text.AbsoluteMiddle>
                            </ContainerComponent.Inner>}
                        </ContainerComponent.Pane>
                    </ContainerComponent.Item>
                })}
            </ContainerComponent.Flex>
            {rawDoc && <ButtonComponent.Upload className="upload_file" style={{
                width: `100%`, height: `40px`, textAlign: `center`,
                verticalAlign: `middle`, border: '1px dashed #000', position: 'relative', display: 'inline-block'
            }}>
                <Text.Line style={{ padding: '10px' }}>
                    Uploaded File
                </Text.Line>
            </ButtonComponent.Upload>}
        </>
    );
}

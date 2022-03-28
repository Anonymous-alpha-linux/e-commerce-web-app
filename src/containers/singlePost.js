import React from 'react'
import { ButtonComponent, ContainerComponent, Icon, Preview } from '../components'
import { BiChevronLeft,BiChevronRight } from 'react-icons/bi'
export default function SinglePost() {
    const [index,setIndex] = React.useState(0)
   const images = [
       { image:'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg'},
       { image: 'https://cdn.pixabay.com/photo/2017/02/08/17/24/fantasy-2049567_960_720.jpg'},
    ];
  const nextSlide = () => {
    setIndex(index === images.length -1 ? 0 : index + 1 )
  };
  const prevSlide = () => {
    setIndex(index === 0? images.length -1 : index -1)
    if(!Array.isArray(images) || images.length <= 0){
      return null;
    }
  }
  return (
    <ContainerComponent.Flex style={{position:"relative",overflow:"hiden"}}>
      <ContainerComponent.Item style={{ height: '50%',width:"100%", padding: "0", flexGrow: "1", position: "relative"}}>
              <ContainerComponent.Pane className={"side"} style={{position:"relative"}}>
                {images.map((imageItems,imageIndex) => {
                    return(
                      <ContainerComponent.Item className={imageIndex === index ? 'slide active' : 'slide'} key={imageIndex} style={{ display: "flex", alignItems: "center", width: "100%", height: "100%", padding: "0", flexGrow: "1", flexBasic: "100%", flexShrink: "0", overflow: "hiden"}}>
                              {imageIndex === index && (<Preview.Images image={imageItems.image} style={{ width: "100%", height: "100%" }}></Preview.Images>)}
                            </ContainerComponent.Item>
                    )
                })}
            </ContainerComponent.Pane>
                <ContainerComponent.Pane className={"button__couple"}>
                      <ButtonComponent onClick={prevSlide} className={"button"}>
                        <Icon><BiChevronLeft></BiChevronLeft></Icon>
                    </ButtonComponent>
                      <ButtonComponent onClick={nextSlide} className={"button"}>
                        <Icon><BiChevronRight></BiChevronRight></Icon>
                    </ButtonComponent>
                </ContainerComponent.Pane>
        </ContainerComponent.Item>
        {/* <ContainerComponent.Item>
          
        </ContainerComponent.Item> */}
    </ContainerComponent.Flex>
  )
}

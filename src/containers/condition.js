import React from 'react';
import { ContainerComponent, Icon, Text, ButtonComponent } from "../components";
import { VscClose } from "react-icons/vsc";

export default function ConditionContainer({ closeCondition }) {
    return <ContainerComponent.Section className="conditional__container" style={{
        background: '#163d3c',
        color: 'black',
        position: 'fixed',
        top: '50px',
        left: 0,
        height: '100%',
        paddingBottom: '50px'
    }}>
        <ContainerComponent.Inner style={{
            height: '100%'
        }}>
            <ContainerComponent.Flex style={{
                flexDirection: 'column',
                justifyContent: 'space-around'
            }}>
                <ContainerComponent.Item>
                    <Icon.CircleIcon
                        style={{
                            position: 'relative',
                            alignSelf: 'end',
                            marginTop: '10px',
                            marginRight: ' 10px'
                        }}
                        onClick={closeCondition}
                    >
                        <VscClose></VscClose>
                    </Icon.CircleIcon>
                </ContainerComponent.Item>
                <ContainerComponent.Item>
                    <Text.Title style={{
                        color: '#fff'
                    }}>
                        Term and Condition
                    </Text.Title>
                    <ContainerComponent.Pane
                        style={{
                            background: 'white',
                            color: 'black',
                            padding: '10px'
                        }}
                    >
                        <Text.Paragraph>Việc bạn sử dụng website, bạn đồng ý với các Điều khoản sử dụng này. Chúng tôi có thể sửa đổi Điều khoản Sử dụng này bất kỳ lúc nào theo quyết định của chúng tôi bằng cách đăng các Điều khoản Sử dụng đã sửa đổi tại liên kết Điều khoản Sử dụng (tức là trang web bạn đang xem) hoặc ở nơi khác trên trang web này. Các bản sửa đổi đó sẽ có hiệu lực tại thời điểm bạn đang tải trang, trừ khi được chúng tôi tuyên bố rõ ràng.</Text.Paragraph>
                    </ContainerComponent.Pane>
                    <ContainerComponent.Pane
                        style={{
                            background: 'white',
                            color: 'black',
                            padding: '10px'
                        }}
                    >
                        <Text.Paragraph>Việc bạn sử dụng website, bạn đồng ý với các Điều khoản sử dụng này. Chúng tôi có thể sửa đổi Điều khoản Sử dụng này bất kỳ lúc nào theo quyết định của chúng tôi bằng cách đăng các Điều khoản Sử dụng đã sửa đổi tại liên kết Điều khoản Sử dụng (tức là trang web bạn đang xem) hoặc ở nơi khác trên trang web này. Các bản sửa đổi đó sẽ có hiệu lực tại thời điểm bạn đang tải trang, trừ khi được chúng tôi tuyên bố rõ ràng.</Text.Paragraph>
                    </ContainerComponent.Pane>
                </ContainerComponent.Item>
            </ContainerComponent.Flex>
        </ContainerComponent.Inner>
    </ContainerComponent.Section>
}
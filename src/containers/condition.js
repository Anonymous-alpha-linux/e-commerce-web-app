import React from 'react';
import { ContainerComponent, Icon, Text } from "../components";
import { VscClose } from "react-icons/vsc";

export default function ConditionContainer() {
    return <ContainerComponent.Section className="conditional__container">
        <ContainerComponent.MiddleInner
            style={{
                background: 'cyan',
                color: 'black',
                position: 'fixed',
                width: '40%',
                bottom: '10%',
                left: '50%',
            }}
        >
            <Icon.CircleIcon
                style={{
                    position: 'relative',
                    alignSelf: 'end',
                    marginTop: '10px',
                    marginRight: ' 10px'
                }}
            >
                <VscClose></VscClose>
            </Icon.CircleIcon>
            <Text.Title>
                Term and Condition
            </Text.Title>
            <ContainerComponent.Inner
                style={{
                    background: 'white',
                    color: 'black',
                    width: '90%',
                    padding: '10px 0',
                    margin: '5px 0',
                }}
            >
                <Text.Paragraph>Việc bạn sử dụng website, bạn đồng ý với các Điều khoản sử dụng này. Chúng tôi có thể sửa đổi Điều khoản Sử dụng này bất kỳ lúc nào theo quyết định của chúng tôi bằng cách đăng các Điều khoản Sử dụng đã sửa đổi tại liên kết Điều khoản Sử dụng (tức là trang web bạn đang xem) hoặc ở nơi khác trên trang web này. Các bản sửa đổi đó sẽ có hiệu lực tại thời điểm bạn đang tải trang, trừ khi được chúng tôi tuyên bố rõ ràng.</Text.Paragraph>
            </ContainerComponent.Inner>

            <ContainerComponent.Inner
                style={{
                    background: 'white',
                    color: 'black',
                    width: '90%',
                    padding: '10px 0',
                    margin: '5px 0',
                }}
            >
                <Text.Paragraph>Việc bạn sử dụng website, bạn đồng ý với các Điều khoản sử dụng này. Chúng tôi có thể sửa đổi Điều khoản Sử dụng này bất kỳ lúc nào theo quyết định của chúng tôi bằng cách đăng các Điều khoản Sử dụng đã sửa đổi tại liên kết Điều khoản Sử dụng (tức là trang web bạn đang xem) hoặc ở nơi khác trên trang web này. Các bản sửa đổi đó sẽ có hiệu lực tại thời điểm bạn đang tải trang, trừ khi được chúng tôi tuyên bố rõ ràng.</Text.Paragraph>
            </ContainerComponent.Inner>
        </ContainerComponent.MiddleInner>
    </ContainerComponent.Section>
}
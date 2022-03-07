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
        // paddingBottom: '50px'
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
                    <Text.CenterLine>
                        <Text.Title style={{
                            color: '#fff',
                            lineHeight: 2.2
                        }}>
                            Term and Condition
                        </Text.Title>
                    </Text.CenterLine>
                    <ContainerComponent.Pane
                        style={{
                            background: 'white',
                            color: 'black',
                            padding: '10px'
                        }}
                    >
                        <Text.Paragraph>
                            You use the website, you agree to these Terms of Use. We may amend the Terms of Use
                            This use is any at any time as well as OUR DECISION, I by subscribing to the Terms. Use has been modified in Affiliate Terms
                            Use (i.e. the web page you are viewing) or elsewhere on this site.
                            Such revision will be in effect at the time you are loading the page, unless expressly stated by us.
                        </Text.Paragraph>
                    </ContainerComponent.Pane>
                    <ContainerComponent.Pane
                        style={{
                            background: 'white',
                            color: 'black',
                            padding: '10px'
                        }}
                    >
                        <Text.Paragraph>
                            You use the website, you agree to these Terms of Use. We may amend the Terms of Use
                            This use is any at any time as well as OUR DECISION, I by subscribing to the Terms. Use has been modified in Affiliate Terms
                            Use (i.e. the web page you are viewing) or elsewhere on this site.
                            Such revision will be in effect at the time you are loading the page, unless expressly stated by us.
                        </Text.Paragraph>
                    </ContainerComponent.Pane>
                </ContainerComponent.Item>
            </ContainerComponent.Flex>
        </ContainerComponent.Inner>
    </ContainerComponent.Section>
}
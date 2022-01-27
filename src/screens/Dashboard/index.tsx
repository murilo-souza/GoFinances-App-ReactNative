import React from "react";
import {StatusBar} from 'expo-status-bar'

import {
    Container,
    Header,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    UserWrapper,
    Icon,
    HighlightCards
} from './styles'
import { HighlightCard } from "../../components/HighlightCard";

export function Dashboard(){
    return (
        <Container>
            <StatusBar style='light'/>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{uri: 'https://github.com/murilo-souza.png'}}/>
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Murilo</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power"/>
                </UserWrapper>
            </Header>
            <HighlightCards>
                <HighlightCard/>
                <HighlightCard/>
                <HighlightCard/>
            </HighlightCards>
        </Container>
    );
}
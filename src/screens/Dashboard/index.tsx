import React from "react";


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
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton
} from './styles'
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";


export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard(){
    const data: DataListProps[] = [
        {
            id: ' 1',
            type: 'positive',
            title: "Dev de site",
            amount: "R$ 17.000,00",
            category:{
                name: 'Vendas',
                icon: 'dollar-sign',
            },
            date:"13/02/2022",
        },
        {
            id: '2',
            type: 'negative',
            title: "X-Bacon",
            amount: "R$ 40,00",
            category:{
                name: 'Alimentação',
                icon: 'coffee',
            },
            date:"13/02/2022",
        },
        {
            id: '3',
            type: 'negative',
            title: "ALuguel",
            amount: "R$ 1.000,00",
            category:{
                name: 'Casa',
                icon: 'shopping-bag',
            },
            date:"13/02/2022",
        },
    ]

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{uri: 'https://github.com/murilo-souza.png'}}/>
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Murilo</UserName>
                        </User>
                    </UserInfo>
                    <LogoutButton onPress={()=>{}}>
                        <Icon name="power"/>
                    </LogoutButton>
                </UserWrapper>
            </Header>
            <HighlightCards>
                <HighlightCard title='Entradas' amount='R$ 17.000,00' lastTransaction='Última entrada dia 13 abril' type="up"/>
                <HighlightCard title='Saida' amount='R$ 17.000,00' lastTransaction='Última saida dia 13 abril' type="down"/>
                <HighlightCard title='Total' amount='R$ 17.000,00' lastTransaction='Dia 13 de abril' type="total" />
            </HighlightCards>
            <Transactions>
                <Title>Listagem</Title>

                <TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({item})=><TransactionCard data={item}/>}
                    
                />
            </Transactions>
        </Container>
    );
}
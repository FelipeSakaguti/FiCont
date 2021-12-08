import React from 'react';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import { 
    Container,
    Header,
    UserInfo,
    Photo,
    UserWrapper,
    User,
    UserGreeting,
    UserName,
    HighlighCards,
    Transactions,
    Title,
    Icon,
    TransactionsList,
    LogoutButton
} from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard(){
    const data: DataListProps[] = [
        {
            id: '1',
            title:"Desenvolvimento de site",
            amount:"R$12.000,00",
            category:{
                name: 'Vendas',
                icon: 'dollar-sign'
            },
            date:"16/04/2021",
            type:"positive"
        },
        {
            id: '2',
            title:"Pizzaria",
            amount:"R$1.111,00",
            category:{
                name: 'Casa',
                icon: 'coffee'
            },
            date:"10/04/2021",
            type:"negative"
        },
        {
            id: '3',
            title:"Hamburguer Gurmê",
            amount:"R$32,00",
            category:{
                name: 'Vendas',
                icon: 'shopping-bag'
            },
            date:"16/04/2021",
            type:"negative"
        }
    ]

    return (
        <Container>
            <Header>
                <UserWrapper> 
                    <UserInfo>
                        <Photo 
                            source={{ uri: 'https://penser.com.br/wp-content/uploads/2018/06/bom-exemplo-foto-para-linkedin.png' }} 
                        />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Felipe</UserName>
                        </User>
                    </UserInfo>
                    
                    <LogoutButton onPress={() => {}} >
                        <Icon name="power" />
                    </LogoutButton>

                </UserWrapper>
            </Header>
            
            <HighlighCards>
                <HighlightCard 
                    type="up"
                    title="Entradas"
                    amount="R$1.008,00"
                    lastTransaction="Última entrada dia 16 de abril"
                />
                <HighlightCard
                    type="down"
                    title="Saídas"
                    amount="R$522,76"
                    lastTransaction="Última saída dia 20 de abril"
                />
                <HighlightCard
                    type="total"
                    title="Total"
                    amount="R$487,24"
                    lastTransaction="01 a 31 de Abril"
                />
            </HighlighCards>

            <Transactions>
                <Title>Listagem</Title>

                <TransactionsList 
                    data={data}
                    keyExtractor={ item => item.id }
                    renderItem={({ item }) => <TransactionCard data={item} /> }
                />

            </Transactions>

        </Container>
    )
}

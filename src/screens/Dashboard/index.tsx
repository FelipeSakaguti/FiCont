import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
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
    Icon
} from './styles';

export function Dashboard(){
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
                    
                    <Icon name="power" />

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

        </Container>
    )
}

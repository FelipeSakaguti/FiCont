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
                <HighlightCard />
                <HighlightCard />
                <HighlightCard />
            </HighlighCards>

        </Container>
    )
}

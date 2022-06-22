import React from "react";
import { 
    Container,
    Header,
    TitleWrapper,
    Title,
    SigninTitle,
    Footer,
    FooterWrapper
} from "./styles";
import AppleSVG from '../../assets/apple.svg'
import GoogleSVG from '../../assets/google-icon.svg'
import LogoSVG from '../../assets/Finance.svg'
import { RFValue } from "react-native-responsive-fontsize";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";


export function Signin(){
    const {user} = useAuth()
    console.log(user)

    return(
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSVG width={RFValue(120)} height={RFValue(68)}/>
                    <Title>
                        Controle suas {'\n'} 
                        finanças de forma {'\n'}
                        muito simples
                    </Title>
                </TitleWrapper>
                <SigninTitle>
                    Faça seu login com {'\n'} 
                    uma das contas abaixo
                </SigninTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SignInSocialButton
                        title="Entrar com Google"
                        svg={GoogleSVG}
                    />
                    <SignInSocialButton
                        title="Entrar com Apple"
                        svg={AppleSVG}
                    />
                </FooterWrapper>
            </Footer>
        </Container>
    )
}
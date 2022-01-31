import styled from 'styled-components/native'
import {Feather} from '@expo/vector-icons'
import theme from '../../global/styles/theme';
import { RFValue } from 'react-native-responsive-fontsize';


export const Container = styled.View`
    background-color: ${(theme.colors.shape)};
    border-radius: 5px;
    padding: 17px 24px;
    margin-bottom: 16px;

`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${(theme.fonts.regular)};

`;

export const Amount = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${(theme.fonts.regular)};
    margin-top: 2px;
`;
export const Footer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 19px;
`;
export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${(theme.colors.text)};
`;
export const Category = styled.View`
    flex-direction: row;
    align-items: center;

`;
export const CategoryName = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${(theme.colors.text)};
    margin-left: 17px;
`;
export const Date = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${(theme.colors.text)};
`;
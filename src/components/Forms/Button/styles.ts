import styled from "styled-components/native";
import {RectButton} from 'react-native-gesture-handler'

import theme from "../../../global/styles/theme";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled<any>(RectButton)`
    width: 100%;
    background-color: ${(theme.colors.secondary)};
    border-radius: 5px;
    align-items: center;
    padding: 18px;
`;

export const Title = styled.Text`
    font-family: ${(theme.fonts.regular)};
    font-size: ${RFValue(14)}px;
    color: ${(theme.colors.shape)};
`;
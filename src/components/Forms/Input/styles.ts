import styled from "styled-components/native";
import {TextInput} from 'react-native'
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../../global/styles/theme";

export const Container = styled(TextInput)`
    width: 100%;
    padding: 16px 18px;
    font-size: ${RFValue(14)}px;
    font-family: ${(theme.fonts.regular)};
    color: ${(theme.colors.text_dark)};

    background-color: ${(theme.colors.shape)};

    border-radius: 5px;
    margin-bottom: 8px;
`;
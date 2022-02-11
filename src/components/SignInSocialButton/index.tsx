import React from "react";
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from "react-native-svg";

interface Props extends RectButtonProps {
    title: string;
    svg: React.FC<SvgProps>
}

export function SignInSocialButton() {
    return (
        <>
        </>
    );
}
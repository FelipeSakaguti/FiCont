import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

describe('Profile Screen', () => {

    it('should load correctly placeholder user input', () => {
        const { getByPlaceholderText } = render(<Profile />);

        expect(getByPlaceholderText('Nome')).toBeTruthy();
    });

    it('should load user data', () => {
        const { getByTestId } = render(<Profile />);

        const inputName = getByTestId('input-name');
        const inputSurname = getByTestId('input-surname');

        expect(inputName.props.value).toEqual("Felipe");
        expect(inputSurname.props.value).toEqual("Saka");
    });

    it('should render title correctly', () => {
        const { getByTestId } = render(<Profile />);

        const textTitle = getByTestId('text-title');

        expect(textTitle.props.children).toContain('Perfil');
    });

});

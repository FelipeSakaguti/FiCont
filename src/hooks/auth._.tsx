import { act, renderHook } from '@testing-library/react-hooks';
import {
    useAuth,
    AuthProvider
} from './auth';

jest.mock('expo-auth-session', () => {
    return {
        logInAsync: () => {
            return {
                type: 'success',
                user: {
                    id: 'any_id',
                    email: 'felipesakaguti@hotmail.com',
                    name: 'Felipe',
                    photo: 'any_photo.png'
                }
            }
        }
    }
});

describe('Auth Hook', () => {

    it('should be able do sign in with google account', async () => {
        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        await act(() => result.current.signInWithGoogle());

        expect(result.current.user)
            .toBe('felipesakaguti@hotmail.com');

    });

});

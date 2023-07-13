import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { Alert } from 'react-native';
import { UserContext } from '../store/user-context';

function SignupScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const authCtx = useContext(UserContext);

    async function signupHandler({ email, password }) {
        setIsLoading(true);

            try {
                // creeate user will return token
                const token = await createUser(email, password);
                authCtx.login(token);
            } catch (error) {
                Alert.alert(
                    'Failed to register user',
                    'Please try again!'
                );
                setIsLoading(false);
            }
    };

    if (isLoading) {
        return <LoadingOverlay message="Creating User..."/>
    }


  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
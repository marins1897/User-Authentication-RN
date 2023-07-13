import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { loginUser } from '../util/auth';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { Alert } from 'react-native';
import { UserContext } from '../store/user-context';

function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(UserContext);

    async function loginHandler({ email, password }) {
        setIsLoading(true);

            try {
                const token = await loginUser(email, password);
                authCtx.login(token);
            } catch (error) {
                Alert.alert(
                  'Authentication failed!',
                  'Please check your credentials'
                );
                setIsLoading(false);
            }
    };

    if (isLoading) {
        return <LoadingOverlay message="Logging User..."/>
    }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
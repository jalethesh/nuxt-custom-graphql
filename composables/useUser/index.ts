/* eslint-disable no-prototype-builtins */
import { computed, ref } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext, Logger } from '@vue-storefront/core';
import { useUser as baseUseUser } from '@vue-storefront/odoo';

const throwErrors = (errors: Array<{ message?: string }>) => {
  if (errors) {
    throw new Error(errors.map(error => error.message).join(',') || 'Some error');
  }
};


const useUser = () => {
  const context = useVSFContext();
  const loading = sharedRef(false, `useUser-loading`); 
  const error = ref({
    load: null,
    login: null
  });
  
  const {
    user,
    isAuthenticated,
    setUser,
    // login,
    logout,
    register
  } = baseUseUser();

  const load = async () => {
    try {
      loading.value = true;
      const currentUser = context.$cookies.get('odoo-user');
      if (currentUser) {
        const { data, errors } = await context.$odoo.api.loadUser();

        console.log('data.partner:', data.partner);
  
        throwErrors(errors)

        // user.value = data.partner
        setUser(data.partner);
      } else {
        // user.value = null;
        setUser(null);
      }
    } catch (err) {
      Logger.error('useUser/load', err.message);
      error.value.load = err.message;
    } finally {
      loading.value = false;
    }
  };

  const login = async ({ user: providedUser }) => {
    try {
      loading.value = true;

      const loginParams = {
        email: providedUser.username,
        password: providedUser.password
      }

      const { data, errors } = await context.$odoo.api.logInUser(loginParams);

      throwErrors(errors);

      context.$cookies.set('odoo-user', data.login.partner);
      setUser(data.login.partner);
    } catch (err) {
      Logger.error('useUser/login', err.message);
      error.value.login = err.message;
    } finally {
      loading.value = false;
    }
  }

  return {
    error,
    user,
    isAuthenticated,
    loading,
    load,
    login,
    logout,
    register
  }
}

export default useUser;
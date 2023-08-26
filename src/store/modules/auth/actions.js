export default {
  // Contains both logic for signup and login
  async auth(context, payload) {
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBbAOtH_4TKYqfjMI_IV9xIpj8vEqvnDg4';

    const mode = payload.mode;
    if (mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBbAOtH_4TKYqfjMI_IV9xIpj8vEqvnDg4';
    }

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    // Req Failure
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to authenticate.'
      );
      throw error;
    } else {
      // Req Succeeded
      localStorage.setItem('token', responseData.idToken); // Store values in local storage
      localStorage.setItem('userId', responseData.localId);
      localStorage.setItem('tokenExpiration', responseData.expiresIn);

      context.commit('setUser', {
        token: responseData.idToken,
        currentUserId: responseData.localId,
        tokenExpiration: responseData.expiresIn,
      });
    }
  },
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },
  // Dispatched when the app starts (App.vue file)
  tryAutoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        currentUserId: userId,
        tokenExpiration: tokenExpiration,
      });
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    context.commit('setUser', {
      currentUserId: null,
      token: null,
      tokenExpiration: null,
    });
  },
};

// Ensures we only have one timer active at a time
let timer;

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
      const expiresIn = responseData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;
      // Persistent items in local storage
      localStorage.setItem('token', responseData.idToken); // Store values in local storage
      localStorage.setItem('userId', responseData.localId);
      localStorage.setItem('tokenExpiration', expirationDate);

      // Expire tokens after certain duration
      timer = setTimeout(function () {
        context.dispatch('autoLogout');
      }, expiresIn);

      context.commit('setUser', {
        token: responseData.idToken,
        currentUserId: responseData.localId,
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

    // Find the difference between token expiration and current time
    const expiresIn = +tokenExpiration - new Date().getTime();

    // Token has expired
    if (expiresIn < 0) {
      return;
    }

    if (token && userId) {
      // Update global timer for token timeout
      timer = setTimeout(function () {
        context.dispatch('autoLogout');
      }, expiresIn);

      // Commit new token to state
      context.commit('setUser', {
        token: token,
        currentUserId: userId,
      });
    }
  },
  logout(context) {
    // Remove persistent items in localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    // Clear the current token timer
    clearTimeout(timer);

    // Commit changes to app state
    context.commit('setUser', {
      currentUserId: null,
      token: null,
    });
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },
};

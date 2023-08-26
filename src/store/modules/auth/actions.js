export default {
  async login(context, payload) {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBbAOtH_4TKYqfjMI_IV9xIpj8vEqvnDg4',
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );

    const responseData = await response.json();

    // Req Failure
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to authenticate.'
      );
      throw error;
    } else {
      // Req Succeeded
      context.commit('setUser', {
        token: responseData.idToken,
        currentUserId: responseData.localId,
        tokenExpiration: responseData.expiresIn,
      });
    }
  },
  async signup(context, payload) {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBbAOtH_4TKYqfjMI_IV9xIpj8vEqvnDg4',
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );

    const responseData = await response.json();

    // Req Failure
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to authenticate.'
      );
      throw error;
    } else {
      // Req Succeeded
      context.commit('setUser', {
        token: responseData.idToken,
        currentUserId: responseData.localId,
        tokenExpiration: responseData.expiresIn,
      });
    }
  },
  logout(context) {
    context.commit('setUser', {
      currentUserId: null,
      token: null,
      tokenExpiration: null,
    });
  },
};

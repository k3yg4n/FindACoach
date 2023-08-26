export default {
  login() {},
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
      console.log(responseData);
      const error = new Error(
        responseData.message || 'Failed to authenticate.'
      );
      throw error;
    }

    // Req Succeeded
    console.log(responseData);
    context.commit('setUser', {
      token: responseData.idToken,
      currentUserId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
};

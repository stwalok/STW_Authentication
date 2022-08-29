import {
    LOGIN_URL,
    ME_URL,
    REGISTER_URL,
    REQUEST_PASSWORD_URL
} from "../../app/modules/auth/_redux/_actions";
import userTableMock from "./userTableMock";

function mockAuth(mock:any) {
  mock.onPost(LOGIN_URL).reply((params: any) => {
    const { data } = params
    const { email, password } = JSON.parse(data);

    if (email && password) {
      const user = userTableMock.find(
        x =>
          x.email.toLowerCase() === email.toLowerCase() &&
          x.password === password
      );

      if (user) {
        return [200, { ...user, password: undefined }];
      }
    }

    return [400];
  });

  mock.onPost(REGISTER_URL).reply((data: any) => {
    const { email, fullname, username, password } = JSON.parse(data);

    if (email && fullname && username && password) {
        const user: any = {
            id: generateUserId(),
            email,
            fullname,
            username,
            password,
            roles: [2], // Manager
            accessToken: "access-token-" + Math.random(),
            refreshToken: "access-token-" + Math.random(),
            pic: process.env.PUBLIC_URL + "/media/users/default.jpg"
        };

        userTableMock.push(user);

        return [200, { ...user, password: undefined }];
    }

    return [400];
  });

  mock.onPost(REQUEST_PASSWORD_URL).reply((data:any) => {
    const { email } = JSON.parse(data);

    if (email) {
      const user = userTableMock.find(
        x => x.email.toLowerCase() === email.toLowerCase()
      );

      if (user) {
        user.password = '';

        return [200, { ...user, password: undefined }];
      }
    }

    return [400];
  });

  mock.onPost(ME_URL).reply((params: any) => {
      const {headers} = params
      console.log('headers', headers)
      const {Authorization} = headers
      const accessToken =
          Authorization &&
          Authorization.startsWith("Bearer ") &&
          Authorization.slice("Bearer ".length);

      if (accessToken) {
          const user = userTableMock.find(x => x.authToken === accessToken);

          if (user) {
              return [200, { ...user, password: undefined }];
          }
      }

      return [401];
  });

  function generateUserId() {
      const ids = userTableMock.map(el => el.id);
      const maxId = Math.max(...ids);
      return maxId + 1;
  }
  
}

export {mockAuth}

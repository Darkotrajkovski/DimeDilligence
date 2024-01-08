import {useEffect, useState} from 'react';
import {DefaultApi} from "../../generated-sources/openapi";
import {useAuth} from "../context/AuthContext.tsx";

const useApi = () => {
  const { token } = useAuth();
  const [api, setApi] = useState<DefaultApi>(null);
  const [requestConfig, setRequestConfig] = useState<Object>(null);

  useEffect(() => {
    if (!token) {
      return;
    }
      const instance = new DefaultApi({
        basePath: 'http://localhost:8080/v1',
      });

      const requestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      setApi(instance);
      setRequestConfig(requestConfig);

  }, [token]);

  return [api, requestConfig];
}
export default useApi;

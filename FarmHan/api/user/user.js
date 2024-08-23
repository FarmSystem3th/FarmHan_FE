import { useSetRecoilState } from "recoil";
import { exampleState } from "../../recoil/user/userRecoilState";
import { sendRequest } from "../request";
import { exampleInstance } from "../instance";

export const useExampleHook = () => {
    const setExampleState = useSetRecoilState(exampleState);
     const exampleGet = async (exampleData) => {
         const response = await sendRequest(exampleInstance, "get", "/", exampleData);
         setExampleState(response.data);
         //return 은 단지 잘 왔나 확인할 때 쓰는 용도
         return response;
    };

    return {
        exampleGet,
    }
};

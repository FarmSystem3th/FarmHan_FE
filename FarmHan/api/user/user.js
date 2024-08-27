import { useSetRecoilState } from "recoil";
import { userIdState } from "../../recoil/user/userRecoilState";
import { sendRequest } from "../request";
import { userInstance } from "../instance";

export const useUserHook = () => {
    const setUserIdState = useSetRecoilState(userIdState);
     const loginUser = async (loginId, loginPassword) => {
         try {
             const response = await sendRequest(userInstance, "post", "/login", {
                 loginId: loginId,
                 userPassword: loginPassword,
             });

             if (response.data.success) {
                 setUserIdState(response.data.responseDto.userId);
                 return true;
             }
         } catch (error) {
             console.error("Login failed:", error.message || "Unknown error");
             return false;
         }
    };

    return {
        loginUser,
    }
};

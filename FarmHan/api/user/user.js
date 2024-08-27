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

             console.log(response.data);

             if (response.data.success) {
                 setUserIdState(response.data.responseDto.userId);
                 return true;
             } else {
                 console.error("Login failed:", response.data?.message || "Unknown error");
                 return false;
             }
         } catch (error) {
             console.error("Error during login:", error);
             return false;
         }
    };

    return {
        loginUser,
    }
};

import { useSetRecoilState } from "recoil";
import { userIdState } from "../../recoil/user/userRecoilState";
import { sendRequest, createUrl } from "../request";
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

    const signUpUser = async (userData) => {
        const url = createUrl("/signup"); // 쿼리 파라미터 없이 단순 경로를 생성

        try {
            const response = await sendRequest(userInstance, "post", url, userData);
            console.log("회원가입 성공:", response.data);
            return response.data;
        } catch (error) {
            console.error("회원가입 실패:", error);
            throw error;
        }
    };

    const myPageUser = async (userId) => {
        const url = createUrl(`/mypage/${userId}`);

        try {
            const response = await sendRequest(userInstance, "get", url);
            console.log("마이페이지 조회 성공:", response.data);
            return response.data;
        } catch (error) {
            console.error("마이페이지 조회 실패:", error);
            throw error;
        }
    };

    return {
        loginUser,
        signUpUser,
        myPageUser,
    };
};

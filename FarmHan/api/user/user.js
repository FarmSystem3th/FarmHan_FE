import { useSetRecoilState } from "recoil";
import {callIdState, userIdState} from "../../recoil/user/userRecoilState";
import { sendRequest, createUrl } from "../request";
import { userInstance } from "../instance";

export const useUserHook = () => {
    const setUserIdState = useSetRecoilState(userIdState);
    const setCallIdState = useSetRecoilState(callIdState);

    const signUpUser = async (userData) => {
        const url = createUrl("/signup");

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

    const callListUser = async (userId) => {
        const url = createUrl(`/mypage/call-list/${userId}`);

        try {
            const response = await sendRequest(userInstance, "get", url);
            console.log("대화내역 조회 성공:", response.data);
            return response.data;
        } catch (error) {
            console.error("대화내역 조회 실패:", error);
            throw error;
        }
    };

    const callStart = async (userId) => {
        const url = createUrl(`/call/start/${userId}`);

        try {
            const response = await sendRequest(userInstance, "post", url);
            console.log(response.data.responseDto);
            setCallIdState(response.data.responseDto.callId);
        } catch (error) {
            console.log(error);
        }
    };

    const callIng = async (userId, messageQuestion, callId) => {
        const url = createUrl(`/call`);
        try {
            const response = await sendRequest(userInstance, "post", url, {
                userId: userId,
                messageQuestion: messageQuestion,
                callId: callId,
            });

            return response.data.responseDto.messageAnswer;
        } catch (error) {
            console.log(error);
        }
    };

    return {
        loginUser,
        signUpUser,
        myPageUser,
        callListUser,
        callStart,
        callIng,
    };
};

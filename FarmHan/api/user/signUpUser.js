import { sendRequest, createUrl } from "../request";
import { userInstance } from "../instance"; // instance.js에서 가져옴

// 회원가입 요청 함수
export const signUpUser = async (userData) => {
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

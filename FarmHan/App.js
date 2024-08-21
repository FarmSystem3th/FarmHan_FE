import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Navigation from "./Navigation";

export default function App() {
    // // Expo 푸시 알림 설정 및 권한 요청
    // const [expoPushToken, setExpoPushToken] = useState("");
    // const [notification, setNotification] = useState(false);
    // const notificationListener = useRef();
    // const responseListener = useRef();

    // useEffect(() => {
    //     registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    //     // 앱이 포그라운드에 있을 때 수신한 알림 처리
    //     notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
    //         setNotification(notification);
    //     });

    //     // 사용자가 알림을 탭했을 때 처리
    //     responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
    //         console.log(response);
    //     });

    //     return () => {
    //         Notifications.removeNotificationSubscription(notificationListener.current);
    //         Notifications.removeNotificationSubscription(responseListener.current);
    //     };
    // }, []);

    //// Expo 푸시 토큰 서버로 전송
    // const sendPushTokenToServer = async (token) => {
    //     await fetch("https://your-server.com/store-token", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ token }),
    //     });
    // };

    return <Navigation />;
}

// async function registerForPushNotificationsAsync() {
//     let token;
//     if (Device.isDevice) {
//         const { status: existingStatus } = await Notifications.getPermissionsAsync();
//         let finalStatus = existingStatus;
//         if (existingStatus !== "granted") {
//             const { status } = await Notifications.requestPermissionsAsync();
//             finalStatus = status;
//         }
//         if (finalStatus !== "granted") {
//             alert("Failed to get push token for push notification!");
//             return;
//         }
//         token = (await Notifications.getExpoPushTokenAsync()).data;
//         console.log(token);
//     } else {
//         alert("Must use physical device for Push Notifications");
//     }

//     return token;
// }

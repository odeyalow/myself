export default {
  expo: {
    name: "myself!",
    slug: "myself",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    plugins: [
      "expo-router",
      "expo-font",
      [
        "expo-splash-screen",
        {
          image: "./assets/icons/app/default.png",
          imageWidth: 220,
          resizeMode: "contain",
          backgroundColor: "#141414"
        }
      ]
    ],
    splash: {
      resizeMode: "contain",
      image: "./assets/icons/app/default.png",
      backgroundColor: "#141414"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#141414"
      },
      edgeToEdgeEnabled: true
    },
    extra: {
      router: {}
    },
    experiments: {
      typedRoutes: true
    }
  }
};

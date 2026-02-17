import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";

import HomeIcon from "@/assets/icons/tab/home.svg";
import HomeFillIcon from "@/assets/icons/tab/home_fill.svg";
import SearchIcon from "@/assets/icons/tab/search.svg";
import SearchFillIcon from "@/assets/icons/tab/search_fill.svg";
import ProfileIcon from "@/assets/icons/tab/profile.svg";
import ProfileFillIcon from "@/assets/icons/tab/profile_fill.svg";
import {
  AnimatedTabIcon,
  AnimatedTabLabel,
  SpringTabButton,
  TAB_BAR_STYLE,
} from "@/components/ui/animatedTabBar";

export default function TabsLayout() {
  const { t } = useTranslation("common");

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: (props) => <SpringTabButton {...props} />,
        tabBarStyle: TAB_BAR_STYLE,
        // tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t("tabs.home"),
          tabBarLabel: ({ focused }) => (
            <AnimatedTabLabel focused={focused}>{t("tabs.home")}</AnimatedTabLabel>
          ),
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon
              focused={focused}
              activeIcon={HomeFillIcon}
              inactiveIcon={HomeIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: t("tabs.search"),
          tabBarLabel: ({ focused }) => (
            <AnimatedTabLabel focused={focused}>{t("tabs.search")}</AnimatedTabLabel>
          ),
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon
              focused={focused}
              activeIcon={SearchFillIcon}
              inactiveIcon={SearchIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t("tabs.profile"),
          tabBarLabel: ({ focused }) => (
            <AnimatedTabLabel focused={focused}>{t("tabs.profile")}</AnimatedTabLabel>
          ),
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon
              focused={focused}
              activeIcon={ProfileFillIcon}
              inactiveIcon={ProfileIcon}
            />
          ),
        }}
      />
    </Tabs>
  );
}

import { memo } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { WebView } from 'react-native-webview';

type LogoAnimatedProps = {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

const LOGO_ANIMATED_HTML = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
    />
    <style>
      html,
      body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: transparent;
      }

      #root {
        width: 100%;
        height: 100%;
      }

      svg {
        width: 100%;
        height: 100%;
        display: block;
      }

      #element-1,
      #element-2,
      #element-3 {
        transform-box: fill-box;
        transform-origin: center;
      }

      #element-1 {
        animation: seq1 1.5s cubic-bezier(0.16, 1, 0.3, 1) infinite;
      }

      #element-2 {
        animation: seq2 1.5s cubic-bezier(0.16, 1, 0.3, 1) infinite;
      }

      #element-3 {
        animation: seq3 1.5s cubic-bezier(0.16, 1, 0.3, 1) infinite;
      }

      @keyframes seq1 {
        0% {
          opacity: 1;
          transform: scale(1);
        }

        20% {
          opacity: 0.5;
          transform: scale(0.85);
        }

        60% {
          opacity: 0.5;
          transform: scale(0.85);
        }

        100% {
          opacity: 1;
          transform: scale(1);
        }
      }

      @keyframes seq2 {
        0% {
          opacity: 1;
          transform: scale(1);
        }

        20% {
          opacity: 1;
          transform: scale(1);
        }

        40% {
          opacity: 0.5;
          transform: scale(0.85);
        }

        60% {
          opacity: 0.5;
          transform: scale(0.85);
        }

        100% {
          opacity: 1;
          transform: scale(1);
        }
      }

      @keyframes seq3 {
        0% {
          opacity: 1;
          transform: scale(1);
        }

        40% {
          opacity: 1;
          transform: scale(1);
        }

        60% {
          opacity: 0.5;
          transform: scale(0.85);
        }

        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
    </style>
  </head>
  <body>
    <div id="root">
      <svg viewBox="0 0 1025 1172.11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 0L945.387 0L424.284 491.285L605.223 491.285L512.5 949.074L0 0Z"
          fill="rgb(255, 255, 255)"
          fill-rule="evenodd"
          id="element-1"
        ></path>
        <path
          d="M605.223 424.292L945.387 94.9073L1025 424.292L909.199 424.292L550.463 949.074L728.261 424.292L605.223 424.292Z"
          fill="rgb(255, 255, 255)"
          fill-rule="evenodd"
          id="element-2"
        ></path>
        <path
          d="M728.743 1172.11C728.743 1172.11 635.88 987.036 531.482 987.036C427.083 987.036 334.22 1172.11 334.22 1172.11L728.743 1172.11Z"
          fill="rgb(255, 255, 255)"
          fill-rule="evenodd"
          id="element-3"
        ></path>
      </svg>
    </div>
  </body>
</html>
`;

const LogoAnimated = ({ width = 160, height = 183, style }: LogoAnimatedProps) => {
  return (
    <View style={[styles.container, { width, height }, style]} pointerEvents="none">
      <WebView
        source={{ html: LOGO_ANIMATED_HTML }}
        originWhitelist={['*']}
        javaScriptEnabled={false}
        scrollEnabled={false}
        bounces={false}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        androidLayerType="hardware"
        style={styles.webView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  webView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default memo(LogoAnimated);

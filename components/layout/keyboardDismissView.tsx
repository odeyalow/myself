import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

const KeyboardDismissView = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className={className}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default KeyboardDismissView;

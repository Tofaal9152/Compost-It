import { useColorScheme } from "~/src/lib/useColorScheme";
import { Switch } from "~/src/components/ui/switch";

const DarkModeSwitch = () => {
  const { isDarkColorScheme, toggleColorScheme } = useColorScheme();
  return (
    <Switch
      checked={isDarkColorScheme}
      onCheckedChange={toggleColorScheme}
      className="dark:bg-[#0F5329] bg-green-100"
    />
  );
};

export default DarkModeSwitch;

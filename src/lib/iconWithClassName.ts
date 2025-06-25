import type { LucideIcon } from "lucide-react-native";
import {
  Ban,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  LogOut,
  Mail,
  MapPin,
  MessageCircle,
  Pencil,
  Phone,
  Settings,
  Shield,
} from "lucide-react-native";
import { cssInterop } from "nativewind";

function iconWithClassName(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}

const icons = [
  Ban,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  LogOut,
  Mail,
  MapPin,
  MessageCircle,
  Pencil,
  Phone,
  Settings,
  Shield,
];
icons.forEach(iconWithClassName);

export const Icons = {
  Ban,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  LogOut,
  Mail,
  MapPin,
  MessageCircle,
  Pencil,
  Phone,
  Settings,
  Shield,
};

import HouseholdScreen from "~/src/components/screens/tabs/home/household/HouseholdScreen";
import { useAuthStore } from "~/src/store/authStore";
import CompanyPlusRiderScreen from "./companyplusrider/CompanyPlusRiderScreen";
const RoleBasedRender = () => {
  const { role } = useAuthStore();

  return role === "household" ? (
    <HouseholdScreen />
  ) : (
    <CompanyPlusRiderScreen />
  );
};

export default RoleBasedRender;

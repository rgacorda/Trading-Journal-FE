import { Toaster } from "sonner";
import { ChangePassword } from "./components/ChangePassword";
import { DeleteAccount } from "./components/DeleteAccount";
import { ProfileInfo } from "./components/ProfileInfo";


function UserProfile() {
  return (
    <div>
      <div className="px-4 py-8 max-w-4xl">
        {/* Main Content */}
        <div className="space-y-8">
          <ProfileInfo />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ChangePassword />
            <DeleteAccount />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default UserProfile;
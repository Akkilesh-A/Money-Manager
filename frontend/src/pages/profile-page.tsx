import { SideBarWrapper } from "@/components";
import { Card, H1, H2, Label, Button, CardContent } from "@/components/ui/";
import { useSelector } from "react-redux";
import { Camera, Mail, Phone, Wallet, Target, Pencil } from "lucide-react";

const ProfilePage = () => {
  const userData = useSelector((state: any) => state.user.userData);

  return (
    <SideBarWrapper className="space-y-4">
      <H1>Profile</H1>
      <Card className="max-w-2xl p-8">
        <CardContent className="flex flex-col md:flex-row gap-8 items-center">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={
                  userData.imgURL ||
                  "https://res.cloudinary.com/djeplonq5/image/upload/v1736918977/Default_Avatar_ey03ef.png"
                }
                className="bg-white w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
                alt="Profile"
              />
              <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-50">
                <Camera className="w-5 h-5 text-gray-600" />
              </div>
            </div>
            <H2>{userData.name}</H2>
          </div>

          {/* Profile Details Section */}
          <div className="flex-1 space-y-6">
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Email</Label>
                <div className="flex items-center gap-2 bg-muted/50 p-3 rounded-lg">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{userData.email}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground">Phone</Label>
                <div className="flex items-center gap-2 bg-muted/50 p-3 rounded-lg">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{userData.phoneNumber}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">
                    Wallet Balance
                  </Label>
                  <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg">
                    <Wallet className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-700">
                      ₹{userData.walletBalance}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">
                    Monthly Budget
                  </Label>
                  <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-700">
                      ₹{userData.monthlyBudget}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button variant="outline">
                <Pencil className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </SideBarWrapper>
  );
};

export default ProfilePage;

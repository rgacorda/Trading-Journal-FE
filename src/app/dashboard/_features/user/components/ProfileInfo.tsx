import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Save, Edit3, User, Loader2 } from "lucide-react";
import { getUser, updateUser } from "@/actions/users/user";
import { useUserStore } from "@/stores/user-store";
import { AxiosError } from "axios";

export function ProfileInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: ""
  });
  const [originalData, setOriginalData] = useState({
    firstname: "",
    lastname: "",
    email: ""
  });

  const setUser = useUserStore((s) => s.setUser);
  const currentUser = useUserStore((s) => s.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const userData = await getUser();
        const data = {
          firstname: userData.firstname || "",
          lastname: userData.lastname || "",
          email: userData.email || ""
        };
        setFormData(data);
        setOriginalData(data);

        // Update user store with full user data
        setUser({
          firstname: userData.firstname || "",
          lastname: userData.lastname || "",
          middlename: userData.middlename || null,
          email: userData.email || "",
          phone: userData.phone || "",
          avatar: "",
          role: userData.role || "free"
        });
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        toast.error(error.response?.data?.message || "Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [setUser]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const updatedData = await updateUser({
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email
      });

      setOriginalData(formData);
      setIsEditing(false);

      // Update user store with the new data
      setUser({
        ...currentUser,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        middlename: currentUser?.middlename || null,
        phone: currentUser?.phone || "",
        avatar: currentUser?.avatar || "",
        role: currentUser?.role || "free"
      });

      toast.success("Profile updated successfully");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(originalData);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Profile Information
        </CardTitle>
        {!isEditing && (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Personal Information Section */}
            <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  id="firstname"
                  value={formData.firstname}
                  onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  id="lastname"
                  value={formData.lastname}
                  onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            {isEditing && (
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSave} size="sm" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={handleCancel} size="sm" disabled={isSaving}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
        )}
      </CardContent>
    </Card>
  );
}
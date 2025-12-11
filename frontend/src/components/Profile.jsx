import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-8 p-8 shadow-lg">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-6">
            <Avatar className="h-28 w-28 border-4 border-[#6A38C2] shadow-md">
              <AvatarImage
                src={
                  user?.profile?.profilePhoto ||
                  "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                }
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {user?.fullname}
              </h1>
              <p className="text-gray-600 mt-1">
                {user?.profile?.bio || "No bio added"}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="p-3 rounded-full hover:bg-[#F3E8FF] border-[#6A38C2] text-[#6A38C2]"
          >
            <Pen className="w-5 h-5" />
          </Button>
        </div>

        
        <div className="flex flex-col md:flex-row md:justify-between gap-4 mt-6 text-gray-700">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-[#6A38C2]" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="w-5 h-5 text-[#6A38C2]" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        
        <div className="mt-6">
          <Label className="font-bold text-gray-800 text-lg mb-2 block">
            Skills
          </Label>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length ? (
              user.profile.skills.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-[#6A38C2]/20 text-[#6A38C2] border-none"
                >
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-400">No skills added</span>
            )}
          </div>
        </div>

        
        <div className="mt-6">
          <Label className="font-bold text-gray-800 text-lg mb-2 block">
            Resume
          </Label>
          {user?.profile?.resume ? (
            <a
              href={user.profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6A38C2] hover:underline font-medium"
            >
              {user.profile.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-400">No resume uploaded</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl my-8 p-6 shadow-lg">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;

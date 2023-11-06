import { UserContext } from "../../../Context";
import { useContext } from "react";
import { Avatar, Typography } from "@mui/material";
import {
  Person2Outlined,
  Person,
  Person2,
  Person2TwoTone,
} from "@mui/icons-material";

const UserProfileDisplay = ({ docked }) => {
  const [userContext] = useContext(UserContext);

  return (
    <div
      className={
        "flex flex-col justify-items-center text-gray-900 content-center items-center " +
        "bg-gradient-to-r  " +
        "h-[10rem] mx-5 space-y-5 mt-4 pt-2 " +
        (docked && "hover:from-blue-200 hover:via-blue-200 hover:to-blue-100")
      }
    >
      <Avatar sx={{ m: 1, bgcolor: "#e2725b" }}>
        {/* <FingerprintOutlined /> */}
        <Person2 sx={{ color: "#FFFFFF" }} />
      </Avatar>
      <Typography component="h6" height={10} hidden={!docked}>
        {userContext.email}
      </Typography>
      <Typography component="h6" variant="h7" hidden={!docked}>
        {userContext.sub}
      </Typography>
    </div>
  );
};

export default UserProfileDisplay;

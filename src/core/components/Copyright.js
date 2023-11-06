import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {/* <Link color="inherit" href="https://sydamo.com/"> */}
      <Link color="inherit" href="#">
        Sydamo
      </Link>{" "}
      {(new Date("2023")).getFullYear()}
      {"."}
    </Typography>
  );
}

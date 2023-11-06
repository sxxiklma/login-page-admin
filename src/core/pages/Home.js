import { Button } from "@mui/material";
import { Context, UserContext } from "../../Context";
import { useContext } from "react";

const Home = () => {
  const [context, setContext] = useContext(Context);
  const [userContext, setUserContext] = useContext(UserContext);

  return (
    <div className="mt-5 ml-6">
      <p>
        ewkrjrrrrrrrrrrrrrrrrrrrrrrkjjjjjjjjjjjjjjjjjjj
        wernwjhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
        wrejkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
        werjjkkkkkkkkkkkkkkkkkkkkkkkkkgffggggggggggggggggggggggg
        fgfffffffffffffffffffffffffff
        hjgggggggggggggggggggggggtyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
        trrrrrrrrrrrrrrrrr
      </p>
      <Button
        onClick={() => {
          setContext(["ley", "lah"]);
          setUserContext({});
        }}
      >
        Test
      </Button>
    </div>
  );
};

export default Home;

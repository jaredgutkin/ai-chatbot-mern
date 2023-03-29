import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userCheckTkn } from "../api/UserApi.js";
import Loading from "./Loading,jsx";
import Header from "./Header.jsx";

const AuthRoute = (props) => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            setIsLoading(true);

            const { response, err } = await userCheckTkn();

            if (err) {
                localStorage.removeItem("tkn");
                setIsLoading(false);
            }

            if (response) navigate("/");
        };

        const tkn = localStorage.getItem("tkn");

        if (tkn) checkToken();
        else setIsLoading(false);
    }, [navigate]);
    
  return (
    isLoading ? (
        <Loading />
    ) : (
        <Container>
            <Header>
                <Typography>
                    AI Chat
                </Typography>
            </Header>

            <Box>
                {props.children}
            </Box>

            <Box>
                <Typography>
                    MiMi
                </Typography>
            </Box>
        </Container>
    )
  )
}

export default AuthRoute
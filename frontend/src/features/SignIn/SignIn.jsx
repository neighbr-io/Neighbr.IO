import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { authEventEmitter } from "../../app/eventEmitter";

const defaultTheme = createTheme();

const AuthForm = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("SignIn"); // Track whether we are in "SignIn" or "Register" mode

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const endpoint = mode === "SignIn" ? "/api/auth" : "/api/users/register";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to process request");
      }

      const result = await response.json();
      if (mode === "SignIn") {
        localStorage.setItem("bearerToken", result.token);
        authEventEmitter.dispatchEvent(new CustomEvent("authChange", { detail: { isAuthenticated: true } }));
        navigate("/projects");
      } else {
        console.log("Registration successful");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "SignIn" ? "Register" : "SignIn"));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {mode === "SignIn" ? "Sign In" : "Register"}
          </Typography>
          
          <button
                type="button"
                onClick={toggleMode}
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  color: "blue",
                  textDecoration: "underline",
                  width: "100%",
                }}
              >
                {mode === "SignIn"
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign In."}
              </button>



          
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* {mode === "SignIn" && (
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            )} */}
            <Box mt={2} sx={{ alignSelf: "stretch" }}>
              {" "}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mb: 2 }}
              >
                {mode === "SignIn" ? "Sign In" : "Register"}
              </Button>

            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AuthForm;
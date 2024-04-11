import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "../Dashboard/authSlice"; // Import the RTK Query hooks

const defaultTheme = createTheme();

const AuthForm = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("SignIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // RTK Query mutation hooks
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailRegex = /\S+@\S+\.\S+/;

    if (!email || !emailRegex.test(email)) {
      setEmailError(true);
    }

    if (!password) {
      setPasswordError(true); // Set password error if it's empty
    }

    // If there's an error with either email or password, stop the form submission
    if (!email || !emailRegex.test(email) || !password) {
      return;
    }

    try {
      if (mode === "SignIn") {
        // Use the RTK Query mutation for login
        const result = await login({ email, password }).unwrap();
        // Store token and navigate on successful login
        localStorage.setItem("bearerToken", result.token); // Consider more secure storage options
        navigate("/projects");
      } else {
        // Use the RTK Query mutation for registration
        await register({ email, password }).unwrap();
        // Handle post-registration logic (e.g., showing a success message)
        console.log("Registration successful");
        setMode("SignIn"); // Optionally switch to SignIn mode after registration
      }
    } catch (error) {
      console.error("Error:", error);
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
              error={emailError}
              helperText={emailError ? "Email is required" : ""}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box mt={2} sx={{ alignSelf: "stretch" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mb: 2 }}
              >
                {mode === "SignIn" ? "Sign In" : "Register"}
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mb: 2 }}
              >
                Continue With Google
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AuthForm;
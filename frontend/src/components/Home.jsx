import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Button, IconButton, TextField } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../contexts/AuthContext";

function HomeComponent() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const { addToUserHistory } = useContext(AuthContext);

  const handleJoinVideoCall = async () => {
    if (!meetingCode.trim()) return alert("Please enter a meeting code");
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <div className="homeContainer">
      {/* ================= NAVBAR ================= */}
      <nav className="homeNavbar">
        <h2 className="logoText">VideoCall</h2>

        <div className="navActions">
          <div
            className="historyIcon"
            onClick={() => navigate("/history")}
            role="button"
          >
            <IconButton color="primary">
              <RestoreIcon sx={{ color: "#fff" }} />
            </IconButton>
            <span>History</span>
          </div>

          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              ml: 2,
            }}
          >
            Logout
          </Button>
        </div>
      </nav>

      {/* ================= MAIN SECTION ================= */}
      <div className="homeMain">
        <div className="homeLeft">
          <h1>
            Providing <span className="highlight">Quality Video Calls</span>{" "}
            just like Quality Education
          </h1>
          <p className="subtitle">
            Connect instantly and securely with anyone, anywhere.
          </p>

          <div className="joinSection">
            <TextField
              label="Enter Meeting Code"
              variant="outlined"
              value={meetingCode}
              onChange={(e) => setMeetingCode(e.target.value)}
              InputLabelProps={{
                style: { color: "#ffb74d" },
              }}
              sx={{
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ff9800" },
                  "&:hover fieldset": { borderColor: "#ffa726" },
                  "&.Mui-focused fieldset": { borderColor: "#fb8c00" },
                },
                width: "260px",
              }}
            />
            <Button
              onClick={handleJoinVideoCall}
              variant="contained"
              sx={{
                backgroundColor: "#ff9800",
                "&:hover": { backgroundColor: "#f57c00" },
                fontWeight: 600,
                px: 4,
                py: 1.3,
                borderRadius: 2,
                fontSize: "1rem",
              }}
            >
              Join
            </Button>
          </div>
        </div>

        <div className="homeRight">
          <img src="/logo3.png" alt="Video call preview" />
        </div>
      </div>
    </div>
  );
}

export default withAuth(HomeComponent);

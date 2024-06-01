import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Badge, Avatar, Stack } from "@mui/material";
import { red } from "@mui/material/colors";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const StyledInactiveBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#b12812",
    color: "#b12812",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""',
    },
  },
}));

const StyledProgressBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#129ab1",
    color: "#129ab1",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""',
    },
  },
}));

export default function CustomAvatar({ payload }) {
  const [userName, setUserName] = useState("S P");

  const nameDeterminer = (payload) => {
    // console.log(payload)
    let username = "S P";
    if (payload.name !== undefined) {
      setUserName(payload.name);
    } else if (payload.first_name !== undefined) {
      username = payload.first_name + " " + payload.surname;
      setUserName(username);
    } else {
      setUserName(payload.stakeholder_name);
    }
  };

  function statusDeterminer(payload) {
    let status;
    if (payload.status === undefined) {
      status = payload.is_active;
    } else {
      status = payload.status;
    }
    return status;
  }
  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name) {
    if (name.includes(" ")) {
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
      };
    } else {
      return {
        sx: {
          bgcolor: stringToColor("S P"),
        },
        children: `SP`,
      };
    }
  }
  useEffect(() => {
    nameDeterminer(payload);
    console.log(statusDeterminer(payload))
  }, []);

  return (
    <Stack direction="row" spacing={2}>
      {statusDeterminer(payload) === "ACTIVE" && (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            sx={{ bgcolor: red[500] }}
            {...stringAvatar(userName)}
            aria-label="initial"
          />
        </StyledBadge>
      )}
      {statusDeterminer(payload) === undefined && (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            sx={{ bgcolor: red[500] }}
            {...stringAvatar(userName)}
            aria-label="initial"
          />
        </StyledBadge>
      )}
      {statusDeterminer(payload) === "DEACTIVATED" && (
        <StyledInactiveBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            sx={{ bgcolor: red[500] }}
            {...stringAvatar(userName)}
            aria-label="initial"
          />
        </StyledInactiveBadge>
      )}
      {statusDeterminer(payload) === false && (
        <StyledInactiveBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            sx={{ bgcolor: red[500] }}
            {...stringAvatar(userName)}
            aria-label="initial"
          />
        </StyledInactiveBadge>
      )}
    </Stack>
  );
}

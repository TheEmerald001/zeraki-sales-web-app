import React from "react";
import {
  Modal,
  Box,
  useTheme,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const UserAccountModal = ({
  openUserAccountModal,
  closeUserAccountModal,
}) => {
  const theme = useTheme();

  const handleClose = () => {
    closeUserAccountModal();
  };

  return (
    <Modal open={openUserAccountModal} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          border: 2,
          borderRadius: 2,
          borderColor: `${theme.palette.primary.main}`,
          elevation: 24,
          p: 2,
        }}
      >
        <Stack alignItems="flex-end" justifyContent="flex-end">
          <IconButton onClick={handleClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Stack>
        <Typography
          textAlign="center"
          fontWeight="500"
          sx={{ p: 5, mt: -2 }}
        >
          Manage Account Profile(coming soon...)
        </Typography>
      </Box>
    </Modal>
  );
};

export default UserAccountModal;

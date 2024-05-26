import React, {useState} from "react";
import {Modal, Box, Grid } from "@mui/material";
import Buttons from "components/Buttons";
import CustomTextField from "components/CustomTextField";

const DonerRegistrationTab = ({ openModal, handleCloseModal }) => {
  const [mohCount, setMohCount] = useState(1);
  const [personCount, setPersonCount] = useState(1);
  const [sponsorCount, setSponsorCount] = useState(1);

  const labelStyle = {
    fontWeight: "bold",
    color: "black",
    fontSize: "16px",
    marginTop: "16px",
  };

  const handleClickAddMoh = () => {
    setMohCount((prevCount) => prevCount + 1);
  };

  const handleClickAddPerson = () => {
    setPersonCount((prevCount) => prevCount + 1);
  };

  const handleClickAddSponsor = () => {
    setSponsorCount((prevCount) => prevCount + 1);
  };

  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-titel"
      aria-describedby="model-model-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 600,
          bgcolor: "#fff",
          borderRadius: "20px",
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
        }}
      >
        <h2 id="modal-modal-titel">Create Health Camp</h2>

        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Camp ID"
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <label style={labelStyle} htmlFor="Add Location name">
            Add Location Name
          </label>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={2.5}>
              <CustomTextField
                select
                label="Province"
                variant="outlined"
                fullWidth
              >
                {/* Province options */}
              </CustomTextField>
            </Grid>
            <Grid item xs={2.5}>
              <CustomTextField
                select
                label="District"
                variant="outlined"
                fullWidth
              >
                {/* District options */}
              </CustomTextField>
            </Grid>
            <Grid item xs={2.5}>
              <CustomTextField
                select
                label="Town"
                variant="outlined"
                fullWidth
              >
                {/* Town options */}
              </CustomTextField>
            </Grid>
            {[...Array(mohCount)].map((_, index) => (
              <Grid item xs={2.5} key={index}>
                <CustomTextField
                  select
                  label={`MOH ${index + 1}`}
                  variant="outlined"
                  fullWidth
                >
                  {/* MOH options */}
                </CustomTextField>
              </Grid>
            ))}
            <Box sx={{ mt: 2 }}>
              <Buttons onClick={handleClickAddMoh} label="Add another MOH" />
            </Box>
          </Grid>
        </Box>

        <Box sx={{ mt: 3 }}>
          
          <label style={labelStyle} htmlFor="Add Location name">
          Camp Contact Persons
          </label>
        </Box>
        {[...Array(personCount)].map((_, index) => (
          <Box key={index} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <CustomTextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextField
                  label="Mobile Number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        ))}
        <Box sx={{ mt: 2 }}>
          <Buttons onClick={handleClickAddPerson} label="Add another Person" />
        </Box>

        <Box sx={{ mt: 3 }}>
    
          <label style={labelStyle} htmlFor="Add Location name">
            Add Camp Activities
          </label>
        </Box>
        <Box sx={{ mt: 3 }}>
          <CustomTextField
            label="Add Camp Activities"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 3 }}>
        <label style={labelStyle} htmlFor="Add Location name">
            Add Sponser 
          </label>
        </Box>
        {[...Array(sponsorCount)].map((_, index) => (
          <Box key={index} sx={{ mt: 2 }}>
            <CustomTextField
              label={`Sponsor ${index + 1}`}
              variant="outlined"
              fullWidth
            />
          </Box>
        ))}
        <Box sx={{ mt: 2 }}>
          <Buttons onClick={handleClickAddSponsor} label="Add Another Sponsor" />
        </Box>

        <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
          <Buttons onClick={handleClick} label="Create Health Camp" />
        </Box>
      </Box>
    </Modal>
  );
};

export default DonerRegistrationTab;
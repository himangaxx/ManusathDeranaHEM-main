import { Dialog, Box, DialogContent, DialogTitle, DialogActions, IconButton,
    CircularProgress,Button, MenuItem, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CustomTextField from 'components/CustomTextField';
import { useTheme } from "@mui/material/styles";
import { useAddDeranaDaruwoProgramMutation } from "state/api";
import { Alert, Snackbar } from "@mui/material";


const sriLankanData = {
    "Western": {
        "Colombo": ["Colombo 1", "Colombo 2", "Colombo 3", "Colombo 4", "Colombo 5", "Colombo 6", "Colombo 7", "Colombo 8", "Colombo 9", "Colombo 10", "Colombo 11", "Colombo 12", "Colombo 13", "Colombo 14", "Colombo 15"],
        "Gampaha": ["Negombo", "Gampaha", "Veyangoda", "Wattala", "Minuwangoda", "Ja-Ela", "Kadawatha", "Ragama", "Divulapitiya", "Nittambuwa", "Kiribathgoda"],
        "Kalutara": ["Kalutara", "Panadura", "Horana", "Beruwala", "Aluthgama", "Matugama", "Wadduwa", "Bandaragama", "Ingiriya"]
      },
      "Central": {
        "Kandy": ["Kandy", "Gampola", "Nawalapitiya", "Peradeniya", "Akurana", "Kadugannawa", "Katugastota"],
        "Matale": ["Matale", "Dambulla", "Sigiriya", "Nalanda", "Ukuwela", "Rattota"],
        "Nuwara Eliya": ["Nuwara Eliya", "Hatton", "Nanu Oya", "Talawakele", "Bandarawela", "Welimada"]
      },
      "Southern": {
        "Galle": ["Galle", "Hikkaduwa", "Ambalangoda", "Elpitiya", "Bentota", "Baddegama"],
        "Matara": ["Matara", "Weligama", "Mirissa", "Akurugoda", "Hakmana", "Devinuwara"],
        "Hambantota": ["Hambantota", "Tangalle", "Tissamaharama", "Ambalantota", "Beliatta", "Weeraketiya"]
      },
      "Northern": {
        "Jaffna": ["Jaffna", "Nallur", "Chavakachcheri", "Point Pedro", "Karainagar", "Velanai"],
        "Kilinochchi": ["Kilinochchi", "Pallai", "Paranthan", "Poonakary"],
        "Mannar": ["Mannar", "Nanattan", "Madhu", "Pesalai"],
        "Vavuniya": ["Vavuniya", "Nedunkeni", "Settikulam", "Vavuniya South"],
        "Mullaitivu": ["Mullaitivu", "Oddusuddan", "Puthukudiyiruppu", "Weli Oya"]
      },
      "Eastern": {
        "Trincomalee": ["Trincomalee", "Kinniya", "Mutur", "Kuchchaveli"],
        "Batticaloa": ["Batticaloa", "Kaluwanchikudy", "Valachchenai", "Eravur"],
        "Ampara": ["Ampara", "Akkaraipattu", "Kalmunai", "Sainthamaruthu", "Pottuvil"]
      },
      "North Western": {
        "Kurunegala": ["Kurunegala", "Kuliyapitiya", "Narammala", "Wariyapola", "Pannala", "Melsiripura"],
        "Puttalam": ["Puttalam", "Chilaw", "Wennappuwa", "Anamaduwa", "Nattandiya", "Dankotuwa"]
      },
      "North Central": {
        "Anuradhapura": ["Anuradhapura", "Kekirawa", "Thambuttegama", "Eppawala", "Medawachchiya"],
        "Polonnaruwa": ["Polonnaruwa", "Kaduruwela", "Medirigiriya", "Hingurakgoda"]
      },
      "Uva": {
        "Badulla": ["Badulla", "Bandarawela", "Haputale", "Welimada", "Mahiyanganaya", "Passara"],
        "Monaragala": ["Monaragala", "Bibile", "Wellawaya", "Medagama", "Buttala"]
      },
      "Sabaragamuwa": {
        "Ratnapura": ["Ratnapura", "Embilipitiya", "Balangoda", "Pelmadulla", "Eheliyagoda", "Kuruwita"],
        "Kegalle": ["Kegalle", "Mawanella", "Warakapola", "Rambukkana", "Galigamuwa"]
      }
};

const ProgramModal = ({ openModal, closeModal }) => {
  const theme = useTheme();
  const [programId, setProgramId] = useState("");
  const [programName, setProgramName] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [town, setTown] = useState("");
  const [name, setName] = useState("");
  const [cities, setCities] = useState([]);
  const [mobileNumber, setMobileNumber] = useState("");
  const [programIdError, setProgramIdError] = useState("");
  const [programNameError, setProgramNameError] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    if (province) {
      setDistrict("");
      setCities([]);
      setTown("");
    }
  }, [province]);

  useEffect(() => {
    if (district) {
      setCities(sriLankanData[province][district]);
      setTown("");
    } else {
      setCities([]);
    }
  }, [district, province]);

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setDistrict(selectedDistrict);
    setTown("");
  };

  const [addProgram] = useAddDeranaDaruwoProgramMutation();

  const validateProgramId = (id) => {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (!id) {
      return "Program ID is required";
    } else if (!alphanumericRegex.test(id)) {
      return "Program ID must be alphanumeric";
    }
    return "";
  };

  const validateProgramName = (name) => {
    const alphabeticRegex = /^[a-zA-Z]+$/;
    if (!name) {
      return "Program Name is required";
    } else if (!alphabeticRegex.test(name)) {
      return "Program Name must be alphabetic";
    }
    return "";
  };

  const handleAddProgram = () => {
    const programIdValidationError = validateProgramId(programId);
    const programNameValidationError = validateProgramName(programName);

    if (programIdValidationError || programNameValidationError) {
      setProgramIdError(programIdValidationError);
      setProgramNameError(programNameValidationError);
      return;
    }

    setProgramIdError(""); // Clear any previous error messages
    setProgramNameError(""); // Clear any previous error messages

    const programData = {
      programId,
      programName,
      province,
      district,
      town,
      mobileNumber,
      name,
    };

    addProgram(programData).then((response) => {
      console.log("Program added successfully", response);

      // Clear form fields
      setProgramId("");
      setProgramName("");
      setProvince("");
      setDistrict("");
      setTown("");
      setName("");
      setMobileNumber("");
      closeModal();
    }).catch((error) => {
      console.error("Error adding program:", error);
    });
  };

  return (
    <>
    <Dialog
      fullScreen
      open={openModal}
      onClose={closeModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle sx={{ bgcolor: "#f0f0f0" }} id="form-dialog-title">
        <div style={{ color: "#d63333", fontWeight: '700', fontSize: '16px' }}>
          {"Create Program"}
          <hr style={{ borderColor: "#d63333", }} />
        </div>
        <IconButton
          aria-label="close"
          onClick={closeModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          }}
        >
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="Program ID"
            variant="outlined"
            fullWidth
            value={programId}
            onChange={(e) => {
              setProgramId(e.target.value);
              setProgramIdError(validateProgramId(e.target.value));
            }}
            error={!!programIdError}
            helperText={programIdError}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="Program Name"
            variant="outlined"
            fullWidth
            value={programName}
            onChange={(e) => {
              setProgramName(e.target.value);
              setProgramNameError(validateProgramName(e.target.value));
            }}
            error={!!programNameError}
            helperText={programNameError}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <label style={{ fontWeight: "bold", color: "black", fontSize: "16px", marginTop: "16px" }} htmlFor="Add Location name">
            Add Location Name
          </label>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <CustomTextField
                select
                label="Province"
                variant="outlined"
                fullWidth
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              >
                {Object.keys(sriLankanData).map((prov) => (
                  <MenuItem key={prov} value={prov}>
                    {prov}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={4}>
              <CustomTextField
                select
                label="District"
                variant="outlined"
                fullWidth
                value={district}
                onChange={handleDistrictChange}
                disabled={!province}
              >
                {province ? Object.keys(sriLankanData[province]).map((dist) => (
                  <MenuItem key={dist} value={dist}>
                    {dist}
                  </MenuItem>
                )) : []}
              </CustomTextField>
            </Grid>
            <Grid item xs={4}>
              <CustomTextField
                select
                label="Town"
                variant="outlined"
                fullWidth
                value={town}
                onChange={(e) => setTown(e.target.value)}
                disabled={!district}
              >
                {cities.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 2 }}>
          <label style={{ fontWeight: "bold", color: "black", fontSize: "16px", marginTop: "16px" }} htmlFor="Principal Info">
            Area Officer Details
          </label>
        </Box>
        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{bgcolor:"#f0f0f0"}}>
          <Button
            onClick={handleAddProgram}
            color="secondary"
            variant="contained"
            disabled={loading}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {"Create Health Camp"}
          </Button>
          <Button onClick={closeModal}  variant="outlined" color="secondary">
            Cancel
          </Button>
        </DialogActions>
    </Dialog>

    <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ProgramModal;
import { Dialog, Box, DialogContent, DialogTitle, DialogActions, IconButton, CircularProgress, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

  import React, { useState, useEffect } from 'react';
  import CustomTextField from 'components/CustomTextField';
  import { useTheme } from "@mui/material/styles";
  import { useUpdateStudentsMutation, useGetDeranaDaruwoProgramsQuery,useGetStudentsByDeranaDaruwoProgramQuery  } from "state/api";
  import { Alert, Snackbar } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";

const UpdateRegistationModal = ({ openModal, closeModal, refetch,currentStudent, programId }) => {
    const theme = useTheme();
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentAddress, setStudentAddress] = useState("");
  // const [programId, setProgramId] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentContactDetails, setParentContactDetails] = useState("");
  const [bankAccountDetails, setBankAccountDetails] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [updateStudents] = useUpdateStudentsMutation();
  const { data: programs, isLoading, isError } = useGetDeranaDaruwoProgramsQuery();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const { data: programStudent } = useGetStudentsByDeranaDaruwoProgramQuery(programId, { skip: !programId });


  useEffect(() => {
    if (currentStudent) {
      setStudentId(currentStudent.studentId)
      setStudentName(currentStudent.studentName);
      setStudentAddress(currentStudent.studentAddress);
      setParentName(currentStudent.parentName);
      setParentContactDetails(currentStudent.parentContactDetails);
      setBankAccountDetails(currentStudent.bankAccountDetails);
      setAccountNumber(currentStudent.accountNumber);
    }
  }, [currentStudent]); 
  // const studentId = currentStudent ? currentStudent._id : "";
  const handleUpdateStudent = () => {
    updateStudents({
      studentId,
      studentName,
      studentAddress,
      parentName,
      parentContactDetails,
      bankAccountDetails,
      accountNumber,
      deranaDaruwProgram:programId,
    })
      .then((response) => {
        console.log("Student updated successfully:", response);
        // Clear form fields
        // setStudentID("");
        setStudentName("");
        setStudentAddress("");
        // setProgramID("");
        setParentName("");
        setParentContactDetails("");
        setBankAccountDetails("");
        setAccountNumber("");
        // Close the dialog
        closeModal();
        // Refetch updated data
        refetch();
        
      })
      .catch((error) => {
        console.error("Error updating student:", error);
      });
  };
  

  const handleCancel = () => {
    // Clear form fields
    // setStudentID("");
    setStudentName("");
    setStudentAddress("");
    // setProgramID("");
    setParentName("");
    setParentContactDetails("");
    setBankAccountDetails("");
    setAccountNumber("");
    // Close the dialog
    closeModal();
    
  };
  return (
    <>
      <Dialog
        fullScreen
        open={openModal}
        onClose={closeModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle sx={{ bgcolor: "#f0f0f0", position: 'relative' }} id="form-dialog-title">
          <div style={{ color: "#d63333", fontWeight: '700', fontSize: '16px' }}>
            {"Register Student"}
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
            {/* Add your icon component here */}
            <CloseIcon/>
          </IconButton>
        </DialogTitle>
        <DialogContent>
        <Box sx={{ mt: 2 }}>
            <CustomTextField label="Student ID" variant="outlined" value={studentId} fullWidth disabled />
          </Box>
          <Box sx={{ mt: 6 }}>
            <CustomTextField
              label="Student Name"
              variant="outlined"
              fullWidth
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </Box>
          <Box sx={{ mt: 6 }}>
            <CustomTextField
              label="Student Address"
              variant="outlined"
              fullWidth
              value={studentAddress}
              onChange={(e) => setStudentAddress(e.target.value)}
            />
          </Box>
          {/* <Box sx={{ mt: 6 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Select Program ID</InputLabel>
              <Select
                value={programID}
                onChange={(e) => setProgramID(e.target.value)}
                label="Select Program ID"
                disabled={isLoading || isError}
              >
                {isLoading && <MenuItem disabled>Loading...</MenuItem>}
                {isError && <MenuItem disabled>Error loading programs</MenuItem>}
                {programs && programs.map((program) => (
                  <MenuItem key={program.programId} value={program.programId}>
                     {program.programId}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box> */}
          <br /><br />
          <h4>Parent Details</h4>
          <Box sx={{ mt: 4 }}>
            <CustomTextField
              label="Parent Name"
              variant="outlined"
              fullWidth
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
            />
          </Box>
          <Box sx={{ mt: 6 }}>
            <CustomTextField
              label="Parent Contact Details"
              variant="outlined"
              fullWidth
              value={parentContactDetails}
              onChange={(e) => setParentContactDetails(e.target.value)}
            />
          </Box>
          <h4>Bank Account Details</h4>
          <Box sx={{ mt: 4 }}>
            <CustomTextField
              label="Bank Account Details"
              variant="outlined"
              fullWidth
              value={bankAccountDetails}
              onChange={(e) => setBankAccountDetails(e.target.value)}
            />
          </Box>
          <Box sx={{ mt: 6 }}>
            <CustomTextField
              label="Account Number"
              variant="outlined"
              fullWidth
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <CustomTextField label="Program object ID" variant="outlined" value={programId} fullWidth disabled />
          </Box>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#f0f0f0" }}>
          <Button
            onClick={handleUpdateStudent}
            color="secondary"
            variant="contained"
            disabled={loading}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {"Register Student"}
          </Button>
          <Button onClick={handleCancel} variant="outlined" color="secondary">
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
  )
}

export default UpdateRegistationModal
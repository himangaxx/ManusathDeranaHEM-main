import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Buttons from "components/Buttons";
import DonorRegistrationModal from "./DonorRegistrationModal";
import { DataGrid } from "@mui/x-data-grid";
import { useGetDonorVolunteersQuery, useDeleteDonorVolunteerMutation } from "state/api";
import { useTheme } from "@mui/material/styles";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const DonorRegistrationTab = () => {
  const theme = useTheme();

  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading, refetch, error } = useGetDonorVolunteersQuery();
  const [deleteDonor] = useDeleteDonorVolunteerMutation();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (error) {
      console.error("Error fetching donors:", error);
    }
  }, [error]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = (donorId) => {
    deleteDonor(donorId)
      .unwrap()
      .then((response) => {
        console.log("Donor deleted successfully");
        refetch();
      })
      .catch((error) => {
        console.error("Error deleting donor:", error);
      });
  };

  const donorColumns = [
    {
      field: "donorNIC",
      headerName: "Donor NIC",
      flex: 1,
    },
    {
      field: "donorName",
      headerName: "Donor Name",
      flex: 1,
    },
    {
      field: "donorAddress",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "mobileNumber",
      headerName: "Mobile Number",
      flex: 1,
    },
    {
      field: "dateOfBirth",
      headerName: "Date of Birth",
      flex: 1,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Buttons
          label="Delete"
          onClick={() => handleDelete(params.row.donorId)}
        />
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Buttons label={"Register Donor"} onClick={handleOpenModal} />
      </Box>
      <DonorRegistrationModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row.donorId}
          rows={data || []}
          columns={donorColumns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default DonorRegistrationTab;

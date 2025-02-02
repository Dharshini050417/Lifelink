import React, { useState, useEffect } from 'react';
import FolderIcon from '@mui/icons-material/Folder'; // Icon for folders
import { Button } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// Simulated data for folders (you would replace this with actual server data)
const simulatedFolders = ['Folder 1', 'Folder 2', 'Folder 3'];

const AddDataPage: React.FC = () => {
  const [folders, setFolders] = useState<string[]>([]); // To store fetched folders
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null); // To handle file uploads

  // Simulate fetching folders from the backend using a loop
  useEffect(() => {
    const fetchFolders = () => {
      // Simulating an API call delay
      setTimeout(() => {
        const fetchedFolders: string[] = [];
        // Simulate fetching folders in a loop
        for (let i = 0; i < simulatedFolders.length; i++) {
          fetchedFolders.push(simulatedFolders[i]);
        }
        setFolders(fetchedFolders);
      }, 1000);
    };

    fetchFolders();
  }, []);

  // Handle file uploads (simulated for now)
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setSelectedFiles(files);

    if (files) {
      const uploadedFolders: string[] = [];

      // Simulate folder upload in a loop
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        uploadedFolders.push(`Uploaded Folder ${i + 1}: ${file.name}`);
      }

      // Simulating the updated folder list after upload
      setFolders((prevFolders) => [...prevFolders, ...uploadedFolders]);

      console.log('Simulated upload complete', uploadedFolders);
    }
  };

  return (
    <Box
      sx={{
        width: '150vh',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        p: 4,
      }}
    >
      {/* Upload Button */}
      <Box sx={{ alignSelf: 'flex-end', mb: 4 }}>
        <Button
          variant="contained"
          component="label"
          color="primary"
          startIcon={<UploadIcon />}
          sx={{ mb: 2 }}
        >
          Upload Folder
          <input
            type="file"
            webkitdirectory="true" // Allows selecting a folder (for Chrome)
            directory="true" // For other browsers supporting directory upload
            hidden
            multiple
            onChange={handleFileUpload}
          />
        </Button>
      </Box>

      {/* Folder Icons Display (Fetched from simulated server) */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {/* Loop through folders to display them */}
          {folders.map((folder, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 2,
                  backgroundColor: '#f0f0f0',
                  borderRadius: 2,
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#e0e0e0' },
                }}
              >
                <FolderIcon sx={{ fontSize: 64, color: '#1976d2' }} />
                <Box sx={{ mt: 1 }}>{folder}</Box> {/* Folder name */}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AddDataPage;

// src/App.js

import React from 'react';
import FileUpload from './Components/FileUpload';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DownloadPage from './Components/DownloadPage';
import UploadedFilesPage from './Components/UploadedFilesPage';
import OnboardingPage from './Components/OnboardingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<OnboardingPage />} />

        <Route path='/upload' element={<FileUpload />} />        

        <Route path='/file/:id' element={<DownloadPage />} />
        
        <Route path='/files' element={<UploadedFilesPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

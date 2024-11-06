const express = require('express');
const { createDocument, updateDocument, getDocumentById, deleteDocument } = require('../controller/controller');
const documentRoutes = express.Router();

documentRoutes.post('/documents', createDocument);
documentRoutes.put('/documents/:id', updateDocument);
documentRoutes.get('/documents/:id', getDocumentById);
documentRoutes.delete("/documents/:id", deleteDocument);


module.exports = documentRoutes;

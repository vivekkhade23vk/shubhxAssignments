const mongoose = require("mongoose");
const documentModel = require("../model/model");


exports.createDocument = async (req, res) => {
  const { title, content } = req.body;
  try {
    const document = new documentModel({
      title,
      content,
      versionHistory: [{ version: 1, content, timestamp: new Date() }],
    });
    await document.save();
    res.json(document);
  } catch (error) {
    res.status(500).json({ error: 'Error creating documents' });
  }
};

exports.updateDocument = async (req, res) => {
  const { content } = req.body;
  try {
    const document = await documentModel.findById(req.params.id);
    if (!document) return res.status(404).json({ error: 'Not foundd' });

    const newVersion = document.versionHistory.length + 1;
    document.content = content;
    document.versionHistory.push({ version: newVersion, content, timestamp: new Date() });
    await document.save();

    res.json(document);
  } catch (error) {
    res.status(500).json({ error: 'Error updating documents' });
  }
};


exports.getDocumentById = async (req, res) => {
  try {
    const document = await documentModel.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json(document);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching document' });
  }
};

exports.deleteDocument = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid document ID" });
  }

  try {
    const document = await documentModel.findByIdAndDelete(id);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error(error);  
    res.status(500).json({ error: "Error deleting document" });
  }
};
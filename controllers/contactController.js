// controllers/contactController.js
import Contact from "../models/Contact.js";
import { sendReply } from "../utils/sendReply.js";

export const sendQuery = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    const newContact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    res
      .status(201)
      .json({ message: "Query submitted successfully", contact: newContact });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res
      .status(500)
      .json({ error: "Something went wrong while submitting your query" });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.findAll({ order: [["createdAt", "DESC"]] });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

export const send_Reply = async (req, res) => {
  const { subject, message, id } = req.body;
  console.log(req.files);

  try {
    const contact = await Contact.findByPk(id);
    if (!contact) return res.status(404).json({ error: "Message not found" });

    sendReply({ email: contact.email, subject, message, files: req.files });

    const result = await contact.update({ status: "Replied" });

    res
      .status(200)
      .json({ message: "Reply sent and status updated to Replied", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send reply" });
  }
};

export const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);
    if(contact.status == "New"){
        const result = await contact.update({ status: "Viewed" });
        res.status(200).json({ message: "Status updated to Viewed" , result});
    }else{
        res.status(404).send("Status is already viewed or replied");
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to change status" });
    console.log(error);
  }
};

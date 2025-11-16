const Contact = require("./contact.model");

exports.createMessage = async (data: any): Promise<any> => {
  const newMessage = await Contact.create(data);
  return newMessage;
};

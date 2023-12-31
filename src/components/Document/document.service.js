import pkg from "sequelize";

import { DocumentModel } from "../../models/index.js";
import DocumentValidation from "./document.validation.js";

const { Op } = pkg;

const DocumentService = {
  getDocumentList: async (query) => {
    const { keyword = "", page = 0, limit = 10 } = query;
    const offset = page * limit;
    let filter = {};

    if (keyword) {
      filter = {
        [Op.or]: [
          {
            code: {
              [Op.like]: "%" + keyword + "%",
            },
          },
          { name: { [Op.like]: "%" + keyword + "%" } },
        ],
      };
    }

    const data = await DocumentModel.findAndCountAll({
      limit,
      offset,
      where: filter,
    });

    return {
      total: data.count,
      results: data.rows,
    };
  },

  createDocument: async (body) => {
    const validate = DocumentValidation.createDocument(body);

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { code, name, file } = body;

    const newDocument = await DocumentModel.create({
      code,
      name,
      file,
    });

    return newDocument;
  },

  updateDocument: async (id, body) => {
    const validate = DocumentValidation.updateDocument({
      id,
      ...body,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const { code, name, file } = body;

    const findDocument = await DocumentModel.findOne({
      where: {
        id,
      },
    });

    await findDocument.update({
      code,
      name,
      file,
    });

    return findDocument;
  },

  deleteDocument: async (id) => {
    const validate = DocumentValidation.deleteDocument({
      id,
    });

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const destroyUser = await DocumentModel.destroy({
      where: {
        id,
      },
    });

    return destroyUser;
  },
};

export default DocumentService;

const { roleSchemaValidation } = require("../../common/schema_validation");
const db = require("../../models/index.model");
const Role = db.Role;
//add role controller
const addRoleController = async (req, res) => {
  
  const { name } = req.body;
  const { error, value } = roleSchemaValidation.validate(
    { name },
    {
      abortEarly: false,
    }
  );
  if (error) {
    return res.status(400).send({ error: "Invalid Request: " + error });
  } else {
    try {
      const findRole = await Role.findOne({
        where: { name: name },
      });
      if (findRole) {
        res.status(409).json({
          success: false,
          error: "role already registered!",
        });
      } else {
        const role = await Role.create({
          name: name,
        });
        res.status(201).json({
          success: true,
          message: "role created successfylly!",
          role: role,
        });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};

//get roles controller
const getRoleController = async (req, res) => {
  try {
    const findRole = await Role.findAll();
    if (findRole.length > 0) {
      res.status(200).json({
        success: true,
        roles: findRole,
      });
    } else {
      res.status(404).json({
        message: "role not found!",
        role: findRole,
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//edit role controller
const editRoleController = async (req, res) => {
  const { name } = req.body;
  const { error, value } = roleSchemaValidation.validate(
    { name },
    {
      abortEarly: false,
    }
  );
  if (error) {
    return res.status(400).send({ error: "Invalid Request: " + error });
  } else {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json({
        success: false,
        message: "role not found!",
      });
    }
    try {
      const findtregisterrole = await Role.findOne({
        where: { name: name },
      });
      if (findtregisterrole && findtregisterrole?.id == req.params.id) {
        const role = await Role.update(
          {
            name: name,
          },
          { where: { id: req.params.id } }
        );
        res.status(202).json({
          success: true,
          message: "role updated successfylly!",
        });
      } else {
        res.status(409).json({
          success: false,
          error: "role already registered!",
        });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};

module.exports = { addRoleController, getRoleController, editRoleController };

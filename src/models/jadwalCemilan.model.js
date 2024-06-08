const prisma = require("../configs/prismaClient");

// Function to retrieve all jadwal makanan from the database
const get = async () => {
  try {
    return await prisma.jadwalCemilan.findMany();
  } catch (error) {
    console.log(error);
  }
};

// Function to retrieve a specific jadwal makanan by ID from the database
const getById = async (jadwalId) => {
  try {
    return await prisma.jadwalCemilan.findUnique({
      where: {
        jadwalId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// Function to create a new jadwal makanan in the database
const create = async (jadwalCemilan) => {
  try {
    return await prisma.jadwalCemilan.create({
      data: jadwalCemilan,
    });
  } catch (error) {
    console.log(error);
  }
};

// Function to update an existing jadwal makanan by ID in the database
const updateById = async (jadwalId, jadwalCemilan) => {
  try {
    return await prisma.jadwalCemilan.update({
      where: {
        jadwalId,
      },
      data: jadwalCemilan,
    });
  } catch (error) {
    console.log(error);
  }
};

const patchById = async (jadwalId, jadwalCemilan) => {
    try {
      return await prisma.jadwalCemilan.update({
        where: {
          jadwalId,
        },
        data: jadwalCemilan,
      });
    } catch (error) {
      console.log(error);
    }
  };

// Function to delete a jadwal makanan by ID from the database
const deleteById = async (jadwalId) => {
  try {
    await await prisma.jadwalCemilan.delete({
      where: {
        jadwalId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  get,
  getById,
  create,
  updateById,
  patchById,
  deleteById,
};

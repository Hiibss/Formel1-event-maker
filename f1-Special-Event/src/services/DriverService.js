import axios from "axios";

const DriverService = (() => {
  const DriverController = "http://localhost:5086/api/Drivers";
  // const ImageUploadController = "http://localhost:5086/api/ImageUpload";

  // get all drivers from database aPI
  const getAllDrivers = async () => {
    try {
      const result = await axios.get(DriverController);
      console.log(result);
      return result.data;
    } catch (error) {
      console.error("Det oppsto en feil ved henting av alle drivers", error);

      throw error;
    }
  };

  const getDrivers = async (searchQuery) => {
    console.log(`Sender søk etter ${searchQuery} til API`);
    const result = await axios.get(`${DriverController}`, {
      params: { searchQuery, searchQuery },
    });
    console.log(`Mottat respons:`, result.data);
    return result.data;
  };

  const getDriverById = async (id) => {
    try {
      const result = await axios.get(`${DriverController}/${id}`);
      return result.data;
    } catch (error) {
      console.error("Det oppsto en feil ved henting av drivers ID", error);

      throw error;
    }
  };

  const createDriver = async (driver) => {
    try {
      const result = await axios.post(DriverController, driver);

      return result.data;
    } catch (error) {
      console.error("Det oppsto en feil ved opprettelse av ny driver", error);

      throw error; // throw error tilbake til klienten for å vise feilmelding.
    }
  };

  const updateDriver = async (id, driver) => {
    try {
      await axios.put(`${DriverController}/${id}`, driver);
    } catch (error) {
      console.error("Det oppsto en feil ved oppdatering av driver", error);

      throw error;
    }
  };

  const deleteDriver = async (id) => {
    try {
      await axios.delete(`${DriverController}/${id}`);
    } catch (error) {
      console.error("Det oppsto en feil ved sletting av driver", error);

      throw error;
    }
  };

  const postImages = async (images) => {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`formFiles[${index}]`, image);
    });

    try {
      const uploadResult = await axios({
        url: ImageUploadController,
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      return uploadResult.data;
    } catch (error) {
      console.error("Det oppsto en feil ved oppdatering av driver", error);

      throw error; // throw error tilbake til bruker for å vise feilmelding.
    }
  };

  return {
    getAllDrivers,
    getDriverById,
    createDriver,
    updateDriver,
    deleteDriver,
    postImages,
    getDrivers,
  };
})();
export default DriverService;

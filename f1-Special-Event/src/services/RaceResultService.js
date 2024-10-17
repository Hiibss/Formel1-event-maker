import axios from "axios";

const backendUrl = "http://localhost:5086";
const resultEndpoint = `${backendUrl}/api/Result`;
const raceEndpoint = `${backendUrl}/api/Result/race`;

const raceDrivers = async (driverId1, driverId2) => {
  try {
    const result = await axios.post(raceEndpoint, {
      driverId1,
      driverId2,
    });
    console.log(result.data); // viser vinneren av race
    return result.data;
  } catch (error) {
    console.error("Det oppsto en feil ved racing av drivers", error);

    throw error;
  }
};

const getAllRaceResult = async () => {
  try {
    const result = await axios.get(resultEndpoint);
    return result.data;
  } catch (error) {
    console.error(
      "Det oppsto en feil ved henting av alle race resultater",
      error
    );

    throw error;
  }
};

const addRaceResult = async (raceResult) => {
  try {
    const result = await axios.post(`${resultEndpoint}/race`, raceResult);
    return result.data;
  } catch (error) {
    console.error("Det oppsto en feil ved lagring av race resultater", error);
    throw error;
  }
};

export { raceDrivers, getAllRaceResult, addRaceResult };

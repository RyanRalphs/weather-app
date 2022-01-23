jest.mock("../src/utils/geocode.js");
const mockForwardGeocode = jest.fn().mockImplementation(async (address) => {
  return new Promise((resolve, reject) => {
    address === "Oswestry"
      ? resolve({ latitude: 52.8598, longitude: -3.0538 })
      : reject(
          "The location requested does not return any results. Please try being more specific."
        );
  });
});

const mockReverseGeocode = jest.fn().mockImplementation(async (lat, long) => {
  return new Promise((resolve, reject) => {
    typeof lat === "number" && typeof long === "number"
      ? resolve({
          id: "place.9835687462513040",
          wikidata: "Q1009221",
          text: "Oswestry",
        })
      : reject("Unable to connect to the location API.");
  });
});

test("I can forward geocode an address", async () => {
  await mockForwardGeocode("Oswestry").then((result) => {
    expect(result).toStrictEqual({ latitude: 52.8598, longitude: -3.0538 });
  });
});

test("I get an error if I do not provide a valid address", async () => {
  await mockForwardGeocode("!")
    .then()
    .catch((error) => {
      expect(error).toBe(
        "The location requested does not return any results. Please try being more specific."
      );
    });
});


test("I can get an address name from providin coords", async () => {
  await mockReverseGeocode(52.923, -3.0069907).then((result) => {
    expect(result).toStrictEqual({
      id: "place.9835687462513040",
      wikidata: "Q1009221",
      text: "Oswestry",
    })
  })
})

test("I get an error if I don't provide coords", async () => {
  await mockReverseGeocode('str').then().catch((error) => {
    expect(error).toBe('Unable to connect to the location API.')
  })
})

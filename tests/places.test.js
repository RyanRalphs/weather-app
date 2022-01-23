jest.mock("../src/utils/places.js");

const mockGetPhotoReference = jest
  .fn()
  .mockImplementation(async (searchQuery, lat, long) => {
    return new Promise((resolve, reject) => {
      Number(lat) !== NaN ||
      (Number(long) !== NaN && typeof searchQuery !== "string")
        ? resolve({
            photo_reference:
              "Aap_uEAKGOwtzsuWTriRRaJv5rDBwtQDYRzpDwwF4YalGL1_d31R3WuEwkY-qXXSkoBy4C-MC-5YuMQpvtYKpY7_c99agE3tEAoax55RnieQAT90bkTlEQUijG-IKPNBKqrA3Alm2fW0LhJpohfMxMvnEWF2bYVBmKF5-wK4x3vIIRE0n6Rj",
          })
        : reject(
            "Could not find a photo for this location - Currently only supports locations such as Texas, Oswestry etc."
          );
    });
  });

const mockGetPhotoUrl = jest.fn().mockImplementation(async (photoReference) => {
  return new Promise((resolve, reject) => {
    typeof photoReference === "string"
      ? resolve({
          url: "https://lh3.googleusercontent.com/maps/api/place/photo?maxwidth=400&chunked_encoding=true&photo_reference=&key=AIzaSyBb6zAFYHeip6AbRG-BRdKHuHZPl08O2W0",
        })
      : reject("Something went wrong trying to fetch the mirror from Google.");
  });
});

test("I can get back a photo reference when providing search, lat and long", async () => {
  await mockGetPhotoReference("Oswestry", 52.8598, -3.0538).then((result) => {
    result = JSON.stringify(result);
    expect(result).toContain("photo_reference");
  });
});

test("I get returned an error with invalid data", async () => {
  await mockGetPhotoReference("", "", "")
    .then()
    .catch((error) => {
      console.log(error);
      expect(error).toBe(
        "Your API request failed. Please try again or contact support."
      );
    });
});

test("I can get my photo URL if I provide a photo reference", async () => {
  await mockGetPhotoUrl(
    "GL1_d31R3WuEwkY-qXXSkoBy4C-MC-5YuMQpvtYKpY7_c99agE3tEAoax55RnieQAT90bkTlEQUijG-IKPNBKqrA3Alm2fW0LhJpohfMxMvnEWF2bYVBmKF5-wK4x3vIIRE0n6Rj"
  ).then((result) => {
    result = JSON.stringify(result);
    expect(result).toContain("url");
  });
});

test("I get an error if I provide a bad photo reference", async () => {
  await mockGetPhotoUrl(12)
    .then()
    .catch((error) => {
      expect(error).toBe(
        "Something went wrong trying to fetch the mirror from Google."
      );
    });
});

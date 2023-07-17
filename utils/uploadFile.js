import axios from "axios";

export const uploadFile = async (file, token) => {
  const hotelOwnerId = sessionStorage.getItem("hotelID");
  const hotelName = sessionStorage.getItem("hotelOwner");
  let formData = new FormData();
  formData.append(type, file);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_HOST}/api/v1/upload`,
    {
      method: "POST",
      body: formData,
      headers: {
        hotelOwner: hotelName.replaceAll(" ", ""),
        hotelOwnerID: hotelOwnerId,
        token: token,
      },
    }
  );
  const responseJSON = await response.json();
  return responseJSON["data"];
};

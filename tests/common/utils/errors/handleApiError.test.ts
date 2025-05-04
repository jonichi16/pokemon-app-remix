import { handleApiError } from "~/common/utils/errors/handleApiError";

describe("handleApiError test", () => {
  it("should return fallbackMessage for unknown error", () => {
    const err = new Error("Unknown Error");

    expect(() => handleApiError(err)).toThrow("Unknown Error");
  });

  it("should return provided fallbackMessage for unknown error", () => {
    const err = new Error("Unknown Error");
    const fallbackMessage = "Opps! An error occured";

    expect(() => handleApiError(err, fallbackMessage)).toThrow("Unknown Error");
  });

  it("should return the error message when axiosError occured", () => {
    const err = {
      isAxiosError: true,
      response: {
        status: 404,
        data: {
          message: "Pokémon not found",
        },
      },
      message: "Request failed",
    };

    expect(() => handleApiError(err)).toThrow("Pokémon not found");
  });

  it("falls back to default message if response message is missing", () => {
    const err = {
      isAxiosError: true,
      response: {
        status: 500,
        data: {},
      },
      message: "Internal Server Error",
    };

    expect(() => handleApiError(err)).toThrow("Internal Server Error");
  });

  it("uses fallback message if not an Axios error", () => {
    const err = new Error("Unexpected failure");

    expect(() => handleApiError(err, "Something failed")).toThrow(
      "Unexpected failure"
    );
  });

  it("handles axios error with no response", () => {
    const err = {
      isAxiosError: true,
      message: "Network error",
    };

    expect(() => handleApiError(err)).toThrow("Network error");
  });
});

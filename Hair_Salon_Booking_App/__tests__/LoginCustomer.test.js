
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import LoginCustomer from "../src/pages/LoginCustomer";
import { store } from "../src/redux/store";
import api from "../src/config/axios";
import { toast } from "react-toastify";
import React from "react";

// Mock the toast notifications
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));


// Mock the API
jest.mock("../src/config/axios.js");


const mockNavigate = jest.fn(); // Create a jest mock function
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Keep other functionalities from react-router-dom
  useNavigate: () => mockNavigate, // Mock useNavigate to return the jest function
}));

const renderWithStoreAndRouter = (component) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe("LoginCustomer Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form", () => {
    renderWithStoreAndRouter(<LoginCustomer />);
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "SIGN IN" })).toBeInTheDocument();

  });
  test("shows validation errors if phone number and password are empty", async () => {
    renderWithStoreAndRouter(<LoginCustomer />);

    // Simulate form submission without entering any data
    fireEvent.click(screen.getByRole("button", { name: "SIGN IN" }));

    // Expect validation error messages
    await waitFor(() => {
      expect(screen.getByText("Please input your phone number!")).toBeInTheDocument();
      expect(screen.getByText("Please input your password!")).toBeInTheDocument();
    });
  });
  test("shows validation error for phone number less than 10 digits", async () => {
    renderWithStoreAndRouter(<LoginCustomer />);

    // Simulate entering an invalid phone number (less than 10 digits)
    fireEvent.change(screen.getByLabelText("Phone Number"), {
      target: { value: "12345" },  // Invalid phone number
    });



    // Wait for validation messages to appear
    await waitFor(() => {
      // Expect validation error for phone number format
      expect(screen.getByText("Please enter a valid 10-digit phone number!")).toBeInTheDocument();


    });
  });

  test("shows validation error for phone number with entering characters", async () => {
    renderWithStoreAndRouter(<LoginCustomer />);

    // Simulate entering an invalid phone number (enter character)
    fireEvent.change(screen.getByLabelText("Phone Number"), {
      target: { value: "saaaaa" },  // Invalid phone number
    });



    // Wait for validation messages to appear
    await waitFor(() => {
      // Expect validation error for phone number format
      expect(screen.getByText("Please enter a valid 10-digit phone number!")).toBeInTheDocument();


    });
  });

  test("shows validation error for phone number higher than 10 digits", async () => {
    renderWithStoreAndRouter(<LoginCustomer />);

    // Simulate entering an invalid phone number (higher than 10 digits)
    fireEvent.change(screen.getByLabelText("Phone Number"), {
      target: { value: "12345678902" },  // Invalid phone number
    });



    // Wait for validation messages to appear
    await waitFor(() => {
      // Expect validation error for phone number format
      expect(screen.getByText("Please enter a valid 10-digit phone number!")).toBeInTheDocument();


    });
  });


  test("shows validation error for invalid short password", async () => {
    renderWithStoreAndRouter(<LoginCustomer />);

    // Simulate entering an invalid password (less than 6)
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "12345" },
    });
    // Wait for validation messages to appear
    await waitFor(() => {
      // Expect validation error for phone number format
      expect(screen.getByText("Password must be at least 6 characters!")).toBeInTheDocument();

    });
  });


  test("logs in with valid phone number and password, shows success toast and redirects", async () => {

    // Mock the API response for successful login
    api.post.mockResolvedValue({
      data: {
        token: "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIwODg2MTIyNTc4IiwiaWF0IjoxNzI5MTYzMDkzLCJleHAiOjE3MjkyNDk0OTN9.PO0b2Zfv8KlQ5H80DLS_XS1NO2dSP4pKMUCGc05J72nKZ2dmBPpbIo40TyOj4Uyb",
        user: { email: "huatri2004@gmail.com", name: "Tran Tri", phoneNumber: "0886122578" },
      },
    });

    renderWithStoreAndRouter(<LoginCustomer />);

    // Simulate entering a valid phone number
    fireEvent.change(screen.getByLabelText("Phone Number"), {
      target: { value: "0886122578" }, // Valid 10-digit phone number
    });

    // Simulate entering a valid password
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "12345678" }, // Valid password (at least 6 characters)
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole("button", { name: "SIGN IN" }));

    // Wait for the API call and navigation to occur
    await waitFor(() => {
      // Expect the toast.success to be called with the correct message
      expect(toast.success).toHaveBeenCalledWith("Log in thanh cong");

      // Expect the page to be navigated to the "/logged_in" route
      expect(mockNavigate).toHaveBeenCalledWith("/logged_in");


    });
  });

  test("shows error toast when invalid password is entered", async () => {
    // Mock the API response for failed login (invalid password)
    api.post.mockRejectedValue({
      response: {
        data: "Phonenumber or password invalid!", // Simulate the error message from API
      },
    });

    renderWithStoreAndRouter(<LoginCustomer />);

    fireEvent.change(screen.getByLabelText("Phone Number"), {
      target: { value: "0886122578" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "123456789000" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole("button", { name: "SIGN IN" }));

    // Wait for the API call and the error toast to be triggered
    await waitFor(() => {
      // Expect the toast.error to be called with the API's error message
      expect(toast.error).toHaveBeenCalledWith("Phonenumber or password invalid!");
    });
  });


});

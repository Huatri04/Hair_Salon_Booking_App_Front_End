import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import RegisterCustomer from "../src/pages/RegisterCustomer";
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

describe("RegisterCustomer Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("renders register form", () => {
        renderWithStoreAndRouter(<RegisterCustomer />);
        expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
        expect(screen.getByLabelText("Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "SIGN UP" })).toBeInTheDocument();
    });
    test("shows validation errors if register form are empty", async () => {
        renderWithStoreAndRouter(<RegisterCustomer />);

        // Simulate form submission without entering any data
        fireEvent.click(screen.getByRole("button", { name: "SIGN UP" }));

        // Expect validation error messages
        await waitFor(() => {
            expect(screen.getByText("Please input your phone number!")).toBeInTheDocument();
            expect(screen.getByText("Please enter your name!")).toBeInTheDocument();
            expect(screen.getByText("Please enter your email!")).toBeInTheDocument();
            expect(screen.getByText("Please input your password!")).toBeInTheDocument();
            expect(screen.getByText("Please confirm your password!")).toBeInTheDocument();

        });
    });

    test("shows validation errors if register form are empty", async () => {
        renderWithStoreAndRouter(<RegisterCustomer />);
        fireEvent.change(screen.getByLabelText("Phone Number"), {
            target: { value: "09180011" }, // Valid 10-digit phone number
        });

        fireEvent.change(screen.getByLabelText("Name"), {
            target: { value: "Xuan12" },
        });


        fireEvent.change(screen.getByLabelText("Email"), {
            target: { value: "tritvhse182903@fpt.edu.vn" },
        });

        fireEvent.change(screen.getByLabelText("Password"), {
            target: { value: "1234567890" },
        });

        fireEvent.change(screen.getByLabelText("Confirm Password"), {
            target: { value: "1234567890" },
        });

        // Simulate form submission
        fireEvent.click(screen.getByRole("button", { name: "SIGN UP" }));

        // Expect validation error messages
        await waitFor(() => {
            expect(screen.getByText("Please enter a valid 10-digit phone number!")).toBeInTheDocument();
        });
    });

    test("register with valid , shows success toast and redirects", async () => {



        renderWithStoreAndRouter(<RegisterCustomer />);

        fireEvent.change(screen.getByLabelText("Phone Number"), {
            target: { value: "0918001135" }, // Valid 10-digit phone number
        });

        fireEvent.change(screen.getByLabelText("Name"), {
            target: { value: "Xuan12" },
        });


        fireEvent.change(screen.getByLabelText("Email"), {
            target: { value: "tritvhse182903@fpt.edu.vn" },
        });

        fireEvent.change(screen.getByLabelText("Password"), {
            target: { value: "1234567890" },
        });

        fireEvent.change(screen.getByLabelText("Confirm Password"), {
            target: { value: "1234567890" },
        });

        // Simulate form submission
        fireEvent.click(screen.getByRole("button", { name: "SIGN UP" }));

        // Wait for the API call and navigation to occur
        await waitFor(() => {
            // Expect the toast.success to be called with the correct message
            expect(toast.success).toHaveBeenCalledWith("Successful register new account");

            // Expect the page to be navigated to the "/logged_in" route
            expect(mockNavigate).toHaveBeenCalledWith("/loginCustomer");


        });
    });

});



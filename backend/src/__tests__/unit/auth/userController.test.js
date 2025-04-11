import { jest } from "@jest/globals";

import {
  signup,
  login,
  logout,
  getMe,
} from "./../../../modules/auth/user.controller.js";
import { User } from "./../../../modules/auth/user.model.js";
import httpMocks from "node-mocks-http";
import bcrypt from "bcryptjs";

// Manual mock
jest.mock("./../../../modules/auth/user.model.js", () => ({
    User: {
      findOne: jest.fn(),
      create: jest.fn(),
    }
  }));
describe("🧪 Unit Test - Auth Controllers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("📝 signup", () => {
    test("✅ should create a user and respond with success", async () => {
      const req = httpMocks.createRequest({
        method: "POST",
        body: { name: "Test", email: "test@example.com", password: "pass123" },
      });
      const res = httpMocks.createResponse();
      const json = jest.fn();
      res.status = jest.fn().mockReturnValue({ json });

      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue({
        id: "1",
        name: "Test",
        email: "test@example.com",
      });

      await signup(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining({ type: "success" })
      );
    });

    test("🚫 should return error if user already exists", async () => {
      const req = httpMocks.createRequest({
        method: "POST",
        body: { name: "Test", email: "test@example.com", password: "pass123" },
      });
      const res = httpMocks.createResponse();
      const json = jest.fn();
      res.status = jest.fn().mockReturnValue({ json });

      User.findOne.mockResolvedValue({ email: "test@example.com" });

      await signup(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining({ type: "error" })
      );
    });
  });

  describe("🔐 login", () => {
    test("✅ should log in successfully", async () => {
      const passwordHash = await bcrypt.hash("pass123", 10);
      const req = httpMocks.createRequest({
        method: "POST",
        body: { email: "test@example.com", password: "pass123" },
      });
      const res = httpMocks.createResponse();
      const json = jest.fn();
      res.status = jest.fn().mockReturnValue({ json });
      res.cookie = jest.fn();

      User.findOne.mockResolvedValue({
        id: "1",
        email: "test@example.com",
        comparePassword: async () => true,
      });

      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining({ type: "success" })
      );
    });

    test("🚫 should return error for invalid credentials", async () => {
      const req = httpMocks.createRequest({
        method: "POST",
        body: { email: "test@example.com", password: "wrong" },
      });
      const res = httpMocks.createResponse();
      const json = jest.fn();
      res.status = jest.fn().mockReturnValue({ json });

      User.findOne.mockResolvedValue({
        email: "test@example.com",
        comparePassword: async () => false,
      });

      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe("🚪 logout", () => {
    test("✅ should clear accessToken cookie", async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const json = jest.fn();
      res.status = jest.fn().mockReturnValue({ json });
      res.clearCookie = jest.fn();

      await logout(req, res);
      expect(res.clearCookie).toHaveBeenCalledWith("accessToken");
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("👤 getMe", () => {
    test("✅ should return user profile", async () => {
      const req = httpMocks.createRequest({
        user: { id: "1", email: "test@example.com", name: "Test" },
      });
      const res = httpMocks.createResponse();
      const json = jest.fn();
      res.status = jest.fn().mockReturnValue({ json });

      await getMe(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining({ type: "success" })
      );
    });
  });
});

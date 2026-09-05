import type { Request, Response } from "express";
import { User } from "../models/User.js";
import { HttpError } from "../middleware/httpError.js";
import type { UserPayload } from "../validators/userValidator.js";

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function getUsers(req: Request, res: Response) {
  const page = Math.max(
    1,
    Number.parseInt(String(req.query.page ?? "1"), 10) || 1,
  );
  const limit = Math.min(
    50,
    Math.max(1, Number.parseInt(String(req.query.limit ?? "10"), 10) || 10),
  );
  const q = typeof req.query.q === "string" ? req.query.q.trim() : "";

  const filter = q
    ? {
        $or: ["name", "email", "phone", "company", "address.city"].map(
          (field) => ({
            [field]: { $regex: escapeRegex(q), $options: "i" },
          }),
        ),
      }
    : {};

  const [users, total] = await Promise.all([
    User.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    User.countDocuments(filter),
  ]);

  res.json({
    users,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
}

export async function getUserById(req: Request, res: Response) {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  res.json(user);
}

export async function createUser(req: Request, res: Response) {
  const user = await User.create(req.body as UserPayload);
  res.status(201).json(user);
}

export async function updateUser(req: Request, res: Response) {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body as UserPayload,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  res.json(user);
}

export async function deleteUser(req: Request, res: Response) {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  res.json({ message: "User deleted" });
}

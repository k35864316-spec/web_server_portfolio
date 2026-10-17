import mongoose, { Schema, type Model } from "mongoose";
import type { ProfileData } from "./profileData";

type ProfileDoc = { key: string; hash: string; data: ProfileData };
type GuestDoc = { name: string; message: string; createdAt: Date };

const profileSchema = new Schema<ProfileDoc>({
  key: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  data: { type: Schema.Types.Mixed, required: true },
});

const guestSchema = new Schema<GuestDoc>(
  {
    name: { type: String, required: true, trim: true, maxlength: 20 },
    message: { type: String, required: true, trim: true, maxlength: 300 },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const Profile: Model<ProfileDoc> =
  (mongoose.models.Profile as Model<ProfileDoc>) ?? mongoose.model<ProfileDoc>("Profile", profileSchema);
export const Guest: Model<GuestDoc> =
  (mongoose.models.Guest as Model<GuestDoc>) ?? mongoose.model<GuestDoc>("Guest", guestSchema);

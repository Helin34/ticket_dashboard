import mongoose, { Schema } from "mongoose";

export interface ITicket {
  title: string;
  description: string;
  category: "Yazılım Sorunu" | "Donanım Sorunu" | "Bağlantı Sorunu" | "Diğer";
  priority: number;
  progress: number;
  status: "Beklemede" | "Devam Ediyor" | "Çözüldü";
}

const ticketSchema = new Schema<ITicket>(
  {
    title: {
      type: String,
      required: [true, "title alanı zorunludur"],
    },
    description: {
      type: String,
      required: [false, "Açıklama isteğe bağlıdır"],
    },
    category: {
      type: String,
      required: [true, "category alanı zorunludur"],
      enum: ["Yazılım Sorunu", "Donanım Sorunu", "Bağlantı Sorunu", "Diğer"],
    },
    priority: {
      type: Number,
      required: [true, "priority alanı zorunludur"],
      enum: [1, 2, 3, 4, 5],
    },
    progress: {
      type: Number,
      required: [true, "progress alanı zorunludur"],
      min: 0,
      max: 100,
    },
    status: {
      type: String,
      required: [true, "status alanı zorunludur"],
      enum: ["Beklemede", "Devam Ediyor", "Çözüldü"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Ticket =
  mongoose.models.Ticket || mongoose.model<ITicket>("Ticket", ticketSchema);
export default Ticket;

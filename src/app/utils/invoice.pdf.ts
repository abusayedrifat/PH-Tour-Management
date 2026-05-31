import  PDFDocument  from 'pdfkit';
/* eslint-disable @typescript-eslint/no-explicit-any */

import fs from "fs";
import path from "path";

interface IInvoicePayload {
  booking: {
    _id: string;
    guest: number;
    status: string;
    createdAt: Date;
  };

  payment: {
    transactionId: string;
    amount: number;
    status: string;
  };

  user: {
    name: string;
    email: string;
    phone?: string;
  };

  tour: {
    title: string;
    location?: string;
    division?: {
      name: string;
    };
    costFrom: number;
    startDate?: Date;
    endDate?: Date;
  };
}

export const generateInvoicePDF = async (
  payload: IInvoicePayload
): Promise<string> => {
  const { booking, payment, user, tour } = payload;

  // create invoice directory if not exists
  const invoiceDir = path.join(process.cwd(), "public", "invoices");

  if (!fs.existsSync(invoiceDir)) {
    fs.mkdirSync(invoiceDir, { recursive: true });
  }

  const fileName = `invoice-${payment.transactionId}.pdf`;

  const filePath = path.join(invoiceDir, fileName);

  // create pdf
  const doc = new PDFDocument({
    size: "A4",
    margin: 50,
  });

  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream);

  // =========================
  // COLORS
  // =========================
  const primary = "#0F172A";
  const secondary = "#64748B";
  const lightGray = "#E2E8F0";
  const darkGray = "#334155";

  // =========================
  // HEADER
  // =========================

  doc
    .fontSize(26)
    .fillColor(primary)
    .text("PH TOUR MANAGEMENT", 50, 45);

  doc
    .fontSize(16)
    .fillColor(secondary)
    .text("TRAVEL INVOICE", 50, 80);

  // Right side company info
  doc
    .fontSize(10)
    .fillColor(darkGray)
    .text("PH TOUR MANAGEMENT", 380, 50, {
      align: "right",
    });

  doc.text("Dhaka, Bangladesh", {
    align: "right",
  });

  doc.text("support@phtour.com", {
    align: "right",
  });

  doc.text("+880 1700-000000", {
    align: "right",
  });

  // line
  doc
    .moveTo(50, 140)
    .lineTo(545, 140)
    .strokeColor(lightGray)
    .stroke();

  // =========================
  // CUSTOMER INFO
  // =========================

  doc
    .fontSize(14)
    .fillColor(primary)
    .text("Invoice To:", 50, 165);

  doc
    .fontSize(11)
    .fillColor(darkGray)
    .text(user.name, 50, 190);

  doc.text(user.email, 50, 210);

  if (user.phone) {
    doc.text(user.phone, 50, 230);
  }

  // =========================
  // INVOICE DETAILS
  // =========================

  const invoiceX = 350;

  doc
    .fontSize(11)
    .fillColor(primary)
    .text(`Invoice ID:`, invoiceX, 170);

  doc
    .fillColor(darkGray)
    .text(payment.transactionId, 450, 170);

  doc
    .fillColor(primary)
    .text(`Booking Status:`, invoiceX, 195);

  doc
    .fillColor(darkGray)
    .text(booking.status, 450, 195);

  doc
    .fillColor(primary)
    .text(`Payment Status:`, invoiceX, 220);

  doc
    .fillColor(
      payment.status === "PAID" ? "green" : "red"
    )
    .text(payment.status, 450, 220);

  doc
    .fillColor(primary)
    .text(`Booking Date:`, invoiceX, 245);

  doc
    .fillColor(darkGray)
    .text(
      new Date(booking.createdAt).toLocaleDateString(),
      450,
      245
    );

  // =========================
  // TOUR TABLE
  // =========================

  const tableTop = 320;

  // Table Header Background
  doc
    .rect(50, tableTop, 495, 30)
    .fill(primary);

  doc
    .fillColor("white")
    .fontSize(11)
    .text("Tour", 60, tableTop + 10);

  doc.text("Division", 210, tableTop + 10);

  doc.text("Guest", 310, tableTop + 10);

  doc.text("Per Person", 380, tableTop + 10);

  doc.text("Total", 490, tableTop + 10);

  // Table Body
  const rowY = tableTop + 30;

  doc
    .rect(50, rowY, 495, 50)
    .fill("#F8FAFC");

  doc
    .fillColor(darkGray)
    .fontSize(10)
    .text(tour.title, 60, rowY + 15, {
      width: 130,
    });

  doc.text(
    tour.division?.name || "N/A",
    210,
    rowY + 15
  );

  doc.text(String(booking.guest), 320, rowY + 15);

  doc.text(`$${tour.costFrom}`, 385, rowY + 15);

  doc.text(`$${payment.amount}`, 490, rowY + 15);

  // =========================
  // TOUR DETAILS BOX
  // =========================

  const boxY = rowY + 90;

  doc
    .roundedRect(50, boxY, 495, 130, 8)
    .strokeColor(lightGray)
    .stroke();

  doc
    .fontSize(14)
    .fillColor(primary)
    .text("Tour Details", 70, boxY + 15);

  doc
    .fontSize(11)
    .fillColor(darkGray)
    .text(
      `Destination: ${tour.location || "N/A"}`,
      70,
      boxY + 45
    );

  doc.text(
    `Start Date: ${
      tour.startDate
        ? new Date(tour.startDate).toDateString()
        : "N/A"
    }`,
    70,
    boxY + 70
  );

  doc.text(
    `End Date: ${
      tour.endDate
        ? new Date(tour.endDate).toDateString()
        : "N/A"
    }`,
    70,
    boxY + 95
  );

  doc.text(
    `Guests: ${booking.guest} person(s)`,
    320,
    boxY + 45
  );

  doc.text(
    `Amount Per Person: $${tour.costFrom}`,
    320,
    boxY + 70
  );

  doc
    .font("Helvetica-Bold")
    .text(
      `Grand Total: $${payment.amount}`,
      320,
      boxY + 95
    );

  // =========================
  // FOOTER
  // =========================

  doc
    .fontSize(10)
    .fillColor(secondary)
    .text(
      "Thank you for booking with PH TOUR MANAGEMENT",
      50,
      760,
      {
        align: "center",
        width: 500,
      }
    );

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on("finish", () => {
      resolve(`/invoices/${fileName}`);
    });

    stream.on("error", (err) => {
      reject(err);
    });
  });
};
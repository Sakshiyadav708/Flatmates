const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());

let usersDB = [];
let activeOTPs = {};
let flatGroupsDB = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shivamyadav2005@gmail.com",
    pass: "cmco htvj fdyh fmjg",
  },
});

// Seed Listings Database
let listingsDB = [
  // FLATS
  {
    id: "f1",
    category: "flat",
    title: "1 Room Vacant in Fully Furnished 3BHK",
    location: "Sector 11 (Near YMCA)",
    price: 5500,
    gender: "Boys",
    phone: "9876543210",
    desc: "High-speed Wi-Fi, AC, RO Water available. Just 3 mins walk to YMCA Gate 2.",
    photos: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
    ],
    poster: "Student (3rd Yr)",
    userEmail: "student@gmail.com",
  },
  {
    id: "f2",
    category: "flat",
    title: "Single Occupancy Room in 2BHK Flat",
    location: "Sector 7",
    price: 6000,
    gender: "Boys",
    phone: "9876543211",
    desc: "Attached washroom, balcony access, power backup. Peaceful study environment.",
    photos: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80",
    ],
    poster: "Rohan (4th Yr ME)",
    userEmail: "rohan@gmail.com",
  },
  {
    id: "f3",
    category: "flat",
    title: "2 Bed Vacancy in Girls Flat",
    location: "Sector 8",
    price: 4800,
    gender: "Girls",
    phone: "9876543212",
    desc: "Gated security society, fully functional kitchen, washing machine & fridge included.",
    photos: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
    ],
    poster: "Priya (ECE Dept)",
    userEmail: "priya@gmail.com",
  },
  {
    id: "f4",
    category: "flat",
    title: "Budget 1BHK Independent Set",
    location: "Sector 10",
    price: 7500,
    gender: "Boys",
    phone: "9876543213",
    desc: "Separate entry, kitchen, spacious room. Nearby market and auto stand.",
    photos: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80",
    ],
    poster: "Aditya (CS Student)",
    userEmail: "aditya@gmail.com",
  },
  {
    id: "f5",
    category: "flat",
    title: "1 Bed Available in 2BHK (Shared)",
    location: "Sector 12",
    price: 4200,
    gender: "Boys",
    phone: "9876543214",
    desc: "Cooler, study table, and bed provided. Water purifier installed.",
    photos: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80",
    ],
    poster: "Vikas (CE Dept)",
    userEmail: "vikas@gmail.com",
  },
  {
    id: "f6",
    category: "flat",
    title: "Luxury Master Bedroom in 3BHK",
    location: "Sector 15",
    price: 8000,
    gender: "Boys",
    phone: "9876543215",
    desc: "King size bed, split AC, modular kitchen, society gym & park access.",
    photos: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80",
    ],
    poster: "Sahil (Alumni)",
    userEmail: "sahil@gmail.com",
  },
  {
    id: "f7",
    category: "flat",
    title: "Flatmate Required for 2BHK Apartment",
    location: "Sector 75",
    price: 5000,
    gender: "Girls",
    phone: "9876543216",
    desc: "Clean & silent environment. Looking for non-smoking flatmate.",
    photos: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=600&q=80",
    ],
    poster: "Neha (3rd Yr)",
    userEmail: "neha@gmail.com",
  },
  {
    id: "f8",
    category: "flat",
    title: "1 Room in 4BHK Student Penthouse",
    location: "Sector 76",
    price: 6500,
    gender: "Boys",
    phone: "9876543217",
    desc: "Huge terrace space, high-speed fiber internet, common lounge area.",
    photos: [
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=600&q=80",
    ],
    poster: "Gaurav (4th Yr)",
    userEmail: "gaurav@gmail.com",
  },

  // MAIDS
  {
    id: "m1",
    category: "maid",
    subType: "Cook",
    title: "Sunita Aunty (North Indian Cook Specialist)",
    location: "Sector 11 (Near YMCA)",
    price: 2000,
    gender: "Cook",
    phone: "9811223344",
    desc: "Prepares fresh Breakfast & Dinner. Specialized in North Indian roti-sabzi & dal fry.",
    photos: [],
    poster: "Recommended by YMCA Students",
    userEmail: "student@gmail.com",
  },
  {
    id: "m2",
    category: "maid",
    subType: "Sweeper",
    title: "Kamla Devi (Cleaning & Sweeping Staff)",
    location: "Sector 7",
    price: 1500,
    gender: "Sweeper",
    phone: "9811223345",
    desc: "Daily sweeping, mopping & utensil washing for 2BHK/3BHK student flats.",
    photos: [],
    poster: "Shared by Sector 7 Flatmates",
    userEmail: "rohan@gmail.com",
  },

  // FURNITURE
  {
    id: "u1",
    category: "furniture",
    subType: "tables",
    title: "Wooden Study Desk with Drawer",
    location: "Sector 11 (Near YMCA)",
    price: 1200,
    gender: "Pre-owned",
    phone: "9711001122",
    desc: "Sturdy study table, perfect for laptop and textbook setup. Good condition.",
    photos: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
    ],
    poster: "Student (3rd Yr ECE)",
    userEmail: "student@gmail.com",
  },
];

// Send OTP Route
app.post("/api/auth/send-otp", async (req, res) => {
  let { contact } = req.body || {};
  if (!contact)
    return res.status(400).json({ message: "Email address is required!" });

  contact = contact.trim().toLowerCase();

  const existingUser = usersDB.find((u) => u.contact === contact);
  if (existingUser)
    return res
      .status(400)
      .json({ message: "Account already exists! Please log in." });

  const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
  activeOTPs[contact] = generatedOtp;

  if (contact.includes("@")) {
    const mailOptions = {
      from: '"FlatMates JC Bose UST" <no-reply@flatmates.com>',
      to: contact,
      subject: "FlatMates Verification Code",
      text: `Your OTP for FlatMates registration is: ${generatedOtp}`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.log(`\n🔑 Fallback OTP for [${contact}]: ${generatedOtp}\n`);
    }
  }

  return res
    .status(200)
    .json({ message: `OTP sent to ${contact}.`, otp: generatedOtp });
});

// Register Account
app.post("/api/auth/register", (req, res) => {
  let { fullName, contact, otp, password } = req.body || {};
  if (!fullName || !contact || !otp || !password)
    return res.status(400).json({ message: "All fields required!" });

  contact = contact.trim().toLowerCase();

  if (!activeOTPs[contact] || activeOTPs[contact] !== otp) {
    return res.status(400).json({ message: "Invalid OTP!" });
  }

  usersDB.push({
    id: Date.now().toString(),
    fullName,
    contact,
    password,
    flatCode: null,
  });
  delete activeOTPs[contact];
  return res
    .status(201)
    .json({ message: "Registration Successful! Log In now.", user: fullName });
});

// Login Account
app.post("/api/auth/login", (req, res) => {
  let { contact, password } = req.body || {};
  if (!contact) return res.status(400).json({ message: "Email is required!" });

  contact = contact.trim().toLowerCase();
  const user = usersDB.find(
    (u) => u.contact === contact && u.password === password,
  );
  if (!user)
    return res
      .status(401)
      .json({ message: "Invalid Credentials or Account Not Registered!" });

  return res.status(200).json({
    token: "jwt-token-" + Date.now(),
    fullName: user.fullName,
    contact: user.contact,
  });
});

// FLAT EXPENSE APIS
app.post("/api/expenses/group", (req, res) => {
  const { flatCode, userName } = req.body;
  if (!flatCode || !userName)
    return res.status(400).json({ message: "Flat Code & User Name required" });

  const codeUpper = flatCode.trim().toUpperCase();

  if (!flatGroupsDB[codeUpper]) {
    flatGroupsDB[codeUpper] = {
      code: codeUpper,
      created: new Date().toLocaleDateString(),
      members: [userName],
      expenses: [],
    };
  } else {
    if (!flatGroupsDB[codeUpper].members.includes(userName)) {
      flatGroupsDB[codeUpper].members.push(userName);
    }
  }

  return res.status(200).json({
    message: `Connected to Flat Group: ${codeUpper}`,
    group: flatGroupsDB[codeUpper],
  });
});

app.get("/api/expenses", (req, res) => {
  const { flatCode } = req.query;
  if (!flatCode || !flatGroupsDB[flatCode.toUpperCase()]) {
    return res.status(200).json({ members: [], expenses: [] });
  }
  return res.status(200).json(flatGroupsDB[flatCode.toUpperCase()]);
});

app.post("/api/expenses/add", (req, res) => {
  const { flatCode, title, amount, paidBy } = req.body;
  const codeUpper = flatCode.toUpperCase();

  if (!flatGroupsDB[codeUpper]) {
    return res.status(400).json({ message: "Flat Group not found!" });
  }

  const numAmount = parseFloat(amount);
  const membersCount = flatGroupsDB[codeUpper].members.length || 1;
  const splitShare = (numAmount / membersCount).toFixed(2);

  const newExpense = {
    id: Date.now().toString(),
    title,
    amount: numAmount,
    paidBy,
    perPersonShare: splitShare,
    createdAt: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  flatGroupsDB[codeUpper].expenses.unshift(newExpense);

  return res.status(201).json({
    message: "Bill split & synced to Flat Group!",
    expense: newExpense,
  });
});

// GENERAL LISTINGS & USER POST MANAGEMENT APIS
app.get("/api/listings", (req, res) => {
  const { category, location, search } = req.query;
  let result = listingsDB;

  if (category && category !== "all")
    result = result.filter((item) => item.category === category);
  if (location && location !== "all")
    result = result.filter((item) => item.location === location);

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q),
    );
  }

  return res.status(200).json(result);
});

// Fetch Current User's Posted Items Only
app.get("/api/listings/my-posts", (req, res) => {
  const { userEmail } = req.query;
  if (!userEmail)
    return res.status(400).json({ message: "User Email required" });

  const userPosts = listingsDB.filter(
    (item) => item.userEmail === userEmail.toLowerCase(),
  );
  return res.status(200).json(userPosts);
});

// Create New Listing
app.post("/api/listings", (req, res) => {
  const newListing = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date(),
  };
  listingsDB.unshift(newListing);
  return res.status(201).json(newListing);
});

// Delete Specific Listing
app.delete("/api/listings/:id", (req, res) => {
  const { id } = req.params;
  listingsDB = listingsDB.filter((item) => item.id !== id);
  return res.status(200).json({ message: "Listing deleted successfully!" });
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Backend Active on http://localhost:${PORT}`),
);

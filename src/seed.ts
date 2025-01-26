// filepath: /C:/Menna/grad project/New folder/src/seed.ts
import { AppDataSource } from "./data-source"; // Adjust the path as needed
import { User } from "./models/User";
import { gender } from "./enum/gender"; // Import Gender enum

const seedUsers = async () => {
  await AppDataSource.initialize();

  const users = [
    {
      firstName: "Timber",
      lastName: "Saw",
      email: "timber23@example.com",
      phonenumber: "09234578690",
      address: "1234 Elm Street",
      nationalNumber: "12345678965432",
      password: "Psasowrd123@",
      confirmPassword: "Psasowrd123@",
      gender: gender.MALE,
      birthDate: new Date("1999-12-12"),
      weight: 80,
      height: 180,
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phonenumber: "09234567890",
      address: "5678 Oak Street",
      nationalNumber: "12345678901234",
      password: "Password123@",
      confirmPassword: "Password123@",
      gender: gender.MALE,
      birthDate: new Date("1985-05-15"),
      weight: 75,
      height: 175,
    },
    // Add more users as needed
  ];

  for (const userData of users) {
    const user = new User();
    Object.assign(user, userData);
    try {
      await user.save();
      // console.log(`User ${user.firstName} ${user.lastName} saved successfully`);
    } catch (error) {
      console.error(`Error saving user ${user.firstName} ${user.lastName}`, error);
    }
  }

  await AppDataSource.destroy();
};

seedUsers().catch((error) => console.error("Error seeding users:", error));
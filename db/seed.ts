import { db } from "./db";
import { usersTable, formsTable } from "./schema";
import { PasswordHasher } from "../src/infrastructure/security/password-hasher";

async function seed() {
  console.log("🌱 Seeding database...");
  const passwordHasher = new PasswordHasher();
  const hashedPassword = await passwordHasher.hash("password123");

  // 1. Create 5 Users
  const users = Array.from({ length: 5 }).map((_, i) => ({
    id: crypto.randomUUID(),
    username: `user${i + 1}`,
    password: hashedPassword,
  }));

  await db.insert(usersTable).values(users);
  console.log(`✅ Created ${users.length} users`);

  // 2. Create 50 Forms with varying data
  // Explicitly typing the array ensures it matches the schema expectations
  const forms: (typeof formsTable.$inferInsert)[] = [];
  const topics = ["Research", "Feedback", "Survey", "Registration", "Inventory"];

  for (let i = 0; i < 50; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const topic = topics[i % topics.length];
    
    // Explicitly cast the status to the enum type to satisfy the compiler
    const status = (i % 3 === 0 ? "closed" : "active") as "active" | "closed";
    
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - i); 

    forms.push({
      id: crypto.randomUUID(),
      userId: randomUser!.id,
      title: `${topic} Form #${i + 1}`,
      description: `This is a description for the ${topic!.toLowerCase()} test form number ${i + 1}.`,
      status: status,
      createdAt: createdAt,
      updatedAt: createdAt,
    });
  }

  await db.insert(formsTable).values(forms);
  console.log(`✅ Created ${forms.length} forms`);
  console.log("✨ Seeding completed!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:");
  console.error(err);
  process.exit(1);
});

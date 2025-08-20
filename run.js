const { exec } = require("child_process");
const readline = require("readline");

// Ask user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("\n🚀 Choose platform to run your Vue + Firebase app:");
console.log("  w → Web");
console.log("  a → Android");
console.log("  i → iOS\n");

rl.question("Enter your choice: ", (choice) => {
  let command;

  if (choice === "w") {
    command = "npm run serve"; // Vue dev server
  } else if (choice === "a") {
    command = "npx cap open android"; // Opens Android Studio
  } else if (choice === "i") {
    command = "npx cap open ios"; // Opens Xcode
  } else {
    console.log("❌ Invalid choice. Use w / a / i.");
    rl.close();
    return;
  }

  console.log(`\n▶ Running: ${command}\n`);

  const process = exec(command);

  process.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  process.stderr.on("data", (data) => {
    console.error("⚠️ ERROR:", data.toString());
  });

  process.on("close", (code) => {
    console.log(`\n✅ Process finished with code ${code}`);
    rl.close();
  });
});

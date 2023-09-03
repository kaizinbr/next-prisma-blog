import containsSpecialChars from "@/services/containsSpecialChars"

if (containsSpecialChars("hello!")) {
    // 👇️ this runs
    console.log("✅ string contains special characters");
} else {
    console.log("⛔️ string does NOT contain special characters");
}

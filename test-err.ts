import { apiClient } from './src/lib/api-client'
async function run() {
  try {
    const res = await fetch("http://localhost:3000/api/v1/funds/non_existent_id", { method: 'DELETE' });
    const text = await res.text();
    console.log("RESPONSE:", text);
  } catch (e) {
    console.error("FAIL", e);
  }
}
run();
